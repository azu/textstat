// LICENSE : MIT
"use strict";
function percent(count, allCount) {
    var number = count / allCount;
    if (isNaN(number)) {
        return 0;
    }
    return (Math.round(number * 100)) + "%";
}
export default function (context) {
    let { Syntax, getSource, report } = context;
    let allText = "";
    let counter = {};
    return {
        [Syntax.Document](){
            allText = "";
            counter = {
                hiragana: 0,
                katakana: 0,
                kanji: 0,
                alphabet: 0
            }
        },
        [Syntax.Str](node){
            let text = getSource(node);
            for (let i = 0; i < text.length; i++) {
                let char = text[i];
                // 連での文字の長さ
                if (/[ぁ-ん]/.test(char)) {
                    counter.hiragana++;
                }
                if (/[ァ-ヶ]/.test(char)) {
                    counter.katakana++;
                }
                if (/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]/.test(char)) {
                    counter.kanji++
                }
                if (/[a-zA-Z]/.test(char)) {
                    counter.alphabet++
                }
            }
            allText += text;
        },
        [Syntax.Document + ":exit"](node){
            let allCount = allText.length;
            report(node, {
                "title": "文字種",
                "ひらがな": percent(counter.hiragana, allCount),
                "カタカナ": percent(counter.katakana, allCount),
                "漢字": percent(counter.kanji, allCount),
                "アルファベット": percent(counter.alphabet, allCount)
            });
        }
    }
}
