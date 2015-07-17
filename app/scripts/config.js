var margin = {top: 20, right: 20, bottom: 30, left: 50}
, width = 960 - margin.left - margin.right
, height = 500 - margin.top - margin.bottom

, parseDate = d3.time.format("%d-%b-%y").parse

, dangerScaleNumberLookup = {
	Low : 1
	, Moderate : 2
	, Considerable : 3
	, High : 4
	, Extreme : 5
}
;
