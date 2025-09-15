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

    // fetch weather
    const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true";

    fetchJSON(weatherURL, (err, weatherData) => {
    if (err) {
        console.error ("Weather fetch error:", err);
        return;
    }
    console.log("Weather data:", weatherData.current_weather);
    const newsURL = "https://dummyjson.com/posts?limit=5";
    
    //fetch news
    fetchJSON(newsURL, ( newsData) => {
        if (err) {
            console.error("News fetch error:", err);
            return;
        }
        console.log("Latest fetch error:", newsData.posts);
    });
    });
