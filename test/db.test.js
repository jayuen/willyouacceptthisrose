var expect = require("chai").expect;
var db = require("../db");
var step = require("step");

db.connectionString = "tcp://nulogy:Nulogy4Ever@localhost/willyouacceptthisrose_test";
db.initialize();
var client = db.client;

describe("DB", function(){
  describe("candidates", function(){
    it("can be added", function(done){
      step(
        function(){
          db.insertCandidate('foo').then(this);
        },
        function(){
          client.query("SELECT * FROM candidates", this);
        },
        function(err, results){
          expect(results.rows[0].name).to.equal('foo');
          this();
        },
        done
      );
    });

    it("can be listed", function(done){
      step(
        function(){
          client.query("INSERT INTO candidates(name) VALUES('bar')", this.parallel());
          client.query("INSERT INTO candidates(name) VALUES('foo')", this.parallel());
        },
        function(){
          db.findAllCandidates().then(this);
        },
        function(candidates){
          expect(candidates[0].name).to.equal('bar');
          expect(candidates[1].name).to.equal('foo');
          this();
        },
        done
      );
    });

    afterEach(function(done){
      client.query("DELETE FROM candidates", done);
    });
  });

  describe("users", function() {
    it("can be created", function(done) {
      step(
        function(){
          db.insertUser('foo@bar.net').then(this);
        },
        function(){
          client.query("SELECT * FROM users", this);
        },
        function(err, results){
          var data = results.rows[0];

          expect(data.email).to.equal('foo@bar.net');
          this();
        },
        done
      );
    });

    it("can have picks updated", function(done){
      var user = {
        email: 'foo@bar.net',
        name: 'foo@bar.net',
        pick1: 1,
        pick2: 2,
        pick3: 3,
        pick4: 4,
        score: null
      };

      step(
        function(){
          client.query(
            "INSERT INTO users(name, email, pick1, pick2, pick3, pick4) " +
            "VALUES($1, $1, $2, $2, $2, $2)",
            [user.email, 50], this);
        },
        function(){
          db.updatePicks(user).then(this);
        },
        function(){
          db.findUser(user.email).then(this);
        },
        function(updatedUser){
          delete updatedUser.id;
          expect(updatedUser).to.deep.equal(user);
          this();
        },
        done
      );
    });

    it("can be found", function(done) {
      step(

        function(){
          client.query("INSERT INTO users(name, email) VALUES('foo@bar.net', 'foo@bar.net')", this);
        },
        function(){
          db.findUser('foo@bar.net').then(this);
        },
        function(user){
          expect(user.name).to.equal('foo@bar.net');
          this();
        },
        done
      );
    });

    describe("findOrCreate", function() {
      it("returns a user", function(done){
        db.findOrCreateUser('foo@bar.net').then(function(user){

          expect(user.email).to.equal('foo@bar.net');
        }).then(done, done);
      });

      it("doesn't create when user exists", function(done) {
        step(
          function(){
            client.query("INSERT INTO users(name, email) VALUES('foo@bar.net', 'foo@bar.net')", this);
          },
          function(){
            db.findOrCreateUser('foo@bar.net').then(this);
          },
          function(){
            client.query("SELECT * FROM users WHERE email = 'foo@bar.net'", this)
          },
          function(err, results){
            expect(results.rows.length).to.equal(1);
            this();
          },
          done
        )
      });

      it("creates when user doesn't exists", function(done){
        step(
          function(){
            db.findOrCreateUser('foo@bar.net').then(this);
          },
          function(){
            client.query("SELECT * FROM users WHERE email = 'foo@bar.net'", this)
          },
          function(err, results){
            expect(results.rows.length).to.equal(1);
            this();
          },
          done
        )
      });
    });

    afterEach(function(done){
      client.query("DELETE FROM users", done);
    });
  });

  after(function(){
    client.end();
  });
});