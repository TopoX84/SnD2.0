const dbconn = require("../connections/dbconnection.js");
const dbQueries = require("../dbQueries/botDbQueries.js");


module.exports.run = async (bot, message, args) => {

    let registerUser = message.author.username; //gets username
    let registerUserID = message.author.id; //gets userID
    let registerRoleA = "Owner";
    let nickname = message.guild.members.get(registerUserID).nickname;
    let nickname2 = registerUser;

    dbconn.query(`SELECT * FROM privilegedusers`, function (error, isData) {
        if (error) throw error;
        let OwnerLength = 0;

        for (let i = 0; i < isData.length; i++) {
            if (isData[i].Owner == 1)
                OwnerLength++;
        };

        if ((isData.length != 0 || isData.length == 0) && OwnerLength == 0) {

            dbQueries.addWhiteList(registerUser, registerUserID, registerRoleA, true, nickname, nickname2, true); //add user to whitelist account with bot admin
            return message.author.send(registerUser + " has been added on the whitelist db");

        } else {
            console.log("this command can only be used once, there is an admin already registered");
            message.author.send("this command can only be used once, there is an admin already registered");
        };
    });

    message.delete(1000);
};

module.exports.help = {
    name: "register"
};
