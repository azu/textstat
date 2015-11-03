// LICENSE : MIT
"use strict";
import assert from "power-assert"
import cli from "../src/cli";
describe("cli", function () {
    it("should run textstat", function () {
        var exitStatus = cli.execute(__dirname + "/fixtures/test.md");
        assert.equal(exitStatus, 0);
    });
});