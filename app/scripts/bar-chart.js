;(function(context){
  
  window.makebarchart = function(data, xn, yn){
    var names = util.formatXY(xname, yname, xn, yn)
    , xname = names.xname
    , yname = names.yname
    ;

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    var svg = resetContent().append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(data.map(function(d) { return xname(d); }));
      y.domain([0, d3.max(data, function(d) { return +yname(d); })]);

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
          .text("Frequency");

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x( xname(d) ); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { console.log(d, yname(d)); return y( +yname(d) ); })
          .attr("height", function(d) { return height - y( +yname(d) ); });
  
    return svg

  }

  // function type(d) {
  //   d.frequency = +d.frequency;
  //   return d;
  // }
})(window)