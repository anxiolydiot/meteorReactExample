var choices = ['rock','paper','scissors'];

var gameHistory= new Mongo.Collection(gamehistory); //allows access to mongo db in browser code


if (Meteor.isClient) { //browser code 
 
  var App = React.createClass({
    mixins: [ReactMeteorData],
    getInitialState: function(){
      return {
        userShoot: ''
      };
    },
    getMeteorData : function(){ // property mixins implements 
      return {
        gameHistory: Gamehistory.find({createdBy: Meteor.userId}).fetch().reverse() //implements collection to find list of games played in reverse order (most recent game shown first)
      };
    },
    rspShoot : function (go){
      var compShoot = Math.floor(Math.Random()*(choices).length);
      var userShoot = go.target.getAttribute('shootDataNum');
      var outcome = rpsLogicAlgorithm.compare(userShoot, compShoot, choices);
      this.setState({ compShoot:compShoot, userShoot:userShoot, outcome:outcome
      });
      gameHistory.insert({
        user: Meteor.userId,
        compShoot:compShoot,
        userShoot:userShoot,
        outcome:outcome});
    },
    render: function(){
      var winsCount = 0;
      return (
        <div>
          <h1> Rock, Paper, Scissors </h1>
          <button className ="btn btn-default" onClick={this.rpsShoot} shootDataNum = '0'> 'Rock'</button>
          <button className ="btn btn-default" onClick={this.rpsShoot} shootDataNum = '1'> 'Rock'</button>
          <button className ="btn btn-default" onClick={this.rpsShoot} shootDataNum = '2'> 'Rock'</button>
        )

      })
    }
    }
  });

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
