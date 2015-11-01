// LICENSE : MIT
"use strict";
export function getSentences(text) {
    var results = [];
    var sentences = text.split("\n\n");
    sentences.forEach(sentence => {
        sentence.split("。").forEach(sen => {
            results.push(sen)
        });
    });
    return results;
}