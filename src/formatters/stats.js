// LICENSE : MIT
"use strict";
import table, {getBorderCharacters} from 'table';
import path from "path";
export default function (results) {

    let output = "";
    let config = {
        border: getBorderCharacters("norc")
    };

    // instantiate
    var cwd = process.cwd();
    results.forEach(result => {
        var tableData = [];
        tableData.push(["filePath", path.relative(cwd, result.filePath)]);
        result.messages.forEach(message => {
            Object.keys(message.data).forEach(key => {
                if (key !== "message") {
                    tableData.push([key, message.data[key]]);
                }
            });
            if (message.data["message"]) {
                tableData.push(["", message.data["message"]]);
            }
        });
        output += table(tableData, config);
    });

    return output;
};
