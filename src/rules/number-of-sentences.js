// LICENSE : MIT
"use strict";
import { getSentences } from "../util/sentence-utils";
export default function (context) {
    let { Syntax, getSource, report } = context;
    let count = 0;
    return {
        [Syntax.Document](){
            count = 0;
        },
        [Syntax.Str](node){
            let text = getSource(node);
            let sentences = getSentences(text);
            count += sentences.length;
        },
        [Syntax.Document + ":exit"](node){
            report(node, {
                "number of sentences": count
            });
        }
    }
}
