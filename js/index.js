

bikeStationIdDict = {};
d3.json("../bike_stop_id_to_geodata.json", function(error, bikeStationData){
	bikeStationIdDict = bikeStationData;
	// console.log(bikeStationData);
});

bikeStationTouristRatioData = [];

var currentDisplayMonth = 8;
var currentDisplayYear = 2013;


$(document).ready(function(){

	var width = 960,
    height = 860;
	console.log("in here");

	var svg = d3.select("#map-svg");
	console.log(svg);

	svg.attr("width", width)
	   .attr("height", height);

	var bikeStationTouristRatioData = [];


	// draw the map
	d3.json("../nyc_map/borough_topo.json", function(error, nyc) {
	  if (error) return console.error(error);

	  // (40.755775, -73.982620) center for Manhattan island

		projection = d3.geo.mercator()
  					.center([-73.975239, 40.731698])
  					.scale(340000)
  					.translate([(width) / 2, (height)/2]);

  		var path = d3.geo.path()
			.projection(projection);

		/*svg.append("path")
		    .datum( topojson.feature( nyc, nyc.objects.boroughs ))
		    .attr("d", path);
		*/

		svg.selectAll(".borough")
		    .data(topojson.feature(nyc, nyc.objects.boroughs).features)
		  .enter().append("path")
		    .attr("class", function(d) { 
		    	// console.log(d);
		    	return "borough"; })
		    .attr("d", path);

		var stationTip = d3.tip().attr('class', 'station-tip').html(function(d) { return bikeStationIdDict[d.stop_id]["stop_name"]; });
		d3.select("#map-svg").call(stationTip);

		// draw the bike stops points on the map.
		d3.csv("../tourist_data/2013-08-tourist-data.csv", function(error, touristRatioData ){
			console.log(touristRatioData);
			bikeStationTouristRatioData = touristRatioData;

			svg.selectAll(".station")
			  .data(bikeStationTouristRatioData)
			  .enter().append("circle", ".station")
			  .attr("r", 7)
			  .attr("class", "station")
			  .attr("transform", function(d) {

			  	// console.log(d);

			  	if ( d.stop_id in bikeStationIdDict && "lat" in bikeStationIdDict[d.stop_id] ){

						return "translate(" + projection([
							bikeStationIdDict[d.stop_id]["lng"],
							bikeStationIdDict[d.stop_id]["lat"]
							
					    ]) + ")";			  		
			  	}

			})
			.attr("opacity", function(d){
				// console.log(parseInt(d.customer_ride_count)/parseInt(d.month_total_ride));
				return getOpacity(parseInt(d.customer_ride_count)/parseInt(d.month_total_ride));
				// return parseInt(d.customer_ride_count)/parseInt(d.month_total_ride);
			})
			.on("mouseover", function(d){
				stationTip.show(d);
			})
			.on("mouseout", function(d){
				stationTip.hide(d);
			});

		});


		initDateSlide();

		initTouristSpots();

	});





});


function initTouristSpots(){

	d3.json("../tourist_data/tourist-spot.json", function(data){

		// console.log(data);

		var starTip = d3.tip().attr('class', 'star-tip').
			html(function(d) {
				return d.name; 
			});

		d3.select("#map-svg").call(starTip);

		d3.select("#map-svg").selectAll(".tourist-spot")
			.data(data).enter()
		  .append("svg:polygon")
		  	.attr("class", "tourist-spot")
			.attr("visibility", "visible")
		  	.attr("points", function(d){

		  		var pointX = projection([
					d.lng,
					d.lat
			    ])[0];

		  		var pointY = projection([
					d.lng,
					d.lat
			    ])[1];

		  		return CalculateStarPoints(pointX, pointY, 5, 10, 5);
		  	})
		  	.on('mouseover', function(d){
		  		starTip.show(d);
		  	})
			.on('mouseout', function(d){
				starTip.hide(d)
			});

		// set oncheck listener for the check box
		$("#hide-tourist-checkbox").change(function(){

		    var c = this.checked ? true : false;

		    if (c) {

		    	d3.select("#map-svg").selectAll(".tourist-spot").style("visibility", "hidden");

		    }else{

		    	d3.select("#map-svg").selectAll(".tourist-spot").style("visibility", "visible");
		    
		    }
		});

		

		$("#ratio-or-count-checkbox").change(function(){

			// if checked, than show abs
		    var c = this.checked ? true : false;

		    if (c) {

		    	setStationColor("abs");

		    }else{

		    	// d3.select("#map-svg").selectAll(".tourist-spot").style("visibility", "visible");
		    	setStationColor("ratio");
		    
		    }
		});





	});




}

function CalculateStarPoints(centerX, centerY, arms, outerRadius, innerRadius)
{
   var results = "";

   var angle = Math.PI / arms;

   for (var i = 0; i < 2 * arms; i++)
   {
      // Use outer or inner radius depending on what iteration we are in.
      var r = (i & 1) == 0 ? outerRadius : innerRadius;
      
      var currX = centerX + Math.cos(i * angle) * r;
      var currY = centerY + Math.sin(i * angle) * r;

      // Our first time we simply append the coordinates, subsequet times
      // we append a ", " to distinguish each coordinate pair.
      if (i == 0)
      {
         results = currX + "," + currY;
      }
      else
      {
         results += ", " + currX + "," + currY;
      }
   }

   return results;
}


function initDateSlide(){
	// Create a new date from a string, return as a timestamp.

	var dateSlider = document.getElementById('time-slide');

	noUiSlider.create(dateSlider, {
	// Create two timestamps to define a range.
	    range: {
	        min: timestamp('2013/8'),
	        max: timestamp('2015/8')
	    },

	// Steps of one week
	    step: 26,

	// Two more timestamps indicate the handle starting positions.
	    start: timestamp('2013/8')

	});

	dateSlider.noUiSlider.on('slide', function( values, handle ) {
		updateMapWith(values[0])
;	});


}


function timestamp(str){
    return new Date(str).getTime();   
}

// Create a string representation of the date.
function formatDate ( date ) {

	// console.log(typeof date);
	var _date = new Date(parseInt(date));
	// console.log(_date);
	// console.log(_date.getMonth()+1);
	// console.log(_date.getFullYear());

    var month = _date.getMonth() + 1;
    var year = _date.getFullYear();


}

function updateMapWith(date){

	var _date = new Date(parseInt(date));
    var month = _date.getMonth() + 1;
    var year = _date.getFullYear();

    if (currentDisplayMonth == month && currentDisplayYear == year) {
    	return;
    }else{

		var monthStr = (month >= 10)?month.toString():"0"+month.toString();

	    d3.csv("../tourist_data/" + year.toString() + "-" + monthStr + "-tourist-data.csv", function(error, _touristRatioData ){
			// console.log(_touristRatioData);
			bikeStationTouristRatioData = _touristRatioData;

			d3.select("#map-svg").selectAll(".station").remove();		

			var bikeStops = d3.select("#map-svg").selectAll(".station")
			  .data(bikeStationTouristRatioData);
			
			bikeStops.enter()
			 .append("circle", ".station")
			  .attr("r", 7)
			  .attr("class", "station")
			  .attr("transform", function(d) {
				  	if ( d.stop_id in bikeStationIdDict && "lat" in bikeStationIdDict[d.stop_id] ){
						return "translate(" + projection([
							bikeStationIdDict[d.stop_id]["lng"],
							bikeStationIdDict[d.stop_id]["lat"]
						]) + ")";			  		 	
					}
				})
				.attr("opacity", function(d){
					// console.log(parseInt(d.customer_ride_count)/parseInt(d.month_total_ride));

					if ($("#ratio-or-count-checkbox").prop("checked")) {
						return getOpacity(parseInt(d.customer_ride_count)/2500);	
					}else{
						return getOpacity(parseInt(d.customer_ride_count)/parseInt(d.month_total_ride));
					}
					
					// return parseInt(d.customer_ride_count)/parseInt(d.month_total_ride);

				})
				.style("fill", function(d){
					// depends on the check box
					if ($("#ratio-or-count-checkbox").prop("checked")) {
						// green
						return "#40C38E";
					}else{
						return "#DB6968";
					}
				});

			bikeStops.attr("opacity", function(d){
				// console.log(parseInt(d.customer_ride_count)/parseInt(d.month_total_ride));
				return parseInt(d.customer_ride_count)/parseInt(d.month_total_ride)
			});

			bikeStops.exit().remove();

		});
	
		currentDisplayYear = year;
		currentDisplayMonth = month;

		setCurrentDisplayMonth(currentDisplayMonth);
		setCurrentDisplayYear(year);

	}

}



function getOpacity(value){
	if (value < 0.25) {
		return 0.3
	};
	if (value < 0.4) {
		return 0.5
	};
	if (value >= 0.4){
		return 0.9;
	}

}

function getMonthWithRightNumber(monthNumber){
	// 1 stands for January
	var monthsArray = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];

	return monthsArray[monthNumber - 1];

}

function setCurrentDisplayMonth(month){

	$("#month").text(getMonthWithRightNumber(month));

}

function setCurrentDisplayYear(year){

	$("#year").text(year.toString());

}

function setStationColor(ratioOrAbsValue){

	// green  
	var green = "#40C38E";

	if (ratioOrAbsValue == "abs") {
		
		d3.select("#map-svg").selectAll(".station").style("fill", green).attr("opacity", function(d){
			return getOpacity(parseInt(d.customer_ride_count)/2500);
		});

	}else{
		
		d3.select("#map-svg").selectAll(".station").style("fill", "#DB6968").attr("opacity", function(d){
			return getOpacity(parseInt(d.customer_ride_count)/parseInt(d.month_total_ride));
		});
	}

	
}
