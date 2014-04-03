var stocks ;
var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(-height, 0)
    .tickPadding(6);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(-width)
    .tickPadding(6);

var area = d3.svg.area()
    .interpolate("step-after")
    .x(function(d, i) { return x(i); })
    .y0(y(0))
    .y1(function(d, i) { return y(d); });

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

var zoom = d3.behavior.zoom()
    .on("zoom", draw);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function draw() {
  svg.select("g.x.axis").call(xAxis);
  svg.select("g.y.axis").call(yAxis);
  //svg.select("path.line").attr("d", line);
  stock_method(stocks);
}

svg.append("path")
    .attr("class", "area")
    .attr("clip-path", "url(#clip)")
    .style("fill", "url(#gradient)");

svg.append("rect")
    .attr("class", "pane")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);

svg.append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("x", x(0))
    .attr("y", y(1))
    .attr("width", x(1) - x(0))
    .attr("height", y(0) - y(1));

function stock_method(stocks) {

  var stock = svg.selectAll(".stock")
      .data(stocks)
    .enter().append("g")
      .attr("class", "stock");

  stock.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  stock.append("text")
      .datum(function(d) { return {name: d.name, length: d.values.length-1, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d, i) { return "translate(" + x(d.length) + "," + y(d.value) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
};

d3.xhr("/return_stock_values", function(error, data) {
  data = JSON.parse(data.response);
  color.domain(d3.keys(data[0]).filter(
      function(key) { 
        return key === "values"; 
      }
    ));

  //data.forEach(function(d) {
  //  d.date = parseDate(d.date);
  //});
  //

  stocks = data;
  x.domain([0, d3.max(data, function(d) { return d.values.length - 1; })]);

  y.domain([
      d3.min(stocks, function(c) { return d3.min(c.values); }),
    d3.max(stocks, function(c) { return d3.max(c.values); }),
  ]);
  zoom.x(x);

  svg.select("path.line").data([data]);
  draw();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Stock Value");

      svg.append("path")
      .attr("class", "line")
      .attr("clip-path", "url(#clip)");

  stock_method(stocks);
});
