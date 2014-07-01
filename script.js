var app = {

  playGame : function() {

    var player;

    $('.box').on('click', function(event){
      event.preventDefault();
      if (!($(this).hasClass('x')) && !($(this).hasClass('o'))) {
        app.count++;
        if (app.count % 2) {
          $(this).addClass('x');
          player = 'x';
        } else {
          $(this).addClass('o');
          player = 'o';
        }
      }
      //only run checkMatch if 5 moves have been made 
      if (app.count >= 5) {
        app.checkMatch(player);
      }
      
    }); //click event listener
  
  }, //playGame

  checkMatch : function(player) {
    console.log(player);
    //all possible winning combos
    var combos = [
       ['a1', 'b1', 'c1'],
       ['a2', 'b2', 'c2'],
       ['a3', 'b3', 'c3'],
       ['a1', 'b2', 'c3'],
       ['a3', 'b2', 'c1'],
       ['a1', 'a2', 'a3'],
       ['b1', 'b2', 'b3'],
       ['c1', 'c2', 'c3']
    ]

    //loop thru the combos array
    for (var i = 0; i < combos.length; i++) {
      var instance = combos[i];
      //set match to be true by default
      var match = true;
      //loop thru each combo
      for (var j = 0; j < instance.length; j++) {
        var id = instance[j];
        var selector = $('#'+id);
        //if any instances are missing the class of player, 
        //break out of the loop and move onto the next combo
        if (!(selector.hasClass(player))) {
          console.log(player);
          match = false;
          app.checkTie();
          break;
        }
      } //instance loop
      if (match === true) {
        app.alertWinner(player);
      }
    } // combos loop

  }, //checkMatch

  checkTie : function(){
    if (app.count === 9) {
      app.alertTie();
      app.closeModal();
    }
  },

  alertWinner : function(player) {
    var winner = (player).toUpperCase();
    $('.overlay1').fadeIn();
    $('p.winner').append(winner +' wins!');
    app.closeModal();
  },

  alertTie : function() {
    $('.overlay2').fadeIn();
    app.closeModal();
  },

  closeModal : function() {
    $('.overlay').on('click', function(){
      $('.overlay').fadeOut(
        //clear board, only after fadeOut completed
        app.resetGame()
      );
    });
  },

  resetGame : function(){
    //on successful game, refresh page
    $('.box').removeClass('x o');
    $('p.winner').empty();
    app.init();

  },

  init : function(){
    app.count = 0;
    app.playGame();  
    
  } // init

}; //namespace


$(document).ready(function(){
  app.init();
}); //doc ready