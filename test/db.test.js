var pg = require("pg").native;
var expect = require("chai").expect;
var db = require("../db");
var step = require("step");

var connection = "tcp://nulogy:Nulogy4Ever@localhost/willyouacceptthisrose"
var client = pg.Client(connection);

client.connect();

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

    after(function(){
      client.end();
    });
  });
});