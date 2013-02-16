var pg = require("pg").native;
var defer = require("q").defer;
var _ = require("underscore");

var db = {
  connectionString: "tcp://nulogy:Nulogy4Ever@localhost/willyouacceptthisrose",

  initialize: function(){
    this.client = pg.Client(db.connectionString);
    this.client.connect();
  },

  insertCandidate: function(name){
    var result = defer();

    this.client.query("INSERT INTO candidates(name) VALUES($1)", [name], result.resolve);

    return result.promise;
  },

  findAllCandidates: function(){
    var result = defer();

    this.client.query("SELECT * FROM candidates ORDER BY name", function(err, data){
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

    this.client.query("INSERT INTO users(email, name) VALUES($1, $1)", [email], result.resolve);

    return result.promise;
  },

  findUser: function(email){
    var result = defer();

    this.client.query("SELECT * FROM users WHERE email = $1", [email], function(err, data){
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
    var result = defer();

    this.client.query("UPDATE users SET pick1 = $1, pick2 = $2, pick3 = $3, pick4 = $4 WHERE email = $5",
      [user.pick1, user.pick2, user.pick3, user.pick4, user.email], result.resolve);

    return result.promise;
  }
};

_.bindAll(db);





module.exports = db;
