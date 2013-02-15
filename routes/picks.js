exports.edit = function(req, res){
  //DB call to get the user
  var user = {name: 'Jason'}
  res.send("Editing picks for user" + user.name);
  res.render("edit_picks", {
    title: "Make your final picks",
    candidates: this.candidates(),
    picks: {first: "Lindsay", second: "Catherine", third: "Desiree", fourth: "Ashlee"}
  })
};
