const dbconn = require("../connections/dbconnection.js");
const dbQueries = require("../dbQueries/botDbQueries.js");
const searchUser = require("./DBcheker.js");

module.exports.autoDBnickname = function autoDBnickname(bot, oldMember, newMember) {

    let oldnickID = oldMember.id;

    new Promise(function (resolve, reject) {

        dbconn.query(`SELECT userName, userID, botRole, admin, nickname1, nickname2 FROM privilegedusers WHERE userID = ?`, [oldnickID], function (error, isInDB) {
            if (error) throw error;
            resolve(isInDB);
        });

    }).then((isInDB) => {

        let memberSearchUpdateID = newMember.id;
        let memberSearchUpdateUsername = newMember.user.username;
        let authorUsername = bot.user.username;
        let authorID = bot.user.id;
        let SearchUpdatenickname = newMember.nickname;

        if (isInDB.length == 0) {
            
            searchUser.dbCheck(bot, newMember, memberSearchUpdateID, memberSearchUpdateUsername, authorUsername, authorID, SearchUpdatenickname, true);
            
        } else if (isInDB.length == 1) {
            //code to update whitelist db with new nickname
            let updateRole = isInDB[0].botRole;
            let SearchUpdatenickname2 = memberSearchUpdateUsername;

            dbQueries.updateWhiteList(memberSearchUpdateUsername, memberSearchUpdateID, updateRole, false, SearchUpdatenickname, SearchUpdatenickname2); //update whitelist account with normal account
             
        };

    }).catch(function (err) {
        console.log('Caught an error!', err);
    });
};

module.exports.autoDBUsername = function autoDBUsername(bot, oldUser, newUser) {

    let olduserID = oldUser.id;

    new Promise(function (resolve, reject) {
        dbconn.query(`SELECT userName, userID, botRole, admin, nickname1, nickname2 FROM privilegedusers WHERE userID = ?`, [olduserID], function (error, isInDB) {
            if (error) throw error;
            resolve(isInDB);
        });
    }).then((isInDB) => {

        let memberSearchUpdateID = newUser.id;
        let memberSearchUpdateUNickname = newUser.nickname;
        let authorUsername = bot.user.username;
        let authorID = bot.user.id;
        let SearchUpdateUsername = newUser.username;
        
        if (isInDB.length == 0) {

            bot.guilds.forEach((guild) => {

                guild.fetchMembers().then(userGuild => {

                    //console.log(`ID: ${userGuild.members.get(memberSearchUpdateID)}`);
                    if (userGuild.members.get(memberSearchUpdateID)) {

                        searchUser.dbCheck(bot, userGuild, memberSearchUpdateID, SearchUpdateUsername, authorUsername, authorID, memberSearchUpdateUNickname, false);

                    };
                    
                });
            });

            //code to check whitelist db vs user that changed nickname
            
        } else if (isInDB.length == 1) {
            //code to update whitelist db with new nickname
            let updateRole = isInDB[0].botRole;
            let SearchUpdatenickname2 = SearchUpdateUsername;

            dbQueries.updateWhiteList(SearchUpdateUsername, memberSearchUpdateID, updateRole, false, memberSearchUpdateUNickname, SearchUpdatenickname2); //update whitelist account with normal account

        };

    }).catch(function (err) {
        console.log('Caught an error!', err);
    });
};

