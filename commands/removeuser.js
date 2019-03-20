const dbconn = require("../connections/dbconnection.js");
const dbQueries = require("../dbQueries/botDbQueries.js");


module.exports.run = async (bot, message, args) => {

    if (!message.mentions.users.first()) {
        return message.author.send(message.author.username + " you did not enter a correct command, type !help remove for assitance."); // no whitelist account trying to update user

    } else {

        let removeUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); //gets mentioned username
        let removeUserID = message.mentions.users.first().id; //gets mentioned userID
        if (!removeUser) return message.author.send("user cannot be found"); //if username not found, return message

        let removeUsername = message.mentions.users.first().username;
        let isAuthorAdmin = message.author.id; // get author userID

        new Promise(function (resolve, reject) {

            // select from privilegedusers if author is bot admin
            dbconn.query(`SELECT userName, userID, admin, Owner FROM privilegedusers WHERE userID = ?`, [isAuthorAdmin], function (error, isAdminData) {
                if (error) throw error;
                resolve(isAdminData);
            });

        }).then((isAdminData) => {
            // select from privilegedusers if user been updateed already exists 
            if (isAdminData.length != 0) {

                dbconn.query(`SELECT userName, userID, admin, Owner FROM privilegedusers WHERE userID = ?`, [removeUserID], function (error, toBeRemoved) {
                    if (error) throw error;

                    console.log("");
                    console.log("Author: " + message.author.username + " " + isAuthorAdmin);
                    console.log("==============================================");
                    console.log("User to be removed: " + removeUsername);
                    console.log("length Admin: " + isAdminData.length);
                    console.log("");

                    if (toBeRemoved.length != 0) {
                        if (isAdminData[0].admin == 1 && isAdminData.length != 0 && isAdminData[0].Owner != 1) {

                            if (toBeRemoved[0].Owner == 1) {
                                return message.author.send(removeUsername + " You cannot delete the bot owner");
                            } else {
                                dbQueries.removeUser(removeUserID);
                                return message.author.send(removeUsername + " has been removed from the whitelist db");
                            };

                        } else if (isAdminData[0].admin == 1 && isAdminData.length != 0 && isAdminData[0].Owner == 1) {

                            dbQueries.removeUser(removeUserID);
                            return message.author.send(removeUsername + " has been removed from the whitelist db");

                        } else if (isAdminData[0].admin == 0 && isAdminData.length != 0) {
                            return message.author.send(message.author.username + " you do not have sufficient permissions to use that command, use a different command to update records");
                        };
                    } else {
                        return message.author.send(message.author.username + " Can't remove record because does not exists on database");
                    };
                });
            } else {
                return message.author.send(message.author.username + " you do not belong to our whitelisted users"); // no whitelist account trying to add user
            };
        }).catch(function (err) {
            console.log('Caught an error!', err);
        });

    };

    message.delete(1000);
};

module.exports.help = {
    name: "remove"
};
