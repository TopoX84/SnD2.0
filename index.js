const fs = require("fs");
const Discord = require("discord.js");

const botconfig = require("./configs/botconfig.json");
const settings = require("./configs/settings.json");

const dbconn = require("./connections/dbconnection.js");

const delMsgRulesChan = require("./actions/delMsgRules.js");
const autoComm = require("./actions/AutoCommands.js");
const ChckReq = require("./actions/CheckReq.js");
const onJoin = require("./actions/DBcheker.js");

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

bot.on("ready", async () => {

    ChckReq.checkBotRequirements(bot);
    
    console.log("");
    console.log(`bot username - ${bot.user.username}`);
    console.log(`bot userID   - ${bot.user.id}`);
    console.log(`bot status   - online!`);
    bot.user.setActivity("kicking imposters 24/7", { type: "STREAMING" });
    console.log("");

    dbconn.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        };
        console.log("connected to database - OK");
    });

    console.log(`the amount of guilds the bot is on: ${bot.guilds.size}`);
    console.log(`guild ID: ${bot.guilds.array().map(g => g.id)}`);
    console.log("");
    
 });

fs.readdir("./commands/", (error, files) => {
	if(error) console.log(error);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
		console.log("couldn't find commands!");
		return;
	}
    console.log("");
    jsfile.forEach((f, i) => {
        
        let props = require(`./commands/${f}`);
        console.log(` --loaded command file: ${f}`);
        bot.commands.set(props.help.name, props);
  });
});

bot.on("message", async message => {
    
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (settings.enforceRules == "yes" || settings.enforceRules == "Yes" || settings.enforceRules == "YES") {
        delMsgRulesChan.deleteMsgRulesChannel(bot, message, args);
    };
    
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
});

bot.on('guildMemberAdd', async memberjoin => {

    let memberjoinID = memberjoin.user.id; //gets new member discord ID
    let memberjoinUsername = memberjoin.user.username; // gets new member discord username
    let memberjoinnickname = memberjoin.guild.members.get(memberjoinID).nickname;
    
    let authorUsername = bot.user.username; //gets bot Username;
    let authorID = bot.user.id; //gets bot ID
    
    if (settings.enforceRules == "yes" || settings.enforceRules == "Yes" || settings.enforceRules == "YES") {
        autoComm.autoRulesRoles(bot, memberjoin, memberjoinID);
    };
          
    return onJoin.dbCheck(bot, memberjoin, memberjoinID, memberjoinUsername, authorUsername, authorID, memberjoinnickname, true);
     
});

bot.on("guildMemberUpdate", function (oldMember, newMember) {

    return autoComm.autoDBnickname(bot, oldMember, newMember);
});

bot.on("userUpdate", function (oldUser, newUser) {

    return autoComm.autoDBUsername(bot, oldUser, newUser);
    
});

bot.login(botconfig.token);




