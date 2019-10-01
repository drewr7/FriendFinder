
var friends = require("../data/friends")

module.exports = function (app) {
    // //api path to get the friends data
    app.get('/api/friends', function (req,res) {
        res.json(friends);
    });
  
    // Updates friends array
    app.post('/api/friends', function (req, res) {
        // newFriend is the user that filled out the survey
        var newFriend = req.body;
  
        // compute best match from scores
        var bestMatch = {};
  
        for(var i = 0; i < newFriend.scores.length; i++) {
          if(newFriend.scores[i] == "1 (Strongly Disagree)") {
            newFriend.scores[i] = 1;
          } else if(newFriend.scores[i] == "5 (Strongly Agree)") {
            newFriend.scores[i] = 5;
          } else {
            newFriend.scores[i] = parseInt(newFriend.scores[i]);
          }
        }
  
        var bestMatchIndex = 0;
        //greatest score difference is 40
        var bestMatchDifference = 40;
  
        for(var i = 0; i < friends.length; i++) {
          var totalDifference = 0;
  
          for(var index = 0; index < friends[i].scores.length; index++) {
            var differenceOneScore = Math.abs(friends[i].scores[index] - newFriend.scores[index]);
            totalDifference += differenceOneScore;
          }
  
          // if the totalDifference in scores is less than the best match so far
          // save that index and difference
          if (totalDifference < bestMatchDifference) {
            bestMatchIndex = i;
            bestMatchDifference = totalDifference;
          }
        }
  
        // the best match index is used to get the best match data from the friends index
        bestMatch = friends[bestMatchIndex];
  
        // Put new friend from survey in "database" array
        friends.push(newFriend);
  
        // return the best match friend
        res.json(bestMatch);
    });
  
  };