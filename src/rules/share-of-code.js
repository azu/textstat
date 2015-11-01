// LICENSE : MIT
"use strict";
export default function (context) {
    let { Syntax, getSource, report } = context;
    let code = "";
    return {
        [Syntax.Document](){
            code = "";
        },
        [Syntax.CodeBlock](node){
            code += getSource(node);
        },
        [Syntax.Document + ":exit"](node){
            var allText = getSource(node);
            var percent = Math.round((code.length / allText.length) * 100);
            report(node, {
                "share of code": percent + "%"
            });
        }
    }
}
