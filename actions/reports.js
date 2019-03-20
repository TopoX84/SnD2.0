const Discord = require("discord.js");

module.exports.reportKick = function reportKick(bot, kreport, rkID, rkuser, rkbyuser, rkbyID, rktimes, rkbanned, rkreason, kReportColor, setAuthor, SetAuthorAvatar, bolrk) {

    if (bolrk == true) {

        let reportschannel = kreport.guild.channels.find(channel => channel.name === "reports");
        if (!reportschannel) return kreport.author.send("Couldn't find reports channel.");

        let reportkickEmbed = new Discord.RichEmbed()
            .setAuthor(setAuthor, SetAuthorAvatar)
            .setThumbnail(bot.user.avatarURL)
            .setTitle("Kicked Report")
            .setColor(`${kReportColor}`)
            .addField("Reported Usename", "```" + `${rkuser}` + "```", true)
            .addField("Reported UserID", "```" + `${rkID}` + "```", true)
            .addField("kicked", rktimes + " times", true)
            .addField("banned", rkbanned + " times", true)
            .addField("Reported By Username", "```" + `${rkbyuser}` + "```", true)
            .addField("Reported by UserID", "```" + `${rkbyID}` + "```", true)
            .addField("Reason", rkreason);

        reportschannel.send(reportkickEmbed);

    } else if (bolrk == false) {

        let reportschannel = kreport.channels.find(channel => channel.name === "reports");
        if (!reportschannel) return kreport.author.send("Couldn't find reports channel.");

        let reportkickEmbed = new Discord.RichEmbed()
            .setAuthor(setAuthor, SetAuthorAvatar)
            .setThumbnail(bot.user.avatarURL)
            .setTitle("Kicked Report")
            .setColor(`${kReportColor}`)
            .addField("Reported Usename", "```" + `${rkuser}` + "```", true)
            .addField("Reported UserID", "```" + `${rkID}` + "```", true)
            .addField("kicked", rktimes + " times", true)
            .addField("banned", rkbanned + " times", true)
            .addField("Reported By Username", "```" + `${rkbyuser}` + "```", true)
            .addField("Reported by UserID", "```" + `${rkbyID}` + "```", true)
            .addField("Reason", rkreason);

        reportschannel.send(reportkickEmbed);

    };
};

module.exports.reportban = function reportban(bot, breport, rbID, rbuser, rbbyuser, rbbyID, rbtimes, rbbanned, rbreason, bReportColor, setAuthor, SetAuthorAvatar, bolrb) {

    if (bolrb == true) {

        let reportschannel = breport.guild.channels.find(channel => channel.name === "reports");
        if (!reportschannel) return breport.author.send("Couldn't find reports channel.");

        let reportbanEmbed = new Discord.RichEmbed()
            .setAuthor(setAuthor, SetAuthorAvatar)
            .setThumbnail(bot.user.avatarURL)
            .setTitle("Banned Report")
            .setColor(`${bReportColor}`)
            .addField("Reported Usename", "```" + `${rbuser}` + "```", true)
            .addField("Reported UserID", "```" + `${rbID}` + "```", true)
            .addField("kicked", rbtimes + " times", true)
            .addField("banned", rbbanned + " times", true)
            .addField("Reported By Username", "```" + `${rbbyuser}` + "```", true)
            .addField("Reported by UserID", "```" + `${rbbyID}` + "```", true)
            .addField("Reason", rbreason);

        reportschannel.send(reportbanEmbed);

    } else if (bolrb == false) {

        let reportschannel = breport.channels.find(channel => channel.name === "reports");
        if (!reportschannel) return breport.author.send("Couldn't find reports channel.");

        let reportbanEmbed = new Discord.RichEmbed()
            .setAuthor(setAuthor, SetAuthorAvatar)
            .setThumbnail(bot.user.avatarURL)
            .setTitle("Banned Report")
            .setColor(`${bReportColor}`)
            .addField("Reported Usename", "```" + `${rbuser}` + "```", true)
            .addField("Reported UserID", "```" + `${rbID}` + "```", true)
            .addField("kicked", rbtimes + " times", true)
            .addField("banned", rbbanned + " times", true)
            .addField("Reported By Username", "```" + `${rbbyuser}` + "```", true)
            .addField("Reported by UserID", "```" + `${rbbyID}` + "```", true)
            .addField("Reason", rbreason);

        reportschannel.send(reportbanEmbed);

    };
};