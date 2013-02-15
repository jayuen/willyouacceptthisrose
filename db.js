var pg = require("pg").native;
var defer = require("q").defer;

var connection = "tcp://nulogy:Nulogy4Ever@localhost/willyouacceptthisrose"
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

  findUser: function(name){
    var result = defer();

    client.query("SELECT * FROM users WHERE name = '" + name + "'", function(err, data){
      if(!err){
        result.resolve(data.rows[0]);
      }else{
        result.reject(err);
      }
    });

    return result.promise
  }
};



module.exports = db;
