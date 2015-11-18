#!/usr/bin/env node
var concat = require("concat-stream");
var cli = require("../lib/cli");
var exitCode = 0,
    useStdIn = (process.argv.indexOf("--stdin") > -1);

if (useStdIn) {
    process.stdin.pipe(concat({encoding: "string"}, function (text) {
        cli.execute(process.argv, text).then(function (exitCode) {
            process.exit(exitCode);
        }).catch(function (error) {
            console.error(error)
        });
    }));
} else {
    cli.execute(process.argv).then(function (exitCode) {
        process.exit(exitCode);
    }).catch(function (error) {
        console.error(error)
    });
}
process.on("exit", function () {
    process.exit(exitCode);
});
