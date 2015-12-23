FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("top");
    }
});




FlowRouter.route('/eachGame/:_id', {
    action: function(params) {

        BlazeLayout.render("TicTacToe");
    }
});
