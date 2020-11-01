const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    apiKey: process.env.API_KEY,
    token: process.env.TOKEN,
    prefix: ";",
    url: "https://cricapi.com/api/"
}