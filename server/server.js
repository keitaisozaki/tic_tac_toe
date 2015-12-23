Meteor.publish('games',function(){
	return Games.find()
});

Meteor.publish('players',function(){
	return Players.find()
});




Meteor.methods({
'putMove': function(type, id,gameId){
	

		Games.update({_id:gameId}, {$push:{inputvalue:{Type:type,Place:id}}}); //array update operator in MongoDB reference/docs
	
	
},
'countTurn':function(gameId){
	Games.update({_id:gameId}, {$inc:{Turn:1}},true);
},

'removeAny':function(gameId){
	Games.update({_id:gameId}, {$set: {Turn:0,inputvalue:[{Type:"",Place:""}],Player:"no"}},true);


},

'changeFalse':function(gameId){
	Games.update({_id:gameId}, {$set:{Player:"one"}},true);
},

'changeTrue':function(gameId){
	Games.update({_id:gameId}, {$set:{Player:"two"}},true);
},

'changeDefault':function(gameId){
	Games.update({_id:gameId}, {$set:{Player:"no"}},true);
},

'deletePlayer':function(playerId){
	Players.remove({connectionId:playerId});
}



});