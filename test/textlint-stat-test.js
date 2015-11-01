// LICENSE : MIT
"use strict";
import {TextLintEngine} from "textlint";
const engine = new TextLintEngine({
    rulePaths: [__dirname + "/../src/rules"]
});
// formatter
describe("textlint-stat.js", function () {
    it("should", function () {
        var results = engine.executeOnFiles([
            "/Users/azu/.ghq/github.com/azu/JavaScript-Plugin-Architecture/ja/connect/README.md",
            "/Users/azu/.ghq/github.com/azu/JavaScript-Plugin-Architecture/ja/ESLint/README.md",
            "/Users/azu/.ghq/github.com/azu/JavaScript-Plugin-Architecture/ORGANIZATION.md"
        ]);
        results.forEach(result => {
            console.log("----------------------------------");
            console.log(result.filePath);
            result.messages.forEach(message => {
                Object.keys(message.data).forEach(key => {
                    if (key === "message") {
                        console.log("Info: " + message.data[key]);
                    } else {
                        console.log(key + " : " + message.data[key]);
                    }
                });
            });
            console.log("\n");
        });
    });
});
