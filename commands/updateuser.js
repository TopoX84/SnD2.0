const dbconn = require("../connections/dbconnection.js");
const dbQueries = require("../dbQueries/botDbQueries.js");


module.exports.run = async (bot, message, args) => {

    if (!message.mentions.users.first()) {
        return message.author.send(message.author.username + " you did not enter a correct command, type !help update for assitance."); // no whitelist account trying to update user

    } else {

        let updateUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); //gets mentioned username
        let updateUserID = message.mentions.users.first().id; //gets mentioned userID
        if (!updateUser) return message.author.send("user cannot be found"); //if username not found, return message

        let updateUsername = message.mentions.users.first().username;
        let typeOfUser = args.join(" ").slice(22);
        let isAuthorAdmin = message.author.id; // get author userID
        let nickname = message.guild.members.get(updateUserID).nickname;
        let nickname2 = updateUsername;

        let updateRoleA = "Admin";
        let updateRoleN = "Normal";
        
        new Promise(function (resolve, reject) {

            // select from privilegedusers if author is bot admin
            dbconn.query(`SELECT userName, userID, admin FROM privilegedusers WHERE userID = ?`, [isAuthorAdmin], function (error, isAdminData) {
                if (error) throw error;
                resolve(isAdminData);
            });

        }).then((isAdminData) => {
            // select from privilegedusers if user been updateed already exists 
            dbconn.query(`SELECT userName, userID, admin FROM privilegedusers WHERE userID = ?`, [updateUserID], function (error, isUserInDB) {
                if (error) throw error;

                if (isAdminData.length != 0) {

                    console.log("");
                    console.log("Author: " + message.author.username + " " + isAuthorAdmin);
                    console.log("==============================================");
                    console.log("User to be updated: " + updateUsername);
                    console.log("nickname: " + nickname);
                    console.log("nickname2: " + nickname2);
                    console.log("length Admin: " + isAdminData.length);
                    console.log("length whitelist: " + isUserInDB.length);
                    console.log("Admin/Normal: " + typeOfUser);
                    console.log("");
                };

                if (isAdminData.length != 0 && isUserInDB.length <= 1) {

                    if (isAdminData[0].admin == 1 && isUserInDB.length == 1) {

                        if (typeOfUser == "Admin" || typeOfUser == "admin" || typeOfUser == " Admin" || typeOfUser == " admin") {

                            if (isUserInDB.length != 0 && updateUserID == isUserInDB[0].userID && (isUserInDB[0].admin == 1 || isUserInDB[0].admin != 1)) { //admin user

                                dbQueries.updateWhiteList(updateUsername, updateUserID, updateRoleA, true, nickname, nickname2); //update whitelist account with bot admin, in case of username change
                                return message.author.send(updateUsername + " has been updated on the whitelist db");

                            };

                        } else if (typeOfUser == "Normal" || typeOfUser == "normal" || typeOfUser == " Normal" || typeOfUser == " normal") {

                            if (isUserInDB.length != 0 && updateUserID == isUserInDB[0].userID && (isUserInDB[0].admin == 1 || isUserInDB[0].admin != 1)) { //admin user

                                dbQueries.updateWhiteList(updateUsername, updateUserID, updateRoleN, false, nickname, nickname2); //update whitelist account with normal account
                                return message.author.send(updateUsername + " has been updated on the whitelist db");

                            };

                        } else {

                            return message.author.send(message.author.username + " you did not enter a correct command, type !help update for assitance."); // no whitelist account trying to update user	return message.author.send(message.author.username + " you did not enter a correct command, type !help update for assitance."); // no whitelist account trying to update user
                        };

                    } else if (isAdminData[0].admin == 1 && isUserInDB.length == 0) {

                        return message.author.send(message.author.username + " User does not exists on database please use `!help add` command");

                    } else if (isAdminData[0].admin == 0 && (isUserInDB.length == 1 || isUserInDB.length == 0)) {

                        return message.author.send(message.author.username + " you do not have sufficient permissions to use that command");
                    }

                } else if (isUserInDB.length >= 2) {

                    console.log("check database, there should be only 1 entry per userID");
                    message.author.send("check database, there should be only 1 entry per userID");

                } else {

                    return message.author.send(message.author.username + " you do not belong to our whitelisted users"); // no whitelist account trying to update user

                };
            });

        }).catch(function (err) {
            console.log('Caught an error!', err);
        });
    };

   

    message.delete(1000);
};

module.exports.help = {
    name: "update"
};



