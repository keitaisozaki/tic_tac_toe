//DRY

eachGameId = function(){
	
		
		if(Games.findOne({Player:"one"})){
			thisID = (Games.findOne({Player:"one"}))._id;
		}
		else{
			thisID = (Games.findOne({Player:"no"}))._id;
		}
			return thisID
		};

Template.top.onCreated(function(){
	this.subscribe('games');
});

Template.top.helpers({
	'getId': function(){
		

		if(Games.find()){
			return eachGameId();}
		else{
			return;
		}
		
		}
});

Template.top.events({
	'click #start': function(event, template) {
			
			if(Games.findOne({Player:"one"})){
				Meteor.call('changeTrue',eachGameId());
				
			}
			else{
				Meteor.call('changeFalse',eachGameId());
			}
	

}
        
   
});



