function MapInfo(infoEmpty, col){
	this.infoEmpty = infoEmpty;
	this.infoColor = col;

	this.setInfo = function(infoEmpty, col){
		this.infoEmpty = infoEmpty;
		this.infoColor = col; 
	}

	this.isEmpty = function(){
		return (this.infoEmpty === 0) ? true : false;
	}

	this.getInfo = function(){
		return this.infoEmpty;
	}

	this.getColor = function(){
		return this.infoColor;
	}
}