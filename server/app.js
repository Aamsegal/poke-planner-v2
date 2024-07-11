/* ---Core Dependencies--- */
const express = require("express");
const path = require("path");

/* ---Security--- */
const helmet = require("helmet"); //Helps secure Express apps by setting HTTP response headers.
const cors = require("cors"); //Enables CORS headers which only allows api calls from itself 
const rateLimit = require("express-rate-limit"); //Can limit the number of requests made to the server and return an error of accessed too much (load balancer does this too)


const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json()); //allows data like body, headers and query info to be neatly organized in a json

app.use(helmet()); //

const corsOptions = {
    origin: "http://localhost:3000", //external domain to access endpoints
    method: ["GET","POST"], //What paths can be accessed
    allowedHeaders: ["Content-Type", "Authorization"] //what headers are allowed
};

app.use(cors(corsOptions)); //

const globalRateLimitOptions = {
    requestLimitTimeFrameMinutes: 5,
    limit: 5000,
    message: "The Server is receiving an unusual amount of traffic and will be down for a short time."
}

const globalRateLimit = rateLimit({
    windowMs: globalRateLimitOptions.requestLimitTimeFrameMinutes*60*1000, //converts desired minutes to ms
    limit: globalRateLimitOptions.limit, //number of calls before limit is hit
    message: {message: globalRateLimitOptions.message}, //message response when limit is hit
    keyGenerator: (req, res) => "globalLimiterKey" //one key for all access to server
});

app.use(globalRateLimit);

app.use(express.static(path.join(__dirname, "../build")));

app.get("/api", (req, res) => {

    const requestBody = req.body;
    const requestHeaders = req.headers;
    const requestParams = req.params;

    res.status(200)
    res.json({message: `Get on base server was successful! Currently running on port - ${PORT}`})

});

/* all non accepted endpoints redirect to getting the route from our react app */
app.get("*",(req, res) => {

    res.sendFile(path.join(__dirname, "../build", "index.html"))

})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))