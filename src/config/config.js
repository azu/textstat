// LICENSE : MIT
'use strict';
const path = require('path');
const objectAssign = require('object-assign');
const loadConfig = require('./config-loader');
const concat = require("unique-concat");
const TextLintConfig = require("textlint/lib/config/config");

/**
 * Get rule keys from `.textlintrc` config object.
 * @param rulesConfig
 * @returns {string[]}
 */
function availableRuleKeys(rulesConfig) {
    if (!rulesConfig) {
        return [];
    }
    return Object.keys(rulesConfig).filter(key => {
        // ignore `false` value
        return typeof rulesConfig[key] === 'object' || rulesConfig[key] === true;
    });
}

const defaultOptions = Object.freeze({
    // rule package names
    rules: [],
    // plugin package names
    plugins: ["textlint-plugin-html"],
    // rules base directory that is related `rules`.
    rulesBaseDirectory: undefined,
    // ".textlint" file path
    configFile: undefined,
    // rules config object
    rulesConfig: {},
    // rule directories
    rulePaths: [path.join(__dirname, "..", "rules")],
    extensions: [],
    // formatter-file-name
    // e.g.) stylish.js => set "stylish"
    formatterName: path.join(__dirname, "..", "formatters/stats.js")
});

// Priority: CLI > Code options > config file
class Config extends TextLintConfig {
    /**
     * @return {string} rc config filename
     * it's name use as `.<name>rc`
     */
    static get CONFIG_FILE_NAME() {
        return "textstat";
    }

    /**
     * @return {string} config package prefix
     */
    static get CONFIG_PACKAGE_PREFIX() {
        return "textstat-config-";
    }

    /**
     * @return {string} rule package's name prefix
     */
    static get RULE_NAME_PREFIX() {
        return "textstat-rule-";
    }

    /**
     * @return {string} plugins package's name prefix
     */
    static get PLUGIN_NAME_PREFIX() {
        return "textstat-plugin-";
    }

    /**
     * Create config object form command line options
     * See options.js
     * @param {object} cliOptions the options is command line option object. @see options.js
     * @returns {Config}
     */
    static initWithCLIOptions(cliOptions) {
        let options = {};
        options.extensions = cliOptions.ext ? cliOptions.ext : defaultOptions.extensions;
        options.rules = cliOptions.rule ? cliOptions.rule : defaultOptions.rules;
        options.plugins = cliOptions.plugin ? cliOptions.plugin : defaultOptions.plugins;
        options.configFile = cliOptions.config ? cliOptions.config : defaultOptions.configFile;
        options.rulePaths = cliOptions.rulesdir ? cliOptions.rulesdir : defaultOptions.rulePaths;
        options.formatterName = cliOptions.format ? cliOptions.format : defaultOptions.formatterName;
        return this.initWithAutoLoading(options);
    }

    static initWithAutoLoading(options = {}) {
        // configFile is optional
        // => load .textlintrc
        // ===================
        const configFileRawOptions = loadConfig(options.configFile, {
                configPackagePrefix: this.CONFIG_PACKAGE_PREFIX,
                configFileName: this.CONFIG_FILE_NAME
            }) || {};
        const configFileRules = availableRuleKeys(configFileRawOptions.rules);
        const configFilePlugins = configFileRawOptions.plugins || [];
        const configFileRulesConfig = configFileRawOptions.rules;
        // @type {string[]} rules rules is key list of rule names
        const optionRules = options.rules || [];
        const optionRulesConfig = options.rulesConfig || {};
        const optionPlugins = options.plugins || [];
        // merge options and configFileOptions
        // Priority options > configFile
        const rules = concat(optionRules, configFileRules);
        const rulesConfig = objectAssign({}, configFileRulesConfig, optionRulesConfig);
        const plugins = concat(optionPlugins, configFilePlugins);
        const mergedOptions = objectAssign({}, defaultOptions, options, {
            rules,
            rulesConfig,
            plugins
        });
        return new this(mergedOptions);
    }
}
module.exports = Config;
