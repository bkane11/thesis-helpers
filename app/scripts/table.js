
// The table generation function
function tabular(data, columns) {
    var table = resetContent().append("table")
    	.attr('class', 'table table-responsive table-striped')
    , thead = table.append("thead")
    , tbody = table.append("tbody")
    ;

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .attr('style', 'max-height:50px; overflow: auto;')
    ;

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
        
        .append('div')
	        .attr("style", "max-width: 400px; max-height: 50px; overflow: auto;") // sets the font style
	            .html(function(d) { return d.value; });
    
    console.log(table);

    return table;
}
