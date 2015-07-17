var util = {
	getNumberFromString: function(txt){
		return ( txt.match(/\d/g) || [] ).join("");
	}
	
	, formatXY:  function(xname, yname, xn, yn){
		if(typeof xn !== 'function')
			xname = function(d){ return d[xn] }
		else
		    xname = xn
		if(typeof yn !== 'function')
		    yname = function(d){ return d[yn] }
		else
		    yname = yn
		
		return {xname: xname, yname: yname}
	} 
}