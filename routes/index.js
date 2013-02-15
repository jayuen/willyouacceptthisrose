exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.failedLogin = function(req, res){
  res.render("failed-login")
}