const Discord = require('discord.js');
/**
 * Used to create embed and post notifications
 */
module.exports = {
    name: "sendFeed",
    description: "sends the feed in the channel",
    execute(message, lastCommit){
        const newEmbed = {
            title: "has made a commit on " + lastCommit["commit"]["url"].split("/")[5],
            color: 0x0b6eef,
            description: "**Titolo:** " + lastCommit["commit"]["message"].split("\n\n")[0] + "\n**Desc:** " + lastCommit["commit"]["message"].split("\n\n")[1],
            url: lastCommit["html_url"],
            author: {
                name: "@" + lastCommit["author"]["login"],
                url: lastCommit["author"]["html_url"],
                icon_url: lastCommit["author"]["avatar_url"]
            },
            thumbnail: {
                url: "https://cdn.discordapp.com/attachments/581123339049893908/839938820854120478/Senza_titolo-1.png"
            },
            timestamp: lastCommit["commit"]["author"]["date"],
            footer: {
                text: "Created: "
            },
        };
        message.channel.send({embed: newEmbed});
    }
    
}