const https = require('https');
const { apiKey, url } = require('../config');



module.exports = {
    name: 'score',
    execute(message, args) {
        var uniqueId = args;

        try {
            https.get(`${url}/cricketScore?apikey=${apiKey}&unique_id=${uniqueId}`, function(res) {

                var data;
                res.on("data", function(chunk) {
                    if (!data) {
                        data = chunk;
                    } else {
                        data += chunk;
                    }
                });

                res.on('end', function() {
                    const liveStats = JSON.parse(data);

                    const stat = liveStats.stat;
                    const score = liveStats.score;

                    message.channel.send(stat);
                    message.channel.send(score);

                });

            });


        } catch (error) {
            console.log(error);
        }
    }
}