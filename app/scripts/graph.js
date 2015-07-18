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
        .orient("bottom")
        .tickFormat(function(d){ return 'v ' + d });

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        // .ticks(10, "%");

    // console.dir(y)

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
      
      console.log(formatted); 

      // x.domain( data.map(function(d) { return xname(d); }) );
      // y.domain([0, d3.max(data, function(d) { return +yname(d); })]);
      
      // var flattened = Object.keys(formatted).map(function(key){
      //   var item = formatted[key]
      //   , count = 0
      //   ;
      //   Object.keys( item ).forEach(function(k){
      //     count += item[k];
      //   })
      //   return count
      // });

      var flattened = Object.keys(formatted).map(function(key){ return {name: key, values: formatted[key]} });
      
      var merged = flattened
        .map(function(a){ return Object.keys(a.values).map(function(b){ return [ a.name,  b, a.values[b] ] } ) })
        .reduce(function(a, b){ return a.concat(b) });
      
      var combined = flattened.map(function(d){
        var item = d.name
        , count = 0
        ;
        console.log(item)
        if(item){
          Object.keys( item ).forEach(function(k){
            count += item[k];
          })
          return count
        }
      }) 

      x.domain( [ 0 , combined.reduce(function(a, b){ return a + b }) ] );
      // console.dir(x)
      // y.domain([0, d3.max(data, function(d) { return +yname(d); })]);
      y.domain([0, d3.max(merged, function(d) { console.log(d, d[1]); return d[1] })]);

      console.log('flattened', flattened)
      console.log('max-height', d3.max(merged, function(d) { return d[2] }))
      console.log('y', y)

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
          // .text("Frequency");

      var left = 0;

      svg.selectAll(".bar")
          .data( merged )
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) {
             // console.log('x', x( xname(d) ) ); 
             // return x( xname(d) );
             // console.log(d);
             return left += d[2]

          })
          .attr("width", function(d){
            return d[2]
          })
          // .attr("width", x.rangeBand())
          .attr("y", function(d) { 
            var n = y( d[1] );
            // console.log('y', yname(d), n );
            return isNaN(n) ? 0 : n; 
          })
          .attr("height", function(d) { 
            var h = height - (y( d[1] || 0) )  ; 
            // var h = height - (y( d[1] || 0) )  ; 
            // console.log('height', h)
            return isNaN(h) ? height : h 
          })
          .attr('style', function(d){
            var color = ['red', 'green', 'yellow'][ d[0] ]
            // console.log(color);
            return 'fill:' + color + ';'
          })
          // .attr("y", function(d) { 
          //   var n = y( +yname(d) );
          //   // console.log('y', yname(d), n );
          //   return isNaN(n) ? 0 : n; 
          // })
          // .attr("height", function(d) { 
          //   var h = height - (y( +yname(d) || 0) )  ; 
          //   // console.log('height', h)
          //   return isNaN(h) ? height : h 
          // });
  
    return svg

  }

  // function type(d) {
  //   d.frequency = +d.frequency;
  //   return d;
  // }
})(window)