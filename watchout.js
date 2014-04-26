var height = 600;
var width = 600;
var numCircles = 20;
var radius = 10;

// Helper functions

var generateCoordinates = function() {
  var array = [];
  for (var i = 0; i < numCircles; i++) {
    array.push(1);
  }
  return array;
};

var dataArr = generateCoordinates();

// Draw elements in svg element
var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "gameArea");

// every second update the enemy locations
function update(data) {


  var gameboard = d3.select(".gameArea");

  var enemy = gameboard.selectAll('.enemy')
    .data(dataArr);

  // enter
  enemy.enter().append("circle")
    .attr("cx", function(d) { return d*Math.random()*width*0.85;})
    .attr("cy", function(d) { return d*Math.random()*height*0.95;})
    .attr("class", "enemy")
    .attr("r", radius);

  // enter + update
  enemy.transition()
    .attr("cx", function(d) { return d*Math.random()*width*0.85;})
    .attr("cy", function(d) { return d*Math.random()*height*0.95;})
    .duration(1000)
    .tween(".enemy", function() {
      return function(t) {
        var heroX = hero[0][0].cx.animVal.value;
        var heroY = hero[0][0].cy.animVal.value;
        var enemyX = this.cx.animVal.value;
        var enemyY = this.cy.animVal.value;
        if( Math.abs(heroX - enemyX) < radius && Math.abs(heroY - enemyY))  {
          console.log("YEP");
        }

      };
    });


  // exit
  enemy.exit().remove();
}

// initial display
update(dataArr);

var gameboard = d3.select(".gameArea");

var hero = gameboard.selectAll(".hero")
  .data([{cx: width/2, cy: height/2}]);

hero.enter().append("circle")
  .attr("class", "hero")
  .attr("cx", function(d) { return d.cx;})
  .attr("cy", function(d) { return d.cy;})
  .attr("r",radius);

var dragHero = d3.behavior.drag()
  .on('dragstart', function(){
    d3.event.sourceEvent.stopPropagation();
    d3.event.sourceEvent.preventDefault();
  })
  .on('drag', function(d,i){
    d.cx += d3.event.dx;
    d.cy += d3.event.dy;
    d3.select(this).attr('cx', d.cx).attr('cy',d.cy);
  })
  .on('dragend', function() {
    console.log('dragend');
  });

hero.call(dragHero);
console.log(hero[0][0].cx.animVal.value);


setInterval(function(dataArr) {
  update(dataArr);
},1000);

