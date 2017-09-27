const { BrowserWindow } = require('electron');
const connection = require('../connection');
const listJsGames = [
	'https://jsnes.fir.sh/run/Mega%20Man%20(U).nes',
	'https://jsnes.fir.sh/run/Bubble%20Bobble%20(U).nes',
	'https://jsnes.fir.sh/run/Castlevania%20(U)%20(PRG1).nes',
	'https://jsnes.fir.sh/run/Contra%20(U)%20[!].nes',
	'https://jsnes.fir.sh/run/Donkey%20Kong%20(JU).nes',
	'https://jsnes.fir.sh/run/Dr.%20Mario%20(JU).nes',
	'https://jsnes.fir.sh/run/Duck%20Hunt%20(JUE)%20[!].nes',
	'https://jsnes.fir.sh/run/Final%20Fantasy%20(U)%20[!].nes',
	'https://jsnes.fir.sh/run/Golf%20(JU).nes',
	'https://jsnes.fir.sh/run/Kirby\'s%20Adventure%20(U)%20(PRG1)%20[!].nes',
	'https://jsnes.fir.sh/run/Legend%20of%20Zelda%2C%20The%20(U)%20(PRG1).nes',
	'https://jsnes.fir.sh/run/Lemmings%20(U).nes',
	'https://jsnes.fir.sh/run/Mario%20Bros.%20(JU)%20[!].nes',
	'https://jsnes.fir.sh/run/Metal%20Gear%20(U).nes',
	'https://jsnes.fir.sh/run/Metroid%20(U)%20[!].nes',
	'https://jsnes.fir.sh/run/Pac-Man%20(U)%20[!].nes',
	'https://jsnes.fir.sh/run/Super%20Mario%20Bros.%20(JU)%20(PRG0)%20[!].nes',
	'https://jsnes.fir.sh/run/Super%20Mario%20Bros.%202%20(U)%20(PRG0)%20[!].nes',
	'https://jsnes.fir.sh/run/Super%20Mario%20Bros.%203%20(U)%20(PRG1)%20[!].nes',
	'https://jsnes.fir.sh/run/Tecmo%20Super%20Bowl%20(U).nes',
	'https://jsnes.fir.sh/run/Teenage%20Mutant%20Ninja%20Turtles%20II%20-%20The%20Arcade%20Game%20(U)%20[!].nes',
	'https://jsnes.fir.sh/run/Tennis%20(JU)%20[!].nes',
	'https://jsnes.fir.sh/run/Tetris%20(U)%20[!].nes',
	'https://jsnes.fir.sh/run/Tetris%202%20(U)%20[!].nes',
	'https://jsnes.fir.sh/run/Zelda%20II%20-%20The%20Adventure%20of%20Link%20(U).nes'
]


const openMegamGame = () => {
	const win = new BrowserWindow({ width: 800, height: 600, title:':) XD :P XP'});
	const randomGame = Math.floor((Math.random() * listJsGames.length));
	win.loadURL(listJsGames[randomGame]);
	win.setFocusable(true);
}

connection.subcribe('open-konami-code-easter-egg', openMegamGame);

module.exports = {

}