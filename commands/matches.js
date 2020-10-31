const https = require('https');
const { prefix, token, apiKey } = require('../config.json');

module.exports = {
    name: 'matches',
    execute(message, args) {
        try {
            https.get(`https://cricapi.com/api/matches?apikey=${apiKey}`, function(res) {

                var data;
                res.on("data", function(chunk) {
                    if (!data) {
                        data = chunk;
                    } else {
                        data += chunk;
                    }
                });

                res.on('end', function() {
                    const matchesData = JSON.parse(data);
                    const list = matchesData.matches;
                    const list1 = list.filter(function(el) {
                        return el.matchStarted == true
                    })
                    for (let i = 0; i < list1.length; i++) {
                        const fixture = `${i+1}. ` + list1[i]['team-1'] + ' vs ' + list1[i]['team-2'];
                        message.channel.send(fixture);
                    }
                });

            });


        } catch (error) {
            console.log(error);
        }
    }
}