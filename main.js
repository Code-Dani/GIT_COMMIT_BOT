const Discord = require('discord.js');
var repoArray = new Array();
const client = new Discord.Client();
const prefix = '?';
require('dotenv').config();
const fs = require('fs');
client.commands = new Discord.Collection();
const commandsFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
var SETchannel;
var myIntervall;

for(const file of commandsFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

/**
 * Basic event that lets you know bot is online
 */
client.once('ready', ()=>{
    console.log('GCBot is back online, baby');
    client.user.setActivity("?help for the list of commands")
});


/**
 * Event that is being called on everymessage sent
 */
client.on('message', message=>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case "setchannel":
            SETchannel = message;
            break;
        case "addrepo":
            addRepo(message, args);
            break;
        case "help":
            client.commands.get('help').execute(message,args);
            break;
        default:
            console.log("There was an error executing the command");
            break;
    }

    message.delete();
    if(repoArray.length > 0 && SETchannel != null)                    
        myIntervall = setInterval(gitCheck, 180000);
});


///////////////////////////////////////////////////


/**
 * Function used to add a repository that the bot has to check
 * @param {message sent in the text channel, contain usefull information used to send back a message in the same channel} message 
 * @param {arguments sent after the bot command: E.G: ?help ARGS} args 
 */
function addRepo(message, args){
    if(args.length > 0){
        var bool = false;
        repoArray.forEach(element => {
            if(element == makeAPI(args[0])){
                bool = true;
            }
        });
        if(!bool){
            if(contains(args[0],"https://github.com/")){
                repoArray[repoArray.length] = makeAPI(args[0]);
                message.channel.send('Repository added!');
                if(SETchannel == null){
                    message.channel.send('Remember to set a channel where the bot can send you messages using `?setchannel` \n **This command will set the current channel as the main channel to send messages**');
                }
            }else{
                message.channel.send("Argument is incorrect, please insert an argument of the type: https://github.com/USER/REPO");
            }
        }else{
            message.channel.send('Reposity already added');
        }
        
    }else{
        message.channel.send('Invalid argument. Please use this command like this: ?addrepo https://github.com/USER/REPO');
    }
}

client.login(process.env.TOKEN);


/**
 * @param {repository of the user} repo 
 * @returns callable API for the given repository
 */
function makeAPI(repo){
    var gitAPI = "https://api.github.com/repos/";
    var tmp = repo.split("/")[3] + "/" + repo.split("/")[4];
    return gitAPI + tmp + "/commits";
}


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var lastMerge = new Array();

function gitCheck(){
    for(var i = 0; i < repoArray.length; i++){
        if(lastMerge[i]==null){
            lastMerge[i]="";
        }
        
        //console.log(repoArray[i] + "---------" + lastMerge[i]);
        gitConnection(repoArray[i], i);
    }
}

function gitConnection(myRepo, index){
	var getrq = new XMLHttpRequest();
	getrq.open('GET', myRepo, true);
    //getgroups.send();
	getrq.onreadystatechange = function() {
        if(getrq.readyState == 4 && getrq.status == 200){
            console.log("conn a buon fine");
            var GitRepose = JSON.parse(getrq.responseText);
            if(GitRepose[0]["commit"].url === lastMerge[index])
            {
                //console.log(GitRepose[0]["commit"].url + " == " + lastMerge[index]);
            }else{
                //console.log(GitRepose[0]["commit"].url + " != " + lastMerge[index]);
                lastMerge[index] = GitRepose[0]["commit"].url;
                client.commands.get('sendFeed').execute(SETchannel,GitRepose[0]);
            }
        }
    }
    getrq.send();
}

function contains(value, searchFor)
{
	var v = (value || '').toLowerCase();
	var v2 = searchFor;
	if (v2) {
		v2 = v2.toLowerCase();
	}
	return v.indexOf(v2) > -1;
}


