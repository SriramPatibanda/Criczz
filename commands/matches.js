const https = require('https');
const { apiKey, url } = require('../config.json');



module.exports = {
    name: 'matches',
    execute(message, args) {
        var uniqueId = 1;
        var fixtureList = new Array();
        try {
            https.get(`${url}/matches?apikey=${apiKey}`, function(res) {

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

                    for (let i = 0; i < list.length; i++) {
                        if (list[i].matchStarted === true) {
                            const fixture = `${i+1}. ` + list[i]['team-1'] + ' vs ' + list[i]['team-2'];
                            fixtureList.push(fixture);
                            // message.channel.send(fixture);
                            if ((args[0] - 1) === i) {
                                const Id = list[i].unique_id;
                                uniqueId = Id;
                            }
                        }
                    }
                });

            });



            console.log(fixtureList);

            //     for (let i = 0; i < list.length; i++) {
            //         if (list[i].matchStarted === true) {
            //             if ((args[0] - 1) === i) {
            //                 const uniqueId = list[i].unique_id;
            //                 console.log(uniqueId);
            //             }

            //         }
            //     }


        } catch (error) {
            console.log(error);
        }
    }
}