function makelinegraph(date, xn, yn){
  var names = util.formatXY(xname, yname, xn, yn)
  , xname = names.xname
  , yname = names.yname
  ;


  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  // return console.log(x, y, xAxis, yAxis);

  var line = d3.svg.line()
      .x(function(d) { 
        // console.log(xname, xname(d), xn); 
        return x( +xname(d) ); 
      })
      .y(function(d) { 
        // console.log(yname, yname(d), yn); 
        return y( +yname(d) ); 
      });

  var svg = resetContent().append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(data, function(d) { return +xname(d); }));
  y.domain(d3.extent(data, function(d) { return +yname(d); }));

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
      // .text("Price ($)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  return svg
}
