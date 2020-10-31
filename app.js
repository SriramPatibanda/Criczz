const Discord = require('discord.js');
const { prefix, token, apiKey } = require('./config.json');
const client = new Discord.Client();
const https = require('https');
const querystring = require('querystring');
const { get } = require('http');


client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'matches') {
        // if (!args.length) {
        //     return message.channel.send('You need to supply a search term!');
        // }

        try {
            https.get(`https://cricapi.com/api/matches?apikey=${apiKey}`, function(res) {
                res.on('data', function(data) {
                    const matchesData = JSON.parse(data);
                    console.log(matchesData);

                    // list.forEach(match => {
                    //     const fixture = `${match.team1} vs ${match.team2}`
                    //     console.log(fixture);
                    // });



                });

            });
            // if (!list.length) {
            //     return message.channel.send(`No results found for **${args.join(' ')}**.`);
            // }




        } catch (error) {
            console.log(error);
        }





    }




});

client.login(token);