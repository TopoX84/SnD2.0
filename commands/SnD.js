const dbconn = require("../connections/dbconnection.js");
const searchUser = require("./DBcheker.js");

module.exports.run = async (bot, message, args) => {

    let memberSearchID = ""; 
    let memberSearchUsername= "";
    let authorUsername = message.author.username;
    let authorID = message.author.id;
    let SearchMember = message;
    let counter = 0;
    
    //console.time(`Command was completed in `);

    dbconn.query(`SELECT userName, userID, admin FROM privilegedusers WHERE userID = ?`, [authorID], function (error, isAdminData) {
        if (error) throw error;

        if (isAdminData.length != 0) {

            if (isAdminData[0].admin == 1) {

                bot.guilds.forEach((guild) => {

                    guild.fetchMembers().then(g => {
                        
                        g.members.forEach((member) => {

                            memberSearchID = member.user.id; //gets new member discord ID
                            memberSearchUsername = member.user.username; // gets new member discord username
                            let Searchnickname = message.guild.members.get(memberSearchID).nickname;

                            searchUser.dbCheck(bot, SearchMember, memberSearchID, memberSearchUsername, authorUsername, authorID, Searchnickname);
                            console.log(`username - ${memberSearchUsername}` + ` - ${Searchnickname}` + ` - ${counter}`);
                            console.log(``);
                            counter++;
                        });
                        console.log(`Command was completed successfully! `);
                    });
                });
                
            } else if (isAdminData[0].admin == 0) {

                return message.author.send(message.author.username + " you do not have sufficient permissions to use that command");
            };

        } else {

            return message.author.send(message.author.username + " you do not belong to our whitelisted users"); // no whitelist account trying to add user

        };
    });    

    message.delete(1000);
};

module.exports.help = {
    name: "snd"
};
