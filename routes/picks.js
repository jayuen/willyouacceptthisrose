var db = require('../db');
var q = require('q');

module.exports = {
  edit: function(req, res){
    db.findAllCandidates().then(function(candidates){
      var user = req.user;
      console.log(user);

      res.render("edit_picks", {
        title: "Make your final picks",
        notice: req.flash('info'),
        candidates: candidates,
        user: user
      })
    })
  },

  submit: function(req, res){
    var user = req.user;
    user.pick1 = req.body.pick1;
    user.pick2 = req.body.pick2;
    user.pick3 = req.body.pick3;
    user.pick4 = req.body.pick4;

    db.updatePicks(user).then(function(){
      req.flash('info', 'Successfully Saved Picks!');
      res.redirect('/edit_my_picks');
    });
  }
};
