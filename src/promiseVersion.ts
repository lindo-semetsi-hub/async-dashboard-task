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
        rejects(err);
    });
}

// URL for API
const weatherURL =
"https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.018current_weather=true";
const newsURL = "https://dummyjson.com/posts?limit=5";

fetchJSONPromise(weatherURL)