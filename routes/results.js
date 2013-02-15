module.exports = {
  enter: function(req, res){
    res.render('enter_results', { 
      title: 'Enter weekly results', 
      candidates: this.candidates()
    });
  }, 

  submit: function(req, res){
    console.log('hello')

    // save to DB
    console.log(req.body.week)
    console.log(req.body.first)
    console.log(req.body.second)
    console.log(req.body.third)
    console.log(req.body.fourth)

    res.render('enter_results', { 
      title: 'Enter weekly results', 
      candidates: this.candidates(),
      notice: 'Saved succesfully'
    });
  },

  candidates: function(){
    return [{name: 'Catherine'}, {name: 'Ashlee'}, {name:'Desiree'}, {name:'Lindsay'}]
  }
}
