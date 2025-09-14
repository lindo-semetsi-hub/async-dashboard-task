import * as https from "http";

function fetchJSON(url: string, callback: (err: any, data?: any) => void) {
    https.get(url, (res) => {
        let rawData = "";

        res.on("data", (chunk) => {
            rawData += chunk;
        });

        res.on("end", () => {
            try {
                const parsedData = JSON.parse(rawData);
                callback(null, parsedData);
            } catch (err) {
                callback(err);
            }
        });
    }).on("error", (err) => {
        callback(err);
        });
    }
