var height = 600;
var width = 600;
var numCircles = 40;
var radius = 10;
var  score = 0;
var highScore = 0;
var collisionNum = 0;
var collisionObj = {};

// Manage the score!
var updateScore = function(){
  score++;
  return d3.select('#currentScore').text(score);
};

//manage the high score
var updateHighScore = function(){
  return d3.select('#highScore').text(highScore);
};

// Helper functions
var updateCollisions = function() {
  return d3.select('#collisionNum').text(collisionNum);
};

var generateCoordinates = function() {
  var array = [];
  for (var i = 0; i < numCircles; i++) {
    array.push(i);
  }
  return array;
};

var dataArr = generateCoordinates();

// Draw elements in svg element
var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "gameArea")

svg.append('filter')
  .attr('id','image')
  .attr('width','100%')
  .attr('height','100%')
  .append('feImage')
  .attr('xlink:href','Ghost.png');

svg.append('filter')
  .attr('id','pacman')
  .attr('width','100%')
  .attr('height','100%')
  .append('feImage')
  .attr('xlink:href','Pacman.png');

// every second update the enemy locations
function update(data) {



  var gameboard = d3.select(".gameArea");

  var enemy = gameboard.selectAll('.enemy')
    .data(dataArr);


  enemy.enter().append("circle")
    .attr("cx", function(d) { return Math.random()*width*0.85;})
    .attr("cy", function(d) { return Math.random()*height*0.95;})
    .attr("class", "enemy")
    .attr("r", radius)
    .attr('filter','url(#image)');

  // enter + update
  enemy.transition()
    .attr("cx", function(d) { return Math.random()*width*0.85;})
    .attr("cy", function(d) { return Math.random()*height*0.95;})
    .duration(1000)
    .tween(".enemy", function(d) {
      return function(t) {
        var heroX = d3.select(hero[0][0]).attr('cx');
        var heroY = d3.select(hero[0][0]).attr('cy');
        var enemyX = d3.select(this).attr('cx');
        var enemyY = d3.select(this).attr('cy');
        if( Math.abs(heroX - enemyX) < 2*radius && Math.abs(heroY - enemyY) < 2*radius)  {
          collisionObj[d] = true;
          d3.select(this)
            .remove();
          //data.pop();
        }
      };
    });

  if (Object.keys(collisionObj).length > 0){
    for(var keys in collisionObj){
      collisionNum++;
    }
    collisionObj.delete;
    collisionObj = {};

    updateCollisions();
    if (score > highScore){
      highScore = score;
      updateHighScore();
    }
    score=0;
  }

  //d3.select('.eaten').remove();
  //data.pop();

  // exit
  enemy.exit()
    .remove();

}

// initial display
update(dataArr);

var gameboard = d3.select(".gameArea");

var hero = gameboard.selectAll(".hero")
  .data([{cx: width/4, cy: height/4}]);

hero.enter().append("circle")
  .attr("class", "hero")
  .attr("cx", function(d) { return d.cx;})
  .attr("cy", function(d) { return d.cy;})
  .attr("r",radius*2)
  .attr('filter','url(#pacman)');


var dragHero = d3.behavior.drag()
  .on('dragstart', function(){
  })
  .on('drag', function(d,i){
    d.cx += d3.event.dx;
    d.cy += d3.event.dy;
    d3.select(this).attr('cx', d.cx).attr('cy',d.cy);
  })
  .on('dragend', function() {
  });

hero.call(dragHero);


setInterval(function(dataArr) {
  update(dataArr);
},1000);

setInterval(updateScore, 100);

