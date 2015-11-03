// LICENSE : MIT
"use strict";
export default function (context) {
    let { Syntax, report } = context;
    let count = 0;
    return {
        [Syntax.Document](){
            count = 0;
        },
        [Syntax.Paragraph](){
            count++;
        },
        [Syntax.Document + ":exit"](node){
            report(node, {
                "number of Paragraphs": count
            });
        }
    }
}
