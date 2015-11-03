// LICENSE : MIT
"use strict";
import fs from "fs";
import fileSize from "filesize";
export default function (context) {
    let { Syntax, getFilePath, report } = context;
    return {
        [Syntax.Document](node){
            let filePath = getFilePath();
            try {
                var stats = fs.statSync(filePath);
                var fileSizeInBytes = stats["size"];
                report(node, {
                    "fileSize": fileSize(fileSizeInBytes)
                })
            } catch (e_e) {
            }
        }
    }
}