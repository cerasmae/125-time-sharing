var resources = [];
var users = [];

function generateResources(){
	return ((Math.random() * 100) % 30) + 1;
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

var limit = generateResources();
for(var i = 1; i <= limit; i++){
	resources.push(Resource(i));
}

limit = generateResources();

for(var i = 1; i <= limit; i++){
	users.push(User(i));
}
