const dbconn = require("../connections/dbconnection.js");


module.exports.addKickedUser = function addKickedUser(kickedUserName, kickedUserID, KickedReason, KickerUsername, KickerUserID) {

    let insertKickedDataInfo = `INSERT INTO kicked (userName, userID, Reason, KickedAuthorUsername, KickedAuthorID) VALUES (?, ?, ?, ?, ?) `;
    let insertKickedDataInfoData = [kickedUserName, kickedUserID, KickedReason, KickerUsername, KickerUserID];

    dbconn.query(insertKickedDataInfo, insertKickedDataInfoData, function (error, insertKickedData) { //insert data into kicked table 
        if (error) throw error;

        console.log('New Record Added to kicked table !');
    });
};

module.exports.addBannedUser = function addBannedUser(BannedUserName, BannedUserID, BannedReason, BannerUsername, BannerUserID) {

    let insertBannedDataInfo = `INSERT INTO Banned (userName, userID, Reason, BanAuthorUsername, BanAuthorID) VALUES (?, ?, ?, ?, ?) `;
    let insertBannedDataInfoData = [BannedUserName, BannedUserID, BannedReason, BannerUsername, BannerUserID];

    dbconn.query(insertBannedDataInfo, insertBannedDataInfoData, function (error, insertBannedData) { //insert data into banned table 
        if (error) throw error;

        console.log('New Record Added to Banned table !');
    });
};

module.exports.addWhiteList = function addWhiteList(userNameAdd, userIDAdd, botRoleAdd, isadmin, nicknameAdd, nickname2Add, isOwner) {

    let Owner = 0;
    let adminAccess = 0;
    let whitelistAdd = `INSERT INTO privilegedusers (userName, userID, botRole, admin, nickname1, nickname2, Owner) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    if (isadmin == true && botRoleAdd == "Owner" && isOwner == true) {

        adminAccess = 1;
        Owner = 1;
        let WhiteListAddData = [userNameAdd, userIDAdd, botRoleAdd, adminAccess, nicknameAdd, nickname2Add, Owner];

        dbconn.query(whitelistAdd, WhiteListAddData, function (error, insertwhitelistData) { //insert data into privilegedusers table as admin
            if (error) throw error;
            console.log('New Record Added to privilegedusers table !');
        });

    } else if (isadmin == true && botRoleAdd == "Admin" && isOwner == false) {

        adminAccess = 1;
        let WhiteListAddData = [userNameAdd, userIDAdd, botRoleAdd, adminAccess, nicknameAdd, nickname2Add, Owner];

        dbconn.query(whitelistAdd, WhiteListAddData, function (error, insertwhitelistData) { //insert data into privilegedusers table as admin
            if (error) throw error;
            console.log('New Record Added to privilegedusers table !');
        });

    } else if (isadmin == false && botRoleAdd == "Normal" && isOwner == false) {

        let WhiteListAddData = [userNameAdd, userIDAdd, botRoleAdd, adminAccess, nicknameAdd, nickname2Add, Owner];

        dbconn.query(whitelistAdd, WhiteListAddData, function (error, insertwhitelistData) { //insert data into privilegedusers table as Normal
            if (error) throw error;
            console.log('New Record Added to privilegedusers table !');
        });

    } else {
        console.error(`something went wrong, check for true/false status on Owner`);
    };
};

module.exports.updateWhiteList = function updateWhiteList(userNameUpdate, userIDUpdate, botRoleUpdate, iOwnerUpdate, nicknameUpdate, nickname2Update) {

    let updateUserDB = `UPDATE privilegedusers SET userName = ?, botRole = ?, admin = ?, nickname1 = ?, nickname2 = ? WHERE userID = ?`;
    let adminUpdate = 0;

    if ((iOwnerUpdate == true || iOwnerUpdate == false ) && botRoleUpdate == "Owner") {

        adminUpdate = 1;
        let updateData = [userNameUpdate, botRoleUpdate, adminUpdate, nicknameUpdate, nickname2Update, userIDUpdate];

        dbconn.query(updateUserDB, updateData, function (error, updateWhitelistData) { //update data into privilegedusers table as admin
            if (error) throw error;
            console.log('Record updated on Priviledgedusers !');
        });

    } else if (iOwnerUpdate == true && botRoleUpdate == "Admin") {
        
        adminUpdate = 1;
        let updateData = [userNameUpdate, botRoleUpdate, adminUpdate, nicknameUpdate, nickname2Update, userIDUpdate];
    
        dbconn.query(updateUserDB, updateData, function (error, updateWhitelistData) { //update data into privilegedusers table as admin
            if (error) throw error;
            console.log('Record updated on Priviledgedusers !');
        });

    } else if (iOwnerUpdate == false && botRoleUpdate == "Admin") {

        adminUpdate = 1;
        let updateData = [userNameUpdate, botRoleUpdate, adminUpdate, nicknameUpdate, nickname2Update, userIDUpdate];

        dbconn.query(updateUserDB, updateData, function (error, updateWhitelistData) { //update data into privilegedusers table as admin
            if (error) throw error;
            console.log('Record updated on Priviledgedusers !');
        });

    } else if (iOwnerUpdate == false && botRoleUpdate == "Normal") {

        let updateData = [userNameUpdate, botRoleUpdate, adminUpdate, nicknameUpdate, nickname2Update, userIDUpdate];

        dbconn.query(updateUserDB, updateData, function (error, updateWhitelistData) { //update data into privilegedusers table as admin
            if (error) throw error;
            console.log('Record updated on Priviledgedusers !');
        });

    } else {
        console.error(`something went wrong, check for true/false status on Owner`);
    };
};

module.exports.removeUser = function removeUser(removeByID) {

    let removeUserQuery = `DELETE FROM privilegedusers WHERE userID = ? LIMIT 1`;
    let removeUserData = [removeByID];
    
    new Promise(function (resolve, reject) {

        dbconn.query(removeUserQuery, removeUserData, function (error, removeUser) { //delete data into privilegedusers table
            if (error) throw error;
            console.log('Record removed from Priviledgedusers !');
            resolve(removeUser);
        });
        
    }).then((removeUser) => {

        let pkeyDelete = `ALTER TABLE privilegedusers DROP ID; do sleep(5); ALTER TABLE privilegedusers ADD ID INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY(ID)`;
        
        dbconn.query(pkeyDelete, function (error, pkeyDelSeq) { //delete ID column, sleep the query for 5 seconds then add ID as primary key
            if (error) throw perror;
            console.log('private key deleted from Priviledgedusers, private key readded after 5 seconds !');
        });

    }).catch(function (err) {
        console.log('Caught an error!', err);
    });

};
//ALTER TABLE `privilegedusers` ADD `ID` INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`ID`);
