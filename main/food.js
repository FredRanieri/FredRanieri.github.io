function Food(x, y, r, col){
	this.x = x;
	this.y = y;
	this.r = r;
	this.col = col;

	this.render = function(updateColor){
		fill(updateColor);
		ellipse(this.x + this.r/2, this.y + this.r/2, this.r, this.r);
	}

	this.collision = function(food){
		var d = dist(this.x, this.y, food.x, food.y);

		return (d < 1) ? true : false;
	}

	this.getX = function(){
		return this.x;
	}
	
	this.getY = function(){
		return this.y;
	}

	this.getColor = function(){
		return this.col;
	}
}