# SnD-bot
Impersonators using the same usernames that are on the white-list will be kicked/banned

### Install Node.js dependencies and clone SnD-bot repo
-------------------------------------------------------
    *add 4GIGS SWAP
	sudo fallocate -l 4G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile && sudo cp /etc/fstab /etc/fstab.bak && echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
	
	*install dependencies
	sudo apt-get -y update && sudo apt-get -y dist-upgrade && sudo apt-get install -y software-properties-common git gcc build-essential libssl-dev npm nodejs nodejs-legacy libtool autoconf automake && sudo add-apt-repository -y ppa:bitcoin/bitcoin && sudo apt-get update
    sudo curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | sh
    source ~/.profile
    nvm install v8.9.4
    nvm use v8.9.4
    
	*download project and install npm dependencies
	git clone https://github.com/TopoX84/SnD-bot.git SnD-bot
    cd SnD-bot
    npm update
    npm install

### Items to do before running the bot
------------------------------------------------------------------------
    ./configs/botconfig.json
        Modify "token": "YourDiscordBotTokenHere", 
		you can find this under  " https://discordapp.com/developers " 
		https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot&permissions=268512278
    ./configs/dbconfig.json
        Modify  "host": "localhost",
                "user": "root",
                "password": ""
	.configs/settings.json
		Modify	"kicked": 2,   											<- number of times to get the user kicked before banning
				"banned": 3,   											<- banning 
				"enforceRules": "Yes or No",							<- select yes or no to enforce rules
				"enforceRulesRole": "Role that will endforce Rules",	<- role that will be set to enforce rules
				"enforRulesServerID": "server_18_digit_ID_Here",		<- server ID for the server to enforce rules
				"channelRulesName": "Rules Channel name here",			<- channel name where the rules will be 
				"ServerRequirementsCheck": "server_18_digit_ID_Here",	<- check requirements to make sure the bot works as spected
				"botOwnerUserID":  "add_your_18_digit_ID_here"			<- owner of the bot userID
				
	**NOTE - on settings.json, remember to leave the quotations untouched.
 
 When you are getting your bot into the selected server make sure the premissions as shown below are selected
 ![Alt text](https://cdn.discordapp.com/attachments/419897259359076372/575347526526435346/permissions.PNG "Select all the permissions")


 ### Install MySQL, Secure it and create the database, tables and rows
------------------------------------------------------------------------
    install, create and secure MySQL database
	sudo apt-get install -y mysql-server
	mysql_secure_installation

	secure enough. Would you like to setup VALIDATE PASSWORD plugin? Press y|Y for Yes, any other key for No: y
	Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 2
	Change the password for root ? ((Press y|Y for Yes, any other key for No) : n
	Remove anonymous users? (Press y|Y for Yes, any other key for No) : y
	Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y
	Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y
	Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
	
	mysql -u root -p
	CREATE DATABASE discordbotdb;
	use discordbotdb;
	
	create the tables yourself
	CREATE TABLE `discordbotdb`.`privilegedusers` ( `ID` INT(11) NOT NULL AUTO_INCREMENT , `userName` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , `userID` CHAR(18) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , `botRole` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , `admin` TINYINT(1) NOT NULL DEFAULT '0' , `nickname1` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT 'this will add whitelist nickname' , `nickname2` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT 'this will copy the username == DisplayName' , `Owner` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' , PRIMARY KEY (`ID`), UNIQUE (`userID`)) ENGINE = InnoDB CHARSET=latin1 COLLATE latin1_swedish_ci;
	CREATE TABLE `discordbotdb`.`kicked` ( `ID` INT(11) NOT NULL AUTO_INCREMENT , `userName` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , `userID` CHAR(18) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , `Reason` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , `KickedAuthorUsername` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , `KickedAuthorID` CHAR(18) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;
	CREATE TABLE `discordbotdb`.`Banned` ( `ID` INT(11) NOT NULL AUTO_INCREMENT , `userName` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , `userID` CHAR(18) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , `Reason` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , `BanAuthorUsername` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , `BanAuthorID` CHAR(18) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;

	https://www.a2hosting.com/kb/developer-corner/mysql/managing-mysql-databases-and-users-from-the-command-line
          
        
### Items to do before running the bot
------------------------------------------------------------------------
     to run the bot type "node index.js"
     to run it in the background type "setsid node index.js"
     
### What commands to do once the bot is running on your server
------------------------------------------------------------------------
    first command to use is !register
    second command to use is !help
    
### If you liked the project and want to donate:
------------------------------------------------------------------------
    BTC: 3LuhEDx6ojV4vuz34LbLGzpbsRZbB9k2Td
    LUX: LeFTbFhwfD4qWuG2DupQrytB1av2Uj3FSH
