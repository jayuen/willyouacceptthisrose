var db = require('../db')
var q = require('q')

module.exports = {
  edit: function(req, res){
    db.findAllCandidates().then(function(candidates){
      var user = req.user;
      console.log(req.flash)

      res.render("edit_picks", {
        title: "Make your final picks",
        notice: req.flash('info'),
        candidates: candidates,
        user: user
      })
    })
  },

  submit: function(req, res){
    req.flash('info', 'Successfully Saved Picks!');
    res.redirect('/edit_my_picks');


  }
};
