// LICENSE : MIT
"use strict";
import assert from "power-assert"
import cli from "../src/cli";
describe("cli", function () {
    it("should run textstat", function () {
        return cli.execute(__dirname + "/fixtures/test.md").then(exitStatus => {
            assert.equal(exitStatus, 0);
        });
    });
});