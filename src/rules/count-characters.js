// LICENSE : MIT
"use strict";
export default function (context) {
    let { Syntax, getSource, report, RuleError } = context;
    return {
        [Syntax.Document](node){
            let text = getSource(node);
            let charactersCount = text.length;
            report(node, new RuleError(charactersCount));
        }
    }
}
