const Discord = require('discord.js');


module.exports = {
    name: 'help',
    execute(message, args) {
        const help = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Commands')
            .setDescription('Criczz is a cricket bot which fetches live cricket stats')
            .setAuthor('Criczz', 'https://image.flaticon.com/icons/png/512/195/195562.png', 'https://github.com/SriramPatibanda/Criczz')
            .addFields({ name: ';matches', value: 'Displays a list of recent and ongoing matches along with a unique Id' }, { name: ';score <uniqueId>', value: 'Displays the stats and live score of the match' });
        message.channel.send(help);
    }


}