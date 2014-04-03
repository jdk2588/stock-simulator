var data = [
    {name: 'John', values: [0,1,3,9, 8, 7]},
    {name: 'Harry', values: [0, 10, 7, 1, 1, 11]},
    {name: 'Steve', values: [3, 1, 4, 4, 4, 17]},
    {name: 'Adam', values: [4, 77, 2, 13, 11, 13]}
];

var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 640 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;


var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.values.length - 1; })])
    .range([0, width]);
            
var y = d3.scale.linear()
    .domain([d3.min(data, function(d) { return d3.min(d.values); }),
             d3.max(data, function(d) { return d3.max(d.values); })])
    .range([height, 0]);

var color = d3.scale.category10()
    .domain(d3.keys(data[0]).filter(function(key) { return key === "name"; }));

var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(d3.format('d'))
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  var people = svg.selectAll(".people")
      .data(data)
    .enter().append("g")
      .attr("class", "people");

  people.append("path")
      .attr("class", "line")
      .attr("d", function(d) { console.log(d.values); return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  people.append("text")
      .datum(function(d) { return {name: d.name, length: d.values.length-1, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d, i) { return "translate(" + x(d.length) + "," + y(d.value) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
