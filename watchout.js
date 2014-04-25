var height = 600;
var width = 600;
var numCircles = 20;

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
    .attr("r", 10);

  // enter + update
  enemy.transition()
    .attr("cx", function(d) { return d*Math.random()*width*0.85;})
    .attr("cy", function(d) { return d*Math.random()*height*0.95;})
    .duration(1000);


  // exit
  enemy.exit().remove();
}

// initial display
update(dataArr);

var gameboard = d3.select(".gameArea");

var hero = gameboard.selectAll(".hero")
  .data([0]);

hero.enter().append("circle")
  .attr("class", "hero")
  .attr("x", 40)
  .attr("y", 40)
  .attr("r",10);




// setInterval(function(dataArr) {
//   update(dataArr);
// },1000);

