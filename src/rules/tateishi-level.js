// LICENSE : MIT
"use strict";
/*
http://doksyo-tek.hatenablog.com/entry/2015/05/19/104050
RS：評価
1s sentence：文の平均の長さ（文字数）
1a alphabet：アルファベット連の平均の長さ（文字数）
[\w\s]
1h hiragana：ひらがな連の平均の長さ（文字数）
[ぁ-ん]
1c kanji：漢字連の平均の長さ（文字数）
[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]
1k katakana：カタカナ連の平均の長さ（文字数）
[ァ-ヶ]
cp：句点あたりの読点の数
読点/句点

数が0 - つまり存在しない場合は平均の値も0とする
ここでいう読みやすさはクローズ法で評価されている
 */
import { getSentences } from "../util/sentence-utils";
import { RuleHelper } from "textlint-rule-helper";
import tateishiRS from "../util/tateishi";
function calcCP({dokutenCount , kutenCount}) {
    if (kutenCount === 0 || dokutenCount === 0) {
        return 0;
    }
    var number = (dokutenCount / kutenCount);
    if (isNaN(number)) {
        return 0;
    }
    return number;
}
function average(numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    let total = numbers.reduce((value, current) => {
        return value + current;
    }, 0);
    return total / numbers.length;
}
export default function (context) {
    let { Syntax, getSource, report } = context;
    let kutenCount = 0;
    let dokutenCount = 0;
    let list = {};
    let helper = new RuleHelper(context);
    return {
        [Syntax.Document](){
            kutenCount = 0;
            dokutenCount = 0;
            list = {
                sentence: [],
                alphabet: [],
                hiragana: [],
                kanji: [],
                katakana: []
            };
        },
        [Syntax.Str](node){
            if (helper.isChildNode(node, [Syntax.BlockQuote])) {
                return;
            }
            let text = getSource(node);
            let sentences = getSentences(text);
            // 1文の長さ
            sentences.forEach(sentence => {
                list.sentence.push(sentence.length);
            });
            // それぞれの割合
            const hiragana = 0;
            const katakana = 1;
            const kanji = 2;
            const alphabet = 3;
            let counter = [
                0,// hiragana
                0,// katakana
                0,// kanji
                0//  alphabet
            ];

            function flush() {
                counter.forEach((count, index) => {
                    if (count !== 0) {
                        if (index === hiragana) {
                            list.hiragana.push(count);
                        } else if (index === kanji) {
                            list.kanji.push(count);
                        } else if (index === katakana) {
                            list.katakana.push(count);
                        } else if (index === alphabet) {
                            list.alphabet.push(count);
                        }
                    }
                    // reset counter
                    counter[index] = 0;
                });
            }

            let lastHitType = null;

            let countUp = (type)=> {
                if (type !== lastHitType) {
                    flush();
                }
                counter[type]++;
                lastHitType = type;
            };
            for (let i = 0; i < text.length; i++) {
                let char = text[i];
                // 句点あたりの読点の数
                if (char === "。") {
                    kutenCount++;
                } else if (char === "、") {
                    dokutenCount++;
                }
                // 連での文字の長さ
                if (/[ぁ-ん]/.test(char)) {
                    countUp(hiragana);
                }
                if (/[ァ-ヶ]/.test(char)) {
                    countUp(katakana);
                }
                if (/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF]/.test(char)) {
                    countUp(kanji);
                }
                if (/[\w\s]/.test(char)) {
                    countUp(alphabet);
                }
            }
            // last flush
            flush();
        },
        [Syntax.Document + ":exit"](node){
            let result = tateishiRS({
                sentence: average(list.sentence),
                alphabet: average(list.alphabet),
                hiragana: average(list.hiragana),
                kanji: average(list.kanji),
                katakana: average(list.katakana),
                cp: calcCP({dokutenCount, kutenCount})
            });
            report(node, {
                message: "読みやすさの偏差値(平均50、標準偏差10、高いほど読みやすい)",
                "日本文の読みやすさ": Math.round(result * 10) / 10
            });
        }
    }
}
