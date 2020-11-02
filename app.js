const fs = require('fs');
const Discord = require('discord.js');
const { prefix, apiKey, token } = require('./config');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    if (command === 'matches') {
        client.commands.get('matches').execute(message, args);
    }

    if (command === 'score') {
        client.commands.get('score').execute(message, args);
    }

    if (command === 'help') {
        client.commands.get('help').execute(message, args);
    }
});

client.login(token);



// if (!args.length) {
//     return message.channel.send('You need to supply a search term!');
// }

// if (!list.length) {
//     return message.channel.send(`No results found for **${args.join(' ')}**.`);
// }