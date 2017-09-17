var game;

function setup(){
	createCanvas(900, 600);
	game = new Game();
	game.gameInit();
}

function draw(){
	background(51);
	game.gameRun();
	frameRate(game.getSpeed());
}

//37 = Left / 38 = Up / 39 = Right / 40 = Down
function keyPressed(){
	if(keyCode === 38){
		game.changeDirection(0);
	} else if(keyCode === 40){
		game.changeDirection(1);
	} else if(keyCode === 39){
		game.changeDirection(2);
	} else if(keyCode === 37){
		game.changeDirection(3);
	}

	if(key === ' '){
		if(!game.getRunning()){
			game.playAgain();
		}
	}
}
