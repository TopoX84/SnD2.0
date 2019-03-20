const dbconn = require("../connections/dbconnection.js");


module.exports.run = async (bot, message, args) => {

    let typeOfList = args.join(" ").slice(0);
    let isAuthorAdmin = message.author.id;

    dbconn.query(`SELECT userName, userID, admin FROM privilegedusers WHERE userID = ?`, [isAuthorAdmin], function (error, isAdminData) {
        if (error) throw error;

        if (isAdminData.length != 0) {
            dbconn.query(`SELECT * FROM privilegedusers`, function (error, dbSearch) {
                if (error) throw error;
                message.author.send("**Admin** = 1   **Normal** = 0");
                if (typeOfList == "all") {
                    for (let i = 0; i < dbSearch.length; i++) {
                        message.author.send("**Access Level:** `" + dbSearch[i].admin + "` **UserID:** `" + dbSearch[i].userID + "` **Username:** `" + dbSearch[i].userName + "` ");
                    };
                } else if (typeOfList == "admin") {
                    for (let i = 0; i < dbSearch.length; i++) {
                        if (dbSearch[i].admin == 1) {
                            message.author.send("**Access Level:** `" + dbSearch[i].admin + "` **UserID:** `" + dbSearch[i].userID + "` **Username:** `" + dbSearch[i].userName + "` "); 
                        }
                    };
                } else if (typeOfList == "normal") {
                    for (let i = 0; i < dbSearch.length; i++) {
                        if (dbSearch[i].admin == 0) {
                            message.author.send("**Access Level:** `" + dbSearch[i].admin + "` **UserID:** `" + dbSearch[i].userID + "` **Username:** `" + dbSearch[i].userName + "` "); 
                        }
                    };
                } else {
                    return message.author.send(message.author.username + " you did not type a correct command, type !help dblist for assistance.");
                };
            });
        } else {
            return message.author.send(message.author.username + " you do not belong to our whitelisted users, you cannot use the commands"); // no whitelist account trying to add user
        };
    });

    message.delete(1000);
};

module.exports.help = {
    name: "dblist"
};
