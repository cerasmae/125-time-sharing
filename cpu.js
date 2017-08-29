var resources = [];
var users = [];

function generateResources(){
	return (Math.floor((Math.random() * 100)) % 30) + 1;
}

function Resource(number){
	this.number = number

}

function User(resource){
	this.resource = resource

	this.setResource = function(resource){
		this.resource = resource
	}
}

var rLimit = generateResources();
for(var i = 1; i <= rLimit; i++){
	resources.push(Resource(i));
}

var uLimit = generateResources();

for(var i = 1; i <= uLimit; i++){
	users.push(User(i));
}
