function Snake(x, y, side, col){
	this.x = x;
	this.y = y;
	this.side = side;
	this.xMove = 1;
	this.yMove = 0;
	this.col = col;

	this.render = function(updateColor){
		fill(updateColor);
		rect(this.x, this.y, this.side, this.side);
	}

	this.moveHead = function(){

		this.x = this.x + (this.xMove * this.side);
		this.y = this.y + (this.yMove * this.side);

		this.x = constrain(this.x, 0, width - this.side);
		this.y = constrain(this.y, 0, height - this.side);
	}

	this.moveTail = function(snake){
		this.x = snake.x;
		this.y = snake.y;
		this.xMove = snake.xMove;
		this.yMove = snake.yMove;
	}

	this.changeDirection = function(x, y){
		this.xMove = x;
		this.yMove = y;
	}

	this.collision = function(food){
		var d = dist(this.x, this.y, food.x, food.y);

		return (d < 1) ? true : false;
	}

	this.copyColor = function(food){
		this.col = food.col;
		this.x = 100;
		this.y = 100;
	}

	this.getX = function(){
		return this.x;
	}
	
	this.getY = function(){
		return this.y;
	}

	this.getxMove = function(){
		return this.xMove;
	}
	
	this.getyMove = function(){
		return this.yMove;
	}

	this.getColor = function(){
		return this.col;
	}
}