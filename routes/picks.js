exports.edit = function(req, res){
  //DB call to get the user
  var user = {name: 'Jason'}
  res.send("Editing picks for user" + user.name);
};
