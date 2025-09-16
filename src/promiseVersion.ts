import * as https from "https";

// fetch helper
function fetchJSONPromise(url: string ): Promise<any> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let rawData = "";

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
    });
});
}

// URL for API
const weatherURL =
"https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.018current_weather=true";
const newsURL = "https://dummyjson.com/posts?limit=5";

fetchJSONPromise(weatherURL)
.then((weatherData) => {
    console.log("Weather data:", weatherData.current_weather);
    return fetchJSONPromise(newsURL);
})
.then((newsData) => {
    console.log("Latest news: ", newsData.posts);
})
.catch((err) => {
    console.error("Error:", err);
});


// run both weather and news at the same time
Promise.all([fetchJSONPromise(weatherURL), fetchJSONPromise(newsURL)])
.then(([weather, news]) => {
    console.log("\n Peomise.all results:");
    console.log("Weather:", weather.current_weather);
    console.log("News:", news.posts);
})
.catch((err) => {
    console.error("Promise.all eerror: ", err);
});
//whicherver responds first will be printed first
Promise.race([fetchJSONPromise(weatherURL), fetchJSONPromise(newsURL)])
.then((firstResult) => {
    console.log("\n Promise.race result:", firstResult);
})
.catch((err) => {
    console.error("Promise.race error:", err);
});