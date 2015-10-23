// LICENSE : MIT
"use strict";
import {TextLintEngine} from "textlint";
const engine = new TextLintEngine({
    rulePaths: [__dirname + "/rules"]
});
// formatter
var results = engine.executeOnFiles([__dirname + "/../README.md"]);
console.log(results[0]);
