// LICENSE : MIT
"use strict";
export default function (results) {
    var output = "";
    results.forEach(result => {
        output += "----------------------------------\n";
        output += result.filePath + "\n";
        result.messages.forEach(message => {
            Object.keys(message.data).forEach(key => {
                if (key === "message") {
                    output += "Info: " + message.data[key] + "\n";
                } else {
                    output += key + " : " + message.data[key] + "\n";
                }
            });
        });
        output += "\n";
    });

    return output;
};
