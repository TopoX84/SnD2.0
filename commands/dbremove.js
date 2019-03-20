const dbconn = require("../connections/dbconnection.js");
const dbQueries = require("../dbQueries/botDbQueries.js");


module.exports.run = async (bot, message, args) => {

    let dbremoveID = args.join(" ").slice(0);

    let isAuthorAdmin = message.author.id; // get author userID

    if (isNaN(dbremoveID) == false && dbremoveID.length == 18) {
        new Promise(function (resolve, reject) {

            // select from privilegedusers if author is bot admin
            dbconn.query(`SELECT userName, userID, admin, Owner FROM privilegedusers WHERE userID = ?`, [isAuthorAdmin], function (error, isAdminData) {
                if (error) throw error;
                resolve(isAdminData);
            });

        }).then((isAdminData) => {
            // select from privilegedusers if user been updateed already exists 
            if (isAdminData.length != 0) {

                dbconn.query(`SELECT userName, userID, admin, Owner FROM privilegedusers WHERE userID = ?`, [dbremoveID], function (error, toBeRemoved) {
                    if (error) throw error;

                    console.log("");
                    console.log("Author: " + message.author.username + " " + isAuthorAdmin);
                    console.log("==============================================");
                    console.log("UserID to be Removed: " + dbremoveID);
                    console.log("length Admin: " + isAdminData.length);
                    console.log("");

                    if (toBeRemoved.length != 0) {
                        if (isAdminData[0].admin == 1 && isAdminData.length != 0 && isAdminData[0].Owner != 1) {

                            if (toBeRemoved[0].Owner == 1) {
                                return message.author.send(dbremoveID + " You cannot delete the bot owner");
                            } else {
                                dbQueries.removeUser(dbremoveID);
                                return message.author.send(dbremoveID + " has been removed from the whitelist db");
                            };

                        } else if (isAdminData[0].admin == 1 && isAdminData.length != 0 && isAdminData[0].Owner == 1) {

                            dbQueries.removeUser(dbremoveID);
                            return message.author.send(dbremoveID + " has been removed from the whitelist db");

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

    } else {
        return message.author.send(message.author.username + " you did not entered a correct UserID");
    };
    
    message.delete(1000);
};

module.exports.help = {
    name: "dbremove"
};
