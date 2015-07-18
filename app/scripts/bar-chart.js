;(function(context){
  
  window.makebarchart = function(data, xn, yn){
    var names = util.formatXY(xname, yname, xn, yn)
    , xname = names.xname
    , yname = names.yname
    ;

     var x = d3.scale.linear()
      .range([0, width]);
    // var x = d3.scale.ordinal()
    //   .rangeRoundBands([0, width], 1);
    //  // .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(0)
    ;

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5)
      .tickFormat(function(d){
        return dangerScaleNumberLookupReverse[d]
      })
    ;

    var svg = resetContent().append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var formatted = {};
      data.forEach(function(d){
        var version = xname(d)
        , answer = +yname(d)
        , entry = formatted[version] || ( formatted[version] = {} ) 
        ;
        entry[answer] = ( entry[answer] || ( entry[answer] = 0 ) ) + 1
      }); 
      
      // console.log(formatted); 

      var flattened = Object.keys(formatted).filter(function(key){return key}).map(function(key){ return {name: key, values: formatted[key]} });
      
      var merged = flattened
        .map(function(a){ return Object.keys(a.values).map(function(b){ return [ a.name,  b, a.values[b] ] } ) })
        .reduce(function(a, b){ return a.concat(b) });
      
      var combined = flattened
        .map(function(d){
          var item = d.values, count = 0;
          if(item){
            Object.keys( item ).forEach(function(k){
              count += item[k];
            })
            return count
          }
        });

      var maxheight = d3.max(merged, function(d) { return d[2] });

      x.domain( [ 0 , combined.reduce(function(a, b){ return a + b }) ] );
      y.domain([ 0, 5 ]);

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
          .style("font-size", 14)
          .style("font-weight", "bold")
          .text('Danger Level')

      var left = 10;
      svg.selectAll(".bar")
          .data( merged )
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) {
            var pos = +left
            left += x( d[2] )
            return pos
          })
          .attr("width", function(d){
            return x( d[2] )
          })
          .attr("y", function(d) { 
            var n = y( d[1] );
            return isNaN(n) ? 0 : n; 
          })
          .attr("height", function(d) { 
            var h = height - (y( d[1] || 0) )  ; 
            return isNaN(h) ? height : h 
          })
          .attr('data-version', function(d){
            return d[0]
          })
          .style('fill', function(d){
            var color = ['red', 'green', 'yellow'][ d[0]-1 ]
            return color
          })
          .style('stroke', '#000')
          .style('stroke-width', 1)
          
      svg.selectAll('rect')
        .each(function(d){
          var text = d[2]
          , el = d3.select(this)
          , label = svg 
            .append('text')
            .text(text)
            .attr( 'x', el.attr('x') )
            .attr( 'y', el.attr('y') )
            .attr( 'dy', -5 )
            .style('font-size', 12)
            .style('font-weight', 'bold')

        })
  
    return svg

  }

})(window)