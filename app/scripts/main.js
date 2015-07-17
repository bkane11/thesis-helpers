var data, columns;

function handleCSV(res){
	data = res
	columns = Object.keys(data[0]);
	console.log(data);
	console.log(columns);
}

function linegraph(data, columns){
	var content = resetContent();
	makelinegraph(
		data
		, function(d){ 
			return util.getNumberFromString( d[ 'version' ] )
		}
		, 'How many years old are you?'
		)
	// makelinegraph(data, function(d){ console.log(d['version'], d); return lib.getNumberFromString( d[ 'version' ] )} , 'How many years old are you?' )
}

function barchart(data, columns){
	var content = resetContent();
	makebarchart(
		data
		, function(d){
			return util.getNumberFromString( d[ 'version' ] )
		}
		, function(d){ 
			return dangerScaleNumberLookup[ d['Using the following avalanche danger forecast, what is the highest level of avalanche danger that the path on the map below passes through?'] ] 
		})
	// makebarchart(data, function(d){ return util.getNumberFromString( d[ 'version' ] )} , 'Given the avalanche danger scale above, what is the highest level of avalanche danger you would consider entering into?' )
	// makelinegraph(data, function(d){ console.log(d['version'], d); return lib.getNumberFromString( d[ 'version' ] )} , 'How many years old are you?' )
}

function resetContent(){
    var content = d3.select("#content");
	$(content.node()).empty();
	return content
}


// get google sheet as csv with: https://docs.google.com/spreadsheets/d/1VJf0rA0IcYLUrd9oXNC0cQ77kLvI31SJeEQsjhl7_gE/export?format=csv&id=1VJf0rA0IcYLUrd9oXNC0cQ77kLvI31SJeEQsjhl7_gE
// d3.csv("https://docs.google.com/spreadsheets/d/1VJf0rA0IcYLUrd9oXNC0cQ77kLvI31SJeEQsjhl7_gE/export?format=csv&id=1VJf0rA0IcYLUrd9oXNC0cQ77kLvI31SJeEQsjhl7_gE", handleCSV);
d3.csv("data/responses.csv", handleCSV);

$('navbar').on('click', 'a', function(){
	console.log(this.href.substr(1))
	setTimeout(function(){
		var action = location.hash.substr(1);
		window[action](data, columns)
	}, 10)
})