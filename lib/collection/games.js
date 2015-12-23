Games = new Mongo.Collection("games");
Players = new Mongo.Collection("players");

Games.allow({
	insert:function(userId,doc){
		return true;
	},
	update:function(userId, doc, fields, modifier) {
    	return true;
  } 
	
});

Players.allow({
	insert:function(){
		return true;
	}
});

function createNewgame(){

		if(Games.find().count()<10){
		Games.insert({
		Turn:0,
		inputvalue:[{Type:"",Place:""}],
		Player:"no"
			})
		}
	}

if(Meteor.isClient){

Meteor.startup(function(){
	
		
		
		createNewgame();
	
});

}

if(Meteor.isServer){
	Meteor.startup(function(){
		
		
			
	});
}