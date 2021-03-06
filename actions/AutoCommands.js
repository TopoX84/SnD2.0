﻿const dbconn = require("../connections/dbconnection.js");
const dbQueries = require("../dbQueries/botDbQueries.js");
const homoglyphS = require("./homoglyph.js");
const settings = require("../configs/settings.json");
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
            homoglyphS.homoglyph(bot, newMember, memberSearchUpdateID, memberSearchUpdateUsername, authorUsername, authorID, SearchUpdatenickname, true);
            
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

                    if (userGuild.members.get(memberSearchUpdateID)) {

                        searchUser.dbCheck(bot, userGuild, memberSearchUpdateID, SearchUpdateUsername, authorUsername, authorID, memberSearchUpdateUNickname, false);
                        homoglyphS.homoglyph(bot, userGuild, memberSearchUpdateID, SearchUpdateUsername, authorUsername, authorID, memberSearchUpdateUNickname, false);

                    };
                    
                });
            });

            
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

module.exports.autoRulesRoles = function autoRulesRoles(bot, memberjoin, UserID) {

    let guild = bot.guilds.get(settings.enforRulesServerID);
    let roleName = settings.enforceRulesRole;
    let role = memberjoin.guild.roles.find(role => role.name === roleName);
    if (guild && settings.enforRulesServerID.length == 18) {
        if (!role) {

            let reportschannel = memberjoin.guild.channels.find(channel => channel.name === "reports");
            if (!reportschannel) return memberjoin.author.send("Couldn't find reports channel.");
            reportschannel.send(`Please create the role **${roleName}** and give proper permissions !`)

            return console.log(roleName + " does not exists!");

        } else {

            guild.members.get(memberjoin.user.id).send("Welcome to **" + bot.guilds.get(settings.enforRulesServerID).name + "**, Before you can access all the other channels, You must read the rules on **" + settings.channelRulesName + "** channel and within that same channel type ||`!accept`||");

            memberjoin.addRole(role);

        }
    };
};

