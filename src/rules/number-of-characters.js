// LICENSE : MIT
"use strict";
export default function (context) {
    let { Syntax, getSource, report } = context;
    return {
        [Syntax.Document](node){
            let text = getSource(node);
            let charactersCount = text.length;
            report(node, {
                "number of characters": charactersCount
            });
        }
    }
}
