var db = require('../db')
var q = require('q')

module.exports = {
  edit: function(req, res){
    q.all([db.findUser('Jason Yuen'), db.findAllCandidates()]).spread(function(user, candidates){
      res.render("edit_picks", {
        title: "Make your final picks",
        candidates: candidates,
        picks: {first: user.pick1, second: user.pick2, third: user.pick3, fourth: user.pick4 }
      })
    }) 
  }
};
