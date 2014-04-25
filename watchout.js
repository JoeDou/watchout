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


function update(data) {


  var enemy = d3.select(".gameArea").selectAll("circle")
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

setInterval(function(dataArr) {
  update(dataArr);
},1000);

