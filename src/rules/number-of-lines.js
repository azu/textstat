// LICENSE : MIT
"use strict";
import { getSentences } from "../util/sentence-utils";
export default function (context) {
    let { Syntax, getSource, report } = context;
    return {
        [Syntax.Document](node){
            let text = getSource(node);
            let lines = text.split("\n");
            report(node, {
                "number of Lines": lines.length
            });
        }
    }
}
