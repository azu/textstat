// LICENSE : MIT
"use strict";
/*
http://doksyo-tek.hatenablog.com/entry/2015/05/19/104050
RS：評価
1s：文の平均の長さ（文字数）
1a：アルファベット連の平均の長さ（文字数）
1h：ひらがな連の平均の長さ（文字数）
1c：漢字連の平均の長さ（文字数）
1k：カタカナ連の平均の長さ（文字数）
cp：句点あたりの読点の数
 */
export default function tateishiRS({
    sentence,
    alphabet,
    hiragana,
    kanji,
    katakana,
    cp
    }) {
    console.log({
        sentence,
        alphabet,
        hiragana,
        kanji,
        katakana,
        cp
    });
    return (-0.12 * sentence)
        + (-1.37 * alphabet)
        + (7.4 * hiragana)
        + (-23.18 * kanji)
        + (-5.4 * katakana)
        + (-4.67 * cp)
        + 115.79
}