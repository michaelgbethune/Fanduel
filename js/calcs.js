/**
 * New node file
 */
var fs = require("fs");
var players = new Object;
var playerArray = [];

var pts = fs.readFileSync("pts.txt", 'utf8');
pts = pts.split("\r\n");
for (var i = pts.length; i > 0; i--){
	pts[i] = parseInt(pts[i-1]);
}
pts[0] = 0;

files = fs.readdirSync("..\\input\\temp");
files.forEach(function(file) {
	var input = "", seperator = ",", eol = "\r\n", count = 1, ext = ".csv";
	if (fs.lstatSync("..\\input\\temp\\" + file).isFile()){
		var contents = fs.readFileSync("..\\input\\temp\\" + file, 'utf8');
		contents = contents.split("\r\n");
		
		for (var i = 0; i <= contents.length; i+=5) { 
			if (!isNaN(parseInt(contents[i]))){
				input += contents[i+1].trim() + seperator + contents[i+4] + seperator + pts[count] + eol;
				count++;
			}
		} 
	}
	if (input !=="") {
		input = "Player,FD Points Scored,League Points Earned" + eol + input;
		var fileName = "..\\input\\" + file.split(".")[0] + ext;
		
		fs.writeFileSync(fileName , input, 'utf8', function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
	}
});
files = fs.readdirSync("..\\input");
files.forEach(function(file) {
	if (fs.lstatSync("..\\input\\" + file).isFile()){
var contents = fs.readFileSync("..\\input\\" + file, 'utf8');
contents = contents.split("\r\n");
for (var k = 1; k <= 20; k++){
	var content = contents[k].split(',');
	if (content[0]) {
		var name = content[0].trim();
		if (!players[content[0]]) {
			players[name] = {};
			players[name].name = name;
			players[name].fd = 0;
			players[name].lp = 0;
			players[name].wins = 0;
			
		} 
		
	
		players[name][file.split(".")[0]] = {};
		players[name][file.split(".")[0]].fd = parseFloat(content[1]).toFixed(2);
		players[name][file.split(".")[0]].lp = parseInt(content[2]);
		players[name][file.split(".")[0]].wins = 0;
		
		players[name].fd += parseFloat(content[1]).toFixed(2);
		players[name].lp += parseInt(content[2]);
		if (k===1){
			players[name].wins++;
		}
		players[name][file.split(".")[0]].wins = players[name].wins;
	}
}
	}
});

for(var i in players)
	playerArray.push(players [i]);

playerArray.sort(function (b, a) {
	if (a.lp - b.lp == 0)
		return a.fd - b.fd;

	return a.lp - b.lp;
});
fs.writeFile("..\\input.txt", JSON.stringify(playerArray), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Input file updated");
});

console.log(playerArray);
/*
for (var k = 1; k <= week; k++){
var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream("..\\input\\week"+k+".csv")
	});
	lineReader.on('line', function (line) {
	  console.log('Line from file:', i);
	  i++;
	});
}*/
/*
var week = 5;
var allPlayers = new Object;

for (var k = 0; k<fileCount;k++){
	var dataNFL = "";
var nflRS = fs.createReadStream("..\\input\\week"+k+".csv");
	nflRS.setEncoding('UTF8');
	nflRS.on('data', function(chunk) {
		dataNFL += chunk;
	});
	nflRS.on('end',function(chunk){
		var players = dataNFL.split("\r\n");
		for (var i = 1; i<players.length;i++){
			var player = players[i].split(",");
			var newPlayer = new Object;
			newPlayer['FD'] = player[0].split("(");
			newPlayer[1] = newPlayer[0][0];
			newPlayer[0] = newPlayer[0][1];
			newPlayer[2] = player[1];
			//var team=""+player.substring(player.indexOf('<em>')+4).split(" ")[2].split("<")[0].toUpperCase().trim();
			newPlayer[3] = parseFloat(player[17]);
			newPlayer[4] = player[18]+player[19];
			newPlayer[4] = parseInt(newPlayer[4].substring(2))
			newPlayer[5] = parseFloat(player[20]);
			//first initial.last name-team
			//var lastname = player.split(" ")[1].split("<")[0];
			//newPlayer[1] = player.charAt(0)+"."+lastname+"-"+team; 
			//console.log(i+" "+newPlayer.toString());
			if (newPlayer[3] > 0 && newPlayer[5] !=="N/A"){
				switch (newPlayer[0]) {
				case 'QB':
					nflQBs.push(newPlayer);
					break;
				case 'RB':
					nflRBs.push(newPlayer);
					break;
				case 'WR':
					nflWRs.push(newPlayer);
					break;
				case 'TE':
					nflTEs.push(newPlayer);
					break;
				}
			}
		}
		
		var best = calculateNumberFire(salary);


		console.log("Best Points:" + best.pts);
		console.log("Best Cost:" + best.cost);
		console.log(best.QB[0]+": "+best.QB[1] + " " + best.QB[2]+" "+best.QB[3]+" "+best.QB[4]);
		console.log(best.RB[0][0]+": "+best.RB[0][1] + " " + best.RB[0][2]+" "+best.RB[0][3]+" "+best.RB[0][4]);
		console.log(best.RB[1][0]+": "+best.RB[1][1] + " " + best.RB[1][2]+" "+best.RB[1][3]+" "+best.RB[1][4]);
		console.log(best.WR[0][0]+": "+best.WR[0][1] + " " + best.WR[0][2]+" "+best.WR[0][3]+" "+best.WR[0][4]);
		console.log(best.WR[1][0]+": "+best.WR[1][1] + " " + best.WR[1][2]+" "+best.WR[1][3]+" "+best.WR[1][4]);
		console.log(best.WR[2][0]+": "+best.WR[2][1] + " " + best.WR[2][2]+" "+best.WR[2][3]+" "+best.WR[2][4]);
		console.log(best.TE[0]+": "+best.TE[1] + " " + best.TE[2]+" "+best.TE[3]+" "+best.TE[4]);

		//console.log(players);
	});
};
*/
