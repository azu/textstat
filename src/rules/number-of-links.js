// LICENSE : MIT
"use strict";
export default function (context) {
    let { Syntax, getSource, report } = context;
    let count = 0;
    return {
        [Syntax.Document](){
            count = 0;
        },
        [Syntax.Link](){
            count++;
        },
        [Syntax.Document + ":exit"](node){
            report(node, {
                "number of Links": count
            });
        }
    }
}
