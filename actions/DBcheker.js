﻿const dbconn = require("../connections/dbconnection.js");
const settings = require("../configs/settings.json");
const dbQueries = require("../dbQueries/botDbQueries.js");
const report = require("./reports.js");

const toBanNumber = settings.banned; // more or equal to this number will ban
const toKickNumber = settings.kicked; // less or equal to this number will kick 


module.exports.dbCheck = function dbCheck(bot, dbCheck, dbCheckID, dbCheckUsername, authorUsername, authorID, dbChecknickname, bolGuildMember) {

    // this checks the whitelisted DB upon user's login and kicks/bans/records items on a separate table

    let reasonKicked = `idential username on database that does not match userID, kicked for impersonating`;
    let reasonBanned = `'${toBanNumber}' times strike, user banned for impersonating a member of the whitelist`;

    new Promise(function (resolve, reject) {

        //check database kicked for how many times the userID has been kicked
        dbconn.query(`SELECT userName, userID FROM kicked WHERE userID = ?`, [dbCheckID], function (error, kickedlistdata) {
            if (error) throw error;
            resolve(kickedlistdata);
        });

    }).then((kickedlistdata) => {
        
        dbconn.query(`SELECT userName, userID, nickname1, nickname2 FROM privilegedusers WHERE userName = ? OR nickname2 = ?`, [dbCheckUsername, dbChecknickname], function (error, whitelistdata) {

            if (error) throw error;

            let setAuthor = bot.user.username;
            let SetAuthorAvatar = bot.user.avatarURL;

            if (kickedlistdata.length >= toBanNumber && whitelistdata.length != 0) {

                if (dbCheckID != whitelistdata[0].userID && (dbCheckUsername == whitelistdata[0].userName || dbChecknickname == whitelistdata[0].nickname2 || (dbCheckUsername == whitelistdata[0].userName && dbChecknickname == whitelistdata[0].nickname1))) {

                    if (bolGuildMember == true) {

                        report.reportban(bot, dbCheck, dbCheckID, dbCheckUsername, authorUsername, authorID, kickedlistdata.length, 1, reasonBanned, "#E70606", setAuthor, SetAuthorAvatar, true);

                        dbCheck.guild.members.get(dbCheckID).ban(reasonBanned); //change to ban() when code is finished
                        dbQueries.addBannedUser(dbCheckUsername, dbCheckID, reasonBanned, authorUsername, authorID);

                    } else if (bolGuildMember == false) {

                        report.reportban(bot, dbCheck, dbCheckID, dbCheckUsername, authorUsername, authorID, kickedlistdata.length, 1, reasonBanned, "#E70606", setAuthor, SetAuthorAvatar, false);

                        dbCheck.members.get(dbCheckID).ban(reasonBanned); //change to ban() when code is finished
                        dbQueries.addBannedUser(dbCheckUsername, dbCheckID, reasonBanned, authorUsername, authorID);
                    };
                    
                    console.log('whitelist data read !');
                    console.log('user has been banned !');
                };

                return;

            } else if (kickedlistdata.length <= toKickNumber && whitelistdata.length != 0) {
                if (dbCheckID != whitelistdata[0].userID && (dbCheckUsername == whitelistdata[0].userName || dbChecknickname == whitelistdata[0].nickname2 || (dbCheckUsername == whitelistdata[0].userName && dbChecknickname == whitelistdata[0].nickname1))) {

                    if (bolGuildMember == true) {

                        if (kickedlistdata.length == 0) report.reportKick(bot, dbCheck, dbCheckID, dbCheckUsername, authorUsername, authorID, kickedlistdata.length + 1, 0, reasonKicked, "#F4C804", setAuthor, SetAuthorAvatar, true);
                        if (kickedlistdata.length == 1) report.reportKick(bot, dbCheck, dbCheckID, dbCheckUsername, authorUsername, authorID, kickedlistdata.length + 1, 0, reasonKicked, "#E38D06", setAuthor, SetAuthorAvatar, true);
                        if (kickedlistdata.length >= 2 && kickedlistdata.length < toBanNumber) report.reportKick(bot, dbCheck, dbCheckID, dbCheckUsername, authorUsername, authorID, kickedlistdata.length + 1, 0, reasonKicked, "#D82D03", setAuthor, SetAuthorAvatar, true);

                        dbCheck.guild.members.get(dbCheckID).kick(reasonKicked);
                        dbQueries.addKickedUser(dbCheckUsername, dbCheckID, reasonKicked, authorUsername, authorID);

                    } else if (bolGuildMember == false) {

                        if (kickedlistdata.length == 0) report.reportKick(bot, dbCheck, dbCheckID, dbCheckUsername, authorUsername, authorID, kickedlistdata.length + 1, 0, reasonKicked, "#F4C804", setAuthor, SetAuthorAvatar, false);
                        if (kickedlistdata.length == 1) report.reportKick(bot, dbCheck, dbCheckID, dbCheckUsername, authorUsername, authorID, kickedlistdata.length + 1, 0, reasonKicked, "#E38D06", setAuthor, SetAuthorAvatar, false);
                        if (kickedlistdata.length >= 2 && kickedlistdata.length < toBanNumber) report.reportKick(bot, dbCheck, dbCheckID, dbCheckUsername, authorUsername, authorID, kickedlistdata.length + 1, 0, reasonKicked, "#D82D03", setAuthor, SetAuthorAvatar, false);

                        dbCheck.members.get(dbCheckID).kick(reasonKicked);
                        dbQueries.addKickedUser(dbCheckUsername, dbCheckID, reasonKicked, authorUsername, authorID);
                    };
                      
                    console.log('whitelist data read !');
                    console.log('user has been kicked !');
                };
            };
        });
    }).catch(function (err) {
        console.log('Caught an error!', err);
    });
};
