var resources = [];
var users = [];
var canvas;
var ctx;
canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth*2;
canvas.height = window.innerHeight*2;
ctx.font = "20px Tahoma";

function generateRandom(limit){
	return (Math.floor((Math.random() * limit))) + 1;
}

function Resource(number, color){
	this.number = number;
	this.name = "Resource # "+number;
	this.queue = [];
	this.color = color;

	this.addQueue = function(user){
		this.queue.push(user);
	}

	this.process = function(user){
		if(this.queue.length > 0){
			if(this.queue[0].length <= 1){
				this.queue.shift();
				// var user = this.queue.shift();
				// user.setResource();
				// user.setLength();
			} else{
				this.queue[0].length--;
			}
		}
	}
}

function User(number, length, color){
	this.name = "User # "+number;
	this.length = length;
	this.color = color;

	this.setLength = function(){
		this.length = generateRandom(30);
	}

	this.setResource = function(){
		var newResource = generateRandom(rLimit);
		resources[newResource-1].addQueue(this);
	}
}

function drawResources(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var height = canvas.height/resources.length;
	var width = 200;
	var startX = 15;
	var startY = 0;
	var queueX = startX;
	var queueTotal = 0;

	for(var i = 0; i < resources.length; i++){
		ctx.fillStyle = resources[i].color;
		ctx.fillRect(startX, startY+5, width, height-10);
		queueX = startX + width + 15;
		queueTotal = 0;

		ctx.fillStyle = "black";
		ctx.fillText(resources[i].name, startX+(width/10), startY+(height/2) );
		if(resources[i].queue.length > 0){
			ctx.fillStyle = resources[i].queue[0].color;
			ctx.fillRect(queueX+5, startY+5, width-10, height-10);
			ctx.fillStyle = "black";
			ctx.fillText(resources[i].queue[0].name+" ("+ resources[i].queue[0].length +")", queueX+(width/10), startY+(height/2) );
			queueX+=width;
			queueTotal = resources[i].queue[0].length;
			for(var j = 1; j < resources[i].queue.length; j++){
				ctx.fillStyle = resources[i].queue[j].color;
				ctx.fillRect(queueX+5, startY+5, width-10, height-10);
				ctx.fillStyle = "black";
				ctx.fillText(resources[i].queue[j].name, queueX+(width/10), startY+(height/2) );
				ctx.fillText("(waiting until "+queueTotal+")", queueX+(width/12), startY+(height*0.80) );
				queueTotal += resources[i].queue[j].length;
				queueX+=width;
			}
			ctx.fillText("Free at: "+queueTotal, startX+(width/4.5), startY+(height*0.80) );
		} else {
			ctx.fillStyle = "black";
			ctx.fillText("Free", startX+(width/3), startY+(height*0.80) );
		}
		startY+=height;
	}
}

function checkResources(){
	for(var i = 0; i < resources.length; i++){
		resources[i].process();
	}
}

/////////////////////////////////////////////

var rLimit = generateRandom(30);

console.log("resources: "+rLimit);

for(var i = 1; i <= rLimit; i++){
	resources.push(new Resource(i, color=randomColor({luminosity: 'light'})));
}

var uLimit = generateRandom(30);

console.log("users: "+uLimit);
var newUser = {};
for(var i = 1; i <= uLimit; i++){
	var resourceNum = generateRandom(rLimit);
	for(var j = 0; j < resourceNum; j++ ){
		var resource = generateRandom(rLimit);
		newUser = new User(i, length=generateRandom(30), color=randomColor({luminosity: 'light'}));

		if( resources[resource-1].queue.length > 0 ){
			if( newUser.name != resources[resource-1].queue[resources[resource-1].queue.length-1].name ){
				resources[resource-1].addQueue(newUser);
			}
		} else{
			resources[resource-1].addQueue(newUser);
		}
	}
}

drawResources(rLimit);

setInterval(function(){
	checkResources();
	drawResources();
}, 1000);
