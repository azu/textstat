// LICENSE : MIT
"use strict";
function isNotEmpty(text){
    if(!text) {
        return false;
    }
    return text.trim().length > 0;
}
export function getSentences(text) {
    var results = [];
    var sentences = text.split("\n\n");
    sentences.forEach(sentence => {
        sentence.split(/[\.。]+/).forEach(sen => {
            results.push(sen)
        });
    });
    return results.filter(isNotEmpty);
}