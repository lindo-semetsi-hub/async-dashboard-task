import { rejects } from "assert";
import * as https from "https";

function fetchJSONPromise(ul: string ): Promise<any> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let rawData = "";
        });

        res.on("data", (chunk) => {
            rawData += chunk;
        }); 
        res.on("end", () => {
            try {
const parsedData = JSON.parse(rawData);
resolve(parsedData);
            } catch (err) {
                reject(err);
        }
        });
    }).on("error", (err) => {
        reject(err);
    })
}