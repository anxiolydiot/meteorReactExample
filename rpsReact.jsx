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
    }
  });

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
