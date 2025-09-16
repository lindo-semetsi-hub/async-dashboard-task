import * as https from "http";

// callback helper
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

   //urls
    const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true";
    const newsURL = "https://dummyjson.com/posts?limits=5";

// fetch weather
    fetchJSON(weatherURL, (err, weatherData) => {
    if (err) {
        console.error ("Weather fetch failed:", err.message);
        return;
    }
    console.log("Weather:", weatherData.current_weather);
    const newsURL = "https://dummyjson.com/posts?limit=5";
    
    //fetch news
    fetchJSON(newsURL, ( newsData) => {
        if (err) {
            console.error("News fetch failed:", err.message);
            return;
        }
        console.log("News:", newsData.posts);
    });
    });
