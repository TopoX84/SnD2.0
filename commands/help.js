const Discord = require("discord.js");
const dbconn = require("../connections/dbconnection.js");


module.exports.run = async (bot, message, args) => {

    let typeOfCommand = args.join(" ").slice(0);
    let isAuthorAdmin = message.author.id;

    new Promise(function (resolve, reject) {

        dbconn.query(`SELECT userName, userID, admin FROM privilegedusers WHERE userID = ?`, [isAuthorAdmin], function (error, isAdminData) {
            if (error) throw error;
            resolve(isAdminData);

            if (isAdminData.length != 0) {
                // add, remove, update, register, dblist, snd

                if (typeOfCommand == "") { //message.guild.id

                    let helpCommand = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setThumbnail(bot.user.avatarURL)
                        .setColor("#37B9ED")
                        .setTitle("This is how you use the !help `<`command`>`")
                        .setDescription("The !help command is available to view the different options the bot can perform.")
                        .addField("Help with how to add someone                  ", "``` !help add ```", false)
                        .addField("Help with how to remove someone               ", "``` !help remove ```", false)
                        .addField("Help with how to remove someone using userID  ", "``` !help dbremove ```", false)
                        .addField("Help with how to update someone               ", "``` !help update ```", false)
                        .addField("Help with how to register first account       ", "``` !help register ```", false)
                        .addField("Help with how to view whitelist               ", "``` !help dblist ```", false);

                    message.author.send(helpCommand);

                } else if (typeOfCommand == "add") {

                    let helpAdd = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setThumbnail(bot.user.avatarURL)
                        .setColor("#4BE385")
                        .setTitle("Command !help add options                  ")
                        .setDescription("The add command as it shows below can add 2 different types of users on the whitelist database, admin - will have the ability to use all the commands while normal is whitelisted from someone trying to impersonate them.")
                        .addField("when adding as admin user type              ", "``` !add @<username> admin ```", false)
                        .addField("when adding as regular user type            ", "``` !add @<username> normal ```", false);


                    message.author.send(helpAdd);


                } else if (typeOfCommand == "remove") {

                    let helpRemove = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setThumbnail(bot.user.avatarURL)
                        .setColor("#4BE385")
                        .setTitle("Command !help remove options               ")
                        .setDescription("The remove command as it shows below removes anyone from the whitelist database.")
                        .addField("when removing a user type                     ", "``` !remove @<username> ```", false);

                    message.author.send(helpRemove);


                } else if (typeOfCommand == "dbremove") {

                    let helpRemove = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setThumbnail(bot.user.avatarURL)
                        .setColor("#4BE385")
                        .setTitle("Command !help dbremove options               ")
                        .setDescription("The remove command as it shows below removes anyone from the whitelist database using the UserID.")
                        .addField("when removing a user type by userID             ", "``` !remove UserID ```", false);

                    message.author.send(helpRemove);


                } else if (typeOfCommand == "update") {

                    let helpUpdate = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setThumbnail(bot.user.avatarURL)
                        .setColor("#4BE385")
                        .setTitle("Command !help update options               ")
                        .setDescription("The update command as it shows below can update 2 different types of users on the whitelist database, if you want to upgrade or downgrade someone access you should use this command.")
                        .addField("when updating as admin user type              ", "``` !update @<username> admin ```", false)
                        .addField("when updating as regular user type            ", "``` !update @<username> normal ```", false);

                    message.author.send(helpUpdate);


                } else if (typeOfCommand == "register") {

                    let helpRegister = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setThumbnail(bot.user.avatarURL)
                        .setColor("#4BE385")
                        .setTitle("Command !help register option,            ")
                        .setDescription("*`NOTE - this command can only be used once`*, when registering the first account, use this command to acquire admin access")
                        .addField("when registering first admin user type              ", "``` !register ```", false);

                    message.author.send(helpRegister);


                } else if (typeOfCommand == "dblist") {

                    let helpDblist = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setThumbnail(bot.user.avatarURL)
                        .setColor("#4BE385")
                        .setTitle("Command !help dblist options               ")
                        .setDescription("The dblist command allows you to display the users that are currently on the whitelist database.")
                        .addField("to display everyone in the database type                ", "``` !dblist all ```", false)
                        .addField("to display admin users in the database type             ", "``` !dblist admin ```", false)
                        .addField("to display normal users in the database type            ", "``` !dblist  normal ```", false);

                    message.author.send(helpDblist);


                } else {
                    return message.author.send("!help command not found, try ` !help ` in order to display available commands");
                };

            } else {

                if (typeOfCommand == "register") {

                    let helpRegister = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setThumbnail(bot.user.avatarURL)
                        .setColor("#4BE385")
                        .setTitle("Command !help register option,            ")
                        .setDescription("*`NOTE - this command can only be used once`*, when registering the first account, use this command to acquire admin access")
                        .addField("when registering first admin user type              ", "``` !register ```", false);

                    message.author.send(helpRegister);

                } else {

                    return message.author.send(message.author.username + " you do not belong to our whitelisted users, you cannot use the commands"); // no whitelist account trying to add user

                };
            };
        });
    }).catch(function (err) {
        console.log('Caught an error!', err);
    });

    message.delete(1000);
};

module.exports.help = {
    name: "help"
};
