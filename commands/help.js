const helpEmbed = {
    title: "List of commands",
    color: 0xd50000,
    description: "set of commands that the user can use ",
    thumbnail: {
        url: "https://cdn.discordapp.com/attachments/581123339049893908/839938820854120478/Senza_titolo-1.png"
    },
    footer: {
        "text": "Credits: @Code-Dani , @Mene-Hub",
    },
    fields: [
        {
        name: "?help ARGS",
        value: "This command is used to display a set of information about the authors or if you specify and argument then it'll display informations about the requested command.\nEG: ?help addrepo"
        },
        {
        name: "?addrepo ARGS",
        value: "This command is used to add a repository into the list of repos that the bot continuosly check"
        },
        {
        name: "?setchannel",
        value: "This command is used to set the channel that the bot is going to use to post notifications of new commits in the given repositories. This command doesn't need any argument to work"
        },
        {
        name: "?ping",
        value: "Pong!"
        }
    ]
}

const addrepoEmbed = {
    title: "addrepo",
    color: 0xd50000,
    description: "This command is used to add a repository into the list of repos that the bot continuosly check.\nIn order to use it properly the user needs to specify  an argument.\nExample: ?addrepo https://https://github.com/USER/REPO\n\nAdditionally the repo needs to be set to **public** for the bot to be able to check its commit history",
}

const setchannelEmbed = {
    title: "setchannel",
    color: 0xd50000,
    description: "This command is used to set the channel that the bot is going to use to post notifications of new commits in the given repositories. This command doesn't need any argument to work.\n**Usage:** The command needs to be sent in the channel were you'll want the feed to be posted. The bot will grab the channel were its been sent and saves it\n",
}

module.exports = {
    name: "help",
    description: "prints helpful informations",
    execute(message,args){
        if(args <= 0){
            message.channel.send({embed : helpEmbed});
        }else{
            switch(args[0]){
                case "addrepo":
                    message.channel.send({embed : addrepoEmbed});
                    break;
                case "setchannel":
                    message.channel.send({embed : setchannelEmbed});
                    break;
                case "ping":
                    message.channel.send("pooooong!");
                    break;
                default:
                    message.channel.send("The argument is **incorrect**\nArgument sent: " + args[0]);
                    break;
            }
        }
    }
}