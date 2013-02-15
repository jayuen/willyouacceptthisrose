var pg = require("pg").native;
var defer = require("q").defer;

var connection = "tcp://nulogy:Nulogy4Ever@localhost/willyouacceptthisrose";
var client = pg.Client(connection);

client.connect();

var db = {
  insertCandidate: function(name){
    var result = defer();

    client.query("INSERT INTO candidates(name) VALUES($1)", [name], result.resolve);

    return result.promise;
  },

  findAllCandidates: function(){
    var result = defer();

    client.query("SELECT * FROM candidates ORDER BY name", function(err, data){
      if(!err){
        result.resolve(data.rows);
      }else{
        result.reject(err);
      }
    });

    return result.promise;
  },

  insertUser: function(email){
    var result = defer();

    client.query("INSERT INTO users(email, name) VALUES($1, $1)", [email], result.resolve);

    return result.promise;
  },

  findUser: function(email){
    var result = defer();

    client.query("SELECT * FROM users WHERE email = $1", [email], function(err, data){
      if(!err){
        result.resolve(data.rows[0]);
      }else{
        result.reject(err);
      }
    });

    return result.promise;
  },

  findOrCreateUser: function(email){
    var result = defer();
    var create = this.insertUser;
    var find = this.findUser;

    find(email).then(function(user){
      if(user){
        result.resolve(user);
      }else{
        create(email).then(function(){
          result.resolve({email: email});
        });
      }
    }, result.reject);

    return result.promise;
  },

  updatePicks: function(user){

  }
};



module.exports = db;
