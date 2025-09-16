import * as https from "https"
import { resolve } from "path";

function fetchJSONPromise(url: string): Promise<any> {
    return new Promise((res, reject) => {
        https.get(url, (res) => {
            let rawData = "";
        
        res.on("data", (chunk) => {
            rawData += chunk;       
         });

            res.on("end", () => {
                try {
                    const parsedData =JSON.parse(rawData);
                    resolve(parsedData);
                } catch (err) {
                    reject(err);
                }
            });
    }).on("error", (err) => {
        reject(err);
    }) 
}) ;
}

// urls
const weatherURL = 
"https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.018current_weather=true";
const newsURL = "https://dummyjson.com/posts?limit=5";


//async await version
async function runAsyncAwaitDemo() {
    try {

        //in sequence, first data, then news
        const weatherData = await fetchJSONPromise(weatherURL);
        console.log("Weather: ", weatherData.current_weather);

        const newsData = await fetchJSONPromise(newsURL);

        console.log("News: ", newsData.posts);

        const [weatherAll, newsAll] = await Promise.all([
            fetchJSONPromise(weatherURL),
            fetchJSONPromise(newsURL),
        ]);
        console.log("\n Promise.allwith async(await:");
        console.log("Weather:", weatherAll.current_weather);
        console.log("News:", newsAll.posts);

        //race
        const fastest = await Promise.race([
            fetchJSONPromise(weatherURL),
            fetchJSONPromise(newsURL), 
        ])
        console.log("\n Promise.race with async await:", fastest);
    } catch (err: any) {
        console.error(" Error in async await demo:", err.message);
    }
}

//running the demo
runAsyncAwaitDemo()