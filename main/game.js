function Game(){
	this.running = true;
	this.speed = 10;
	this.maxSpeed = 30;
	this.minSpeed = 5;
	this.snakes;
	this.snakeInitSize = 15;
	this.snakeSide = 15;
	this.foods;
	this.foodInitSize = 20;
	this.colors = [];
	this.mapGame;

	this.gameRun = function(){
		this.speed = 30 - this.snakes.length;
		if(this.snakes.length === 0){
			textAlign(CENTER);
			textStyle(BOLD);
			textSize(28);
			text("Congratulations, you win!!! o/", 450, 280);
			textStyle(NORMAL);
			textSize(20);
			text("Press space to play again!", 450, 320);
			this.running = false;
		}else{
			if(this.running){
				this.snakeMove();

				this.snakeCollission();

				this.gameRender(this.snakes);
				for(var i = 0; i < 5; i++){
					this.gameRender(this.foods[i]);
				}
			}else{
				textAlign(CENTER);
				textStyle(BOLD);
				textSize(28);
				text("Sorry, you lose!!! y.y", 450, 280);
				textStyle(NORMAL);
				textSize(20);
				text("Press space to play again!", 450, 320);
			}
		}
	}

	this.playAgain = function(){
		this.running = true;
		this.gameInit();
	}

	this.gameInit = function(){
		this.foods = [];
		this.snakes = [];
		this.mapGame = [];

		this.mapGameInit();
		this.colorsInit();
		this.snakeInit();
		this.foodInit();
	}

	this.colorsInit = function(){
		this.colors.push(color(220, 0, 0, 255)); //RED
		this.colors.push(color(0, 255, 0, 255)); //GREEN
		this.colors.push(color(0, 0, 255, 255)); //BLUE
		this.colors.push(color(255, 255, 0, 255)); //YELLOW
		this.colors.push(color(255, 255, 255, 255)); //WHITE
	}

	this.snakeInit = function(){
		var x;
		var y = 90;
		for(var i = 0;i < this.snakeInitSize;i++){
			x = 240 - i*this.snakeSide;
			
			var snake = new Snake(x, y, this.snakeSide, floor(random(0, 5)));	
			this.snakes.push(snake);
				
			x /= this.snakeSide;
			this.mapGame[x][6].setInfo(1, color(0,0,0,0));
		}
	}

	this.foodInit = function(){
		for(var i = 0; i < 5; i++){
			this.foods[i] = [];
			for(var j = 0; j < this.foodInitSize; j++){
				this.newFood(i, j);
			}
		}
	}

	this.mapGameInit = function(){
		for(var i = 0; i < width/this.snakeSide; i++){
			for(var j = 0; j < height/this.snakeSide; j++){
				this.mapGame[i] = [j];
			}
		}
		for(var i = 0; i < width/this.snakeSide; i++){
			for(var j = 0; j < height/this.snakeSide; j++){
				var mapInfo = new MapInfo(0, color(0,0,0,0));
				this.mapGame[i][j] = mapInfo;
			}
		}
	}

	this.newFood = function(col, j){
		var maxX = width/this.snakeSide;
		var maxY = height/this.snakeSide;

		var x = floor(random(maxX));
		var y = floor(random(maxY));

		while(!this.mapGame[x][y].isEmpty()){
			x = floor(random(maxX));
			y = floor(random(maxY));
		}

		this.mapGame[x][y].setInfo(2, col);

		var food = new Food(x * this.snakeSide, y * this.snakeSide, this.snakeSide, col);

		this.foods[col][j] = food;
	}

	this.gameRender = function(obj){
		for(var i = 0;i < obj.length;i++){
			obj[i].render(this.colors[obj[i].getColor()]);
		}
	}

	this.snakeMove = function(){
		var x = this.snakes[this.snakes.length-1].getX()/this.snakeSide;
		var y = this.snakes[this.snakes.length-1].getY()/this.snakeSide;
		this.mapGame[x][y].setInfo(0, color(0,0,0,0));

		for(var i = this.snakes.length-1; i > 0; i--){
			this.snakes[i].moveTail(this.snakes[i-1]);
		
			x = this.snakes[i].getX()/this.snakeSide;
			y = this.snakes[i].getY()/this.snakeSide;
		
			this.mapGame[x][y].setInfo(1, color(0,0,0,0));
		}
		this.snakes[0].moveHead();
	}

	this.changeDirection = function(flag){
		if(flag === 0 && this.snakes[0].getyMove() === 0){
			this.snakes[0].changeDirection(0, -1);
		} else if(flag === 1 && this.snakes[0].getyMove() === 0){
			this.snakes[0].changeDirection(0, 1);
		} else if(flag === 2 && this.snakes[0].getxMove() === 0){
			this.snakes[0].changeDirection(1, 0);
		} else if(flag === 3 && this.snakes[0].getxMove() === 0){
			this.snakes[0].changeDirection(-1, 0);
		}
	}

	this.snakeCollission = function(){
		var x = this.snakes[0].getX()/this.snakeSide;
		var y = this.snakes[0].getY()/this.snakeSide;

		if(!this.mapGame[x][y].isEmpty()){
			if(this.mapGame[x][y].getInfo() === 1){
				this.running = false;
			} else if (this.mapGame[x][y].getInfo() === 2){
				if(this.snakes[0].getColor() === this.mapGame[x][y].getColor()){
					//Diet!!!
					this.deleteFood(x, y, this.mapGame[x][y].getColor());
					this.snakes.splice(0,1);
					this.mapGame[x][y].setInfo(0, 0);
				} else { 
					//Eat food!!
					this.deleteFood(x, y, this.mapGame[x][y].getColor());
					var snake = new Snake(x * this.snakeSide, y * this.snakeSide, this.snakeSide, this.mapGame[x][y].getColor());	
					this.snakes.push(snake);
					this.mapGame[x][y].setInfo(0, 0);
				}
			}
		}
	}

	this.deleteFood = function(x, y, col){
		for(var i = 0; i < this.foods[col].length; i++){
			if(this.foods[col][i].getX() === x*this.snakeSide && this.foods[col][i].getY() === y*this.snakeSide){
				this.foods[col].splice(i,1);
			}
		}
	}

	this.getColor = function(col){
		return this.colors[col];
	}

	this.getSpeed = function(){
		if(this.speed > this.maxSpeed){
			this.speed = this.maxSpeed;
		}else if(this.speed < this.minSpeed){
			this.speed = this.minSpeed;
		}
		return this.speed;
	}

	this.getRunning = function(){
		return this.running;
	}
}