
Meteor.subscribe('games');
Meteor.subscribe('players');



function defaultValue(){

b0='0';
b1='1';
b2='2';
b3='3';
b4='4';
b5='5';
b6='6';
b7='7';
b8='8';


Meteor.call('removeAny',FlowRouter.getParam("_id"));
}


function value(id){
	var getId = document.getElementById(id);
	var value = getId.value;
	
	return value;}

function firstOrsecond(){
	if(Players.findOne({connectionId: Meteor.connection._lastSessionId})===undefined){
		if(Players.find({gameId:FlowRouter.getParam("_id")}).count()===0){
			Players.insert({
				beforeAfter:"first",
				gameId:FlowRouter.getParam("_id"),
				connectionId: Meteor.connection._lastSessionId
			});
		}
		else if(Players.find({gameId:FlowRouter.getParam("_id")}).count()===1){
			Players.insert({
				beforeAfter:"second",
				gameId:FlowRouter.getParam("_id"),
				connectionId: Meteor.connection._lastSessionId
			});
		}

		else{
			return;
		}

		
	}
	}

Template.TicTacToe.onCreated(function(){
	this.subscribe('games');
	this.subscribe('players');
});

Template.TicTacToe.helpers({

	maingame:function(){
		
		return Games.findOne({_id:FlowRouter.getParam("_id")});
	},

	circleorX:function(id){
		thisGame =  (Games.findOne({_id:FlowRouter.getParam("_id")}));
		if(thisGame.inputvalue){
		for(i=0;i<thisGame.inputvalue.length;i++){
			
			if(thisGame.inputvalue[i].Place && thisGame.inputvalue[i].Place===id){
				return thisGame.inputvalue[i].Type;
			}
		
}

};		
		
	},
	whichIsfirst:function(){
		firstOrsecond();

		thisPlayer = Players.findOne({connectionId:Meteor.connection._lastSessionId});

		if(thisPlayer.beforeAfter=="first"){
			return ("You are player1. Play first");
		}
		else{
			return("You are player2. Play second");
		}
	},

	waitOrno:function(){
		thisGame =  (Games.findOne({_id:FlowRouter.getParam("_id")}));
		if(thisGame.Player=="one"){
			return("Wait!! Looking for someone...");
		}
		else{
			return("Mathing");
		}
	}

});	


function thisValue(id){
	thisGame =  (Games.findOne({_id:FlowRouter.getParam("_id")}));
	for(i=0;i<thisGame.inputvalue.length;i++){
		if(thisGame.inputvalue[i].Place && thisGame.inputvalue[i].Place===id){
			return id = thisGame.inputvalue[i].Type;
		}
	}
}	


function judge(firstOrsecond){

	b0 = thisValue("b0");
	b1 = thisValue("b1");
	b2 = thisValue("b2");
	b3 = thisValue("b3");
	b4 = thisValue("b4");
	b5 = thisValue("b5");
	b6 = thisValue("b6");
	b7 = thisValue("b7");
	b8 = thisValue("b8");

if(
	b0=="◯"&&b1=="◯"&&b2=="◯"||
	b3=="◯"&&b4=="◯"&&b5=="◯"||
	b6=="◯"&&b7=="◯"&&b8=="◯"||
	b0=="◯"&&b3=="◯"&&b6=="◯"||
	b1=="◯"&&b4=="◯"&&b7=="◯"||
	b2=="◯"&&b5=="◯"&&b8=="◯"||
	b0=="◯"&&b4=="◯"&&b8=="◯"||
	b2=="◯"&&b4=="◯"&&b6=="◯"
	
	){
	if(firstOrsecond==1){
		alert("You win");
	}
	else{
		alert("You lose!! Fuck you!!");
	}
	defaultValue();
}
else if(b0=="×"&&b1=="×"&&b2=="×"||
		b3=="×"&&b4=="×"&&b5=="×"||
		b6=="×"&&b7=="×"&&b8=="×"||
		b0=="×"&&b3=="×"&&b6=="×"||
		b1=="×"&&b4=="×"&&b7=="×"||
		b2=="×"&&b5=="×"&&b8=="×"||
		b0=="×"&&b4=="×"&&b8=="×"||
		b2=="×"&&b4=="×"&&b6=="×"){
	if(firstOrsecond==1){
		alert("You lose!! Fuck you!!");
	}
	else{
		alert("You win");
	}
	defaultValue();
}
else if(turn>8){
	alert("drow");
	defaultValue();

}
}

function put(type,id){
				
				Meteor.call('putMove',type,id,FlowRouter.getParam("_id"),function(){
					if(turn>=5){
						if(thisPlayer.beforeAfter==="first"){
							judge(1);
						}
						else{
							judge(2);
						}
		    		}


				}

				);

			
}


Template.TicTacToe.events({
	'click input': function(event, template){
		var thisId = event.target.id;
		var thisValue = document.getElementById(thisId).value;
		thisPlayer = Players.findOne({connectionId:Meteor.connection._lastSessionId});
		turn = (thisGame.Turn)+1;

		if(thisPlayer.beforeAfter==="first" && turn%2!=0 && thisValue!="◯" && thisValue!="×"){
				
				Meteor.call('countTurn',FlowRouter.getParam("_id"));
				put("◯",thisId);

		}
		else if(thisPlayer.beforeAfter==="second" && turn%2==0 && thisValue!="◯" && thisValue!="×"){

				Meteor.call('countTurn',FlowRouter.getParam("_id"));
				put("×",thisId);
		}

	},
	'click .quit': function(){
		thisGame =  (Games.findOne({_id:FlowRouter.getParam("_id")}));
			if(thisGame.Player=="two"){
			console.log("changeFalse")
			Meteor.call('changeFalse',thisGame._id);
			}
			else{
			console.log("changeDefault")
			Meteor.call('changeDefault',thisGame._id);
			}
			Meteor.call('deletePlayer',Meteor.connection._lastSessionId);
	}
});

