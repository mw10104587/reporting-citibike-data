

bikeStationIdDict;

$(document).ready(function(){



  var width = 960,
  height = 860;

  // d3.select("#gender-map").attr("width", 960).attr("height", 860);

  // bikeStationIdDict[d["key"]]["lat"]

  var genderMap = d3.select("#gender-map");

  genderMap.attr("width", width)
     .attr("height", height);


  // the map that shows the six station who have the portion of female larger than 40%.
  var thirdMap = d3.select("#third-map");

  thirdMap.attr("width", width)
          .attr("height", height);


  var fourthMap = d3.select("#fourth-map");

  fourthMap.attr("width", width)
    .attr("height", height);


  // gender map
  d3.json("../nyc_map/borough_topo.json", function(error, nyc) {
    if (error) return console.error(error);

    // (40.755775, -73.982620) center for Manhattan island

    var projection = d3.geo.mercator()
            .center([-73.975239, 40.731698])
            .scale(250000)
            .translate([(width) / 2, (height)/2]);

      var path = d3.geo.path()
      .projection(projection);

    /*svg.append("path")
        .datum( topojson.feature( nyc, nyc.objects.boroughs ))
        .attr("d", path);
    */

    genderMap.append("rect")
      .attr("id", "sea")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "rgba(43,43,43,1)");

    genderMap.selectAll(".borough")
        .data(topojson.feature(nyc, nyc.objects.boroughs).features)
      .enter().append("path")
        .attr("class", function(d) { 
          // console.log(d);
          return "gender-borough"; })
        .attr("d", path)
        .attr("fill", "rgba(51,51,51,1)");



    d3.json("../nyc-bike-routes-2015/nyc_bike_routes_2015.json", function(error, bikelane){

      var projection = d3.geo.mercator()
              .center([-73.975239, 40.731698])
              .scale(250000)
              .translate([(width) / 2, (height)/2]);

        var path = d3.geo.path()
        .projection(projection);

      console.log(topojson.feature(bikelane, bikelane.objects.nyc_bike_routes_2015 ).features);


      genderMap.selectAll(".bike-lane")
        .data(topojson.feature(bikelane, bikelane.objects.nyc_bike_routes_2015 ).features )
        // .data(bikelane.features)
      .enter().append("path")
        .attr("class","bike-lane")
        .attr("d", path)
        .attr("fill", "none")
        // .attr("stroke", "black");
        .attr("stroke", "rgba(255,255,255,0.4)");



        d3.json("gender_data/2015-09-station-gender-data.json", function(data){

      bikeStationIdDict = getBikeStationIdDict();

      genderMap.selectAll(".station")
        .data(d3.entries(data))
        .enter().append("circle", ".station")
        .attr("r", 3)
        .attr("class", "station")
        .attr("transform", function(d) {

          if ( d.key in bikeStationIdDict && "lat" in bikeStationIdDict[d.key] ){

            return "translate(" + projection([
              bikeStationIdDict[d.key]["lng"],
              bikeStationIdDict[d.key]["lat"]
              
              ]) + ")";           
          }

      })
      .on("mouseover", function(d){
        console.log(d.key + ": " + bikeStationIdDict[d.key]["address"]);
      })
      .attr("fill", "rgba(66,111,225,1)");

    });


    d3.json("../nyc-subway-station/subway_station.json", function(subwayStation){

      var projection = d3.geo.mercator()
              .center([-73.975239, 40.731698])
              .scale(250000)
              .translate([(width) / 2, (height)/2]);

      genderMap.selectAll("subway-station")
        .data(topojson.feature(subwayStation, subwayStation.objects.subway_station).features)
      .enter().append("circle")
      .attr("class", "subway-station")
      .attr("cx", function(d){
        return projection(d.geometry.coordinates)[0];
      })
      .attr("cy", function(d){
        return projection(d.geometry.coordinates)[1];
      })
      .attr("r", 4)
      .attr("fill", "rgba(121,238,149,1)");

      // .attr("fill", );


    });

    // draw the legend text on the map
    genderMap.append("circle")
      .attr("r", 8)
      .attr("fill", "rgba(66,111,225,1)")
      .attr("opacity", 1)
      .attr("transform", "translate(40,30)");

    genderMap.append("circle")
      .attr("r", 8)
      .attr("fill", "rgba(121,238,149,1)")
      .attr("opacity", 1)
      .attr("transform", "translate(40,65)");

    genderMap.append("text")
      .text("Citi Bike station")
      .style("fill", "white")
      .style("stroke-width", 0)
      // .style("stroke", "white")
      // .style("stroke-width", "0.5px")
      .attr("transform", "translate(" + 53 + "," + 36 + ")"); 

    genderMap.append("text")
      .text("subway station")
      .style("fill", "white")
      .style("stroke-width", 0)
      // .style("stroke", "white")
      // .style("stroke-width", "0.5px")
      .attr("transform", "translate(" + 53 + "," + 72 + ")"); 

    genderMap.append("rect")
      .attr("width", 1)
      .attr("height", 16)
      .style("fill", "white")
      .attr("opacity", 0.5)
      .attr("transform", "translate(40,92)");


    genderMap.append("text")
      .text("bike lane")
      .style("fill", "white")
      .style("stroke-width", 0)
      // .style("stroke", "white")
      // .style("stroke-width", "0.5px")
      .attr("transform", "translate(" + 53 + "," + 107 + ")"); 





  });



  }); // end of map



  // third map
  d3.json("../nyc_map/borough_topo.json", function(error, nyc) {
    if (error) return console.error(error);

    // (40.755775, -73.982620) center for Manhattan island

    var projection = d3.geo.mercator()
            .center([-73.975239, 40.719698]) //40.731698
            .scale(370000)
            .translate([(width) / 2, (height)/2]);

      var path = d3.geo.path()
      .projection(projection);

    /*svg.append("path")
        .datum( topojson.feature( nyc, nyc.objects.boroughs ))
        .attr("d", path);
    */

    thirdMap.append("rect")
      .attr("id", "sea")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "rgba(43,43,43,1)");

    thirdMap.selectAll(".borough")
        .data(topojson.feature(nyc, nyc.objects.boroughs).features)
      .enter().append("path")
        .attr("class", function(d) { 
          // console.log(d);
          return "gender-borough"; })
        .attr("d", path)
        .attr("fill", "rgba(51,51,51,1)");


    d3.json("gender_data/2015-09-station-gender-data.json", function(data){

      var sevenStationTip = d3.tip().attr('class', 'seven-station-tip').html(function(d) { 
        
        var male = parseInt(d.value.male);
        var female = parseInt(d.value.female);  

        var ratio = female/(male + female);
        console.log(d);
        console.log(d.key);
        var stationData = getBikeStationAddressWith(d.key);
        console.log(stationData);

        return "<div class='tip-station-name'>" + stationData["stop_name"] + "</div>"
          + "<div class='tip-female-ratio tip-data'>Ratio of Female Rides(%): " + (parseInt(ratio * 10000)/100).toString() + '%</div>'
          + '<div class="tip-female-rides tip-data">Female Rides(undock): ' + female.toString() + '</div>'
          + '<div class="tip-male-rides tip-data">Male Rides(undock): ' + male.toString() + '</div>';  
      
      });
      thirdMap.call(sevenStationTip);


      bikeStationIdDict = getBikeStationIdDict();

      thirdMap.selectAll(".station")
        .data(d3.entries(data))
        .enter().append("circle", ".station")
        .attr("r", function(d){
          // if the fraction is higher than 40%, we show it bigger

          return getFemaleRadius(parseInt(d.value.male), parseInt(d.value.female));


        })
        .attr("class", "station")
        .attr("transform", function(d) {

          if ( d.key in bikeStationIdDict && "lat" in bikeStationIdDict[d.key] ){

            return "translate(" + projection([
              bikeStationIdDict[d.key]["lng"],
              bikeStationIdDict[d.key]["lat"]
              
              ]) + ")";           
          }

      })
      .attr("fill", "rgba(219,100,86,1)")
      .attr("opacity", function(d){
        return getFemaleOpacity(parseInt(d.value.male), parseInt(d.value.female));
        // return parseInt(d.customer_ride_count)/parseInt(d.month_total_ride);
      })
      .on("mouseover", function(d){
        // stationTip.show(d);
        // console.log()
        var male = parseInt(d.value.male);
        var female = parseInt(d.value.female);  

        // if it's the 7 stations, we highlight it and show its tooltip
        if (female/(male + female) > 0.4) {
          console.log(d.key + ": " + bikeStationIdDict[d.key]["address"] + ": " + JSON.stringify(d.value) );
          d3.select(this).style("stroke-width", "2px").style("stroke", "white");

          sevenStationTip.show(d);

        };

      })
      .on("mouseout", function(d){
        d3.select(this).style("stroke-width", 0);
        sevenStationTip.hide();
      });

    });

    // draw the legend text on the map
    thirdMap.append("circle")
      .attr("r", 3)
      .attr("fill", "rgba(219,100,86,1)")
      .attr("opacity", 0.3)
      .attr("transform", "translate(40,30)");

    thirdMap.append("circle")
      .attr("r", 8)
      .attr("fill", "rgba(219,100,86,1)")
      .attr("opacity", 1)
      .attr("transform", "translate(40,65)");


    thirdMap.append("text")
      .text("Other Bike Stations")
      .style("fill", "white")
      .style("stroke-width", 0)
      // .style("stroke", "white")
      // .style("stroke-width", "0.5px")
      .attr("transform", "translate(" + 53 + "," + 34 + ")"); 


    thirdMap.append("text")
      .text("female rides fraction > 40%")
      .style("fill", "white")
      .style("stroke-width", 0)
      // .style("stroke", "white")
      // .style("stroke-width", "0.5px")
      .attr("transform", "translate(" + 53 + "," + 70 + ")"); 

    





  }); // end of load map 3

  
  // fourth map
  d3.json("../nyc_map/census_tract_with_data.json", function(error, nys) {
    if (error) return console.error(error);

    // (40.755775, -73.982620) center for Manhattan island
    console.log(nys);

    var projection = d3.geo.mercator()
            .center([-73.975239, 40.731698]) //40.731698
            .scale(250000)
            .translate([(width) / 2, (height)/2]);

      var path = d3.geo.path()
      .projection(projection);

    /*svg.append("path")
        .datum( topojson.feature( nyc, nyc.objects.boroughs ))
        .attr("d", path);
    */

    var incomeColor = d3.scale.linear()
    .domain([9000, 17000, 250001])
    .range(["#DB285E", "#E3D930", "#21C36A"]);

    var quantize = d3.scale.quantile().domain([9000, 250001]).range(d3.range(9));

    fourthMap.attr("class", "RdYlGn");

    fourthMap.append("rect")
      .attr("id", "sea")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "rgba(43,43,43,1)");
      // .attr("class", "Greys");

    fourthMap.selectAll(".borough")
        .data(topojson.feature(nys, nys.objects.census_tract).features)
      .enter().append("path")
        .attr("class", function(d) { 
          // console.log(d);
          // console.log(d.properties.income);
          return "gender-borough " + "q" + quantize(d.properties.income) + "-9" ; })
        .attr("d", path)
        .attr("stroke", "rgba(255,255,255,0.6)")
        .attr("stroke-width", "1px");
        // .attr("fill", function(d){
          // return incomeColor(d.income);
        // });
        // .attr("fill", "rgba(51,51,51,1)");

        d3.json("gender_data/2015-09-station-gender-data.json", function(data){

          bikeStationIdDict = getBikeStationIdDict();

          fourthMap.selectAll(".station")
            .data(d3.entries(data))
            .enter().append("circle", ".station")
            .attr("r", 3)
            .attr("class", "station")
            .attr("transform", function(d) {

              if ( d.key in bikeStationIdDict && "lat" in bikeStationIdDict[d.key] ){

                return "translate(" + projection([
                  bikeStationIdDict[d.key]["lng"],
                  bikeStationIdDict[d.key]["lat"]
                  
                  ]) + ")";           
              }

          })
          .attr("stroke-width", 2)
          .attr("stroke", "rgba(66,111,225,1)")
          .attr("fill", "transparent");
          // .attr("fill", "rgba(66,111,225,1)");

        });

    // draw legend for the map

    var legendX = 38, legendY = 50;
    var legendWidth = 20, legendHeight = 30;
    for (var i = 0; i < 9; i++) {

      fourthMap.append("rect")
        .attr("transform", function(d){
          return "translate(" +  legendX + "," + (legendY + legendHeight * i) + ")";
        })
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("class", function(){
          return "q" + (8-i) + "-9";
        });

    };
    
    // draw the legend text on the map
    fourthMap.append("text")
      .text(25001)
      .style("stroke", "white")
      .attr("transform", "translate(" + (legendX + 25) + "," + (legendY + 16) + ")");  

    fourthMap.append("text")
      .text(9000)
      .style("stroke", "white")
      .attr("transform", "translate(" + (legendX + 25) + "," + (legendY + 24 + 240) + ")");  


    fourthMap.append("text")
      .text("Median Household Income")
      .style("stroke", "white")
      .attr("transform", "translate(" + legendX  + "," + 45 + ")"); 



    // set oncheck listener for the check box
    $("#hide-stations-checkbox").change(function(){

        var c = this.checked ? true : false;

        if (c) {

          fourthMap.selectAll(".station").transition().duration(300).style("opacity", 0);

        }else{

          fourthMap.selectAll(".station").transition().duration(300).style("opacity", 1);
        
        }
    });








  });







}); // end of document ready

_data ={
        "3141": "1 Ave & E 68 St", 
        "3142": "1 Ave & E 62 St", 
        "3147": "E 85 St & 3 Ave", 
        "3150": "E 85 St & York Ave", 
        "3156": "E 72 St & York Ave", 
        "3159": "W 67 St & Broadway", 
        "3085": "Roebling St & N 4 St", 
        "3080": "S 4 St & Rodney St", 
        "3082": "Hope St & Union Ave", 
        "3140": "1 Ave & E 78 St", 
        "3144": "E 81 St & Park Ave", 
        "3145": "E 84 St & Park Ave", 
        "3146": "E 81 St & 3 Ave", 
        "3148": "E 84 St & 1 Ave", 
        "3149": "E 82 St & 2 Ave", 
        "3232": "Bond St & Fulton St", 
        "3230": "Penn Station Valet", 
        "3231": "E 67 St & Park Ave", 
        "3178": "Riverside Dr & W 78 St", 
        "3170": "W 84 St & Columbus Ave", 
        "3135": "E 75 St & 3 Ave", 
        "3134": "3 Ave & E 62 St", 
        "3226": "W 82 St & Central Park West", 
        "3221": "47 Ave & 31 St", 
        "3137": "5 Ave & E 73 St", 
        "3132": "E 59 St & Madison Ave", 
        "3139": "E 72 St & Park Ave", 
        "3169": "Riverside Dr & W 82 St", 
        "3166": "Riverside Dr & W 72 St ", 
        "3167": "Amsterdam Ave & W 73 St", 
        "3172": "W 74 St & Columbus Ave", 
        "3163": "Central Park West & W 68 St", 
        "3160": "Central Park West & W 76 St", 
        "3177": "W 84 St & Broadway", 
        "3176": "W 64 St & West End Ave", 
        "3136": "5 Ave & E 63 St", 
        "3175": "W 70 St & Amsterdam Ave"
    }

    _data2 = {
        "3092": "Berry St & N 8 St", 
        "3093": "N 6 St & Bedford Ave", 
        "3090": "N 8 St & Driggs Ave", 
        "3091": "Frost St & Meeker St", 
        "3097": "N Henry St & Richardson St", 
        "3067": "Broadway & Whipple St", 
        "3066": "Tompkins Ave & Hopkins St", 
        "3063": "Nostrand Ave & Myrtle Ave", 
        "3062": "Myrtle Ave & Marcy Ave", 
        "3061": "Throop Ave & Myrtle Ave", 
        "3060": "Willoughby Ave & Tompkins Ave", 
        "3065": "Union Ave & Wallabout St", 
        "3064": "Myrtle Ave & Lewis Ave", 
        "3069": "Lorimer St & Broadway", 
        "3068": "Humboldt St & Varet St", 
        "3119": "Vernon Blvd & 50 Ave", 
        "3118": "McGuinness Blvd & Eagle St", 
        "3117": "Franklin St & Dupont St", 
        "3115": "India St & Manhattan Ave", 
        "3114": "India St & East River", 
        "3113": "Greenpoint Ave & Manhattan Ave", 
        "3112": "Milton St & Franklin St", 
        "3111": "Norman Ave & Leonard St", 
        "3110": "Meserole Ave & Manhattan Ave", 
        // "3158": "W 63 St & Broadway", 
        "3016": "Mobile 01", 
        "3014": "E.T. Bike-In Movie Valet Station ", 
        "3088": "Union Ave & Jackson St", 
        "3084": "Devoe St & Leonard St", 
        "3087": "Metropolitan Ave & Meeker Ave", 
        "3086": "Graham Ave & Conselyea St", 
        "3081": "Graham Ave & Grand St", 
        "3083": "Bushwick Ave & Powers St", 
        "3058": "Lewis Ave & Kosciuszko St", 
        "3059": "Pulaski St & Marcus Garvey Blvd", 
        "3056": "Kosciuszko St & Nostrand Ave", 
        "3057": "Kosciuszko St & Tompkins Ave", 
        "3054": "Greene Ave & Throop Ave", 
        "3055": "Greene Ave & Nostrand Ave", 
        "3052": "Lewis Ave & Madison St", 
        "3053": "Marcy Ave & Lafayette Ave", 
        "3179": "Park Ave & Marcus Garvey Blvd", 
        "3076": "Scholes St & Manhattan Ave", 
        "3077": "Stagg St & Union Ave", 
        "3128": "21 St & 43 Ave", 
        "3129": "Queens Plaza North & Crescent St", 
        "3123": "31 St & Thomson Ave", 
        "3120": "Center Blvd\u00a0& Borden Ave", 
        "3121": "Jackson Ave & 46 Rd", 
        "3126": "44 Dr & Jackson Ave", 
        "3127": "9 St & 44 Rd", 
        "3124": "46 Ave & 5 St", 
        "3125": "45 Rd & 11 St", 
        // "540": "Lexington Ave & E 29 St", 
        // "319": "Fulton St & Broadway", 
        "384": "Fulton St & Washington Ave", 
        "3181": "Soissons Landing", 
        "3182": "Yankee Ferry Terminal", 
        "3094": "Graham Ave & Withers St", 
        "3095": "Graham Ave & Herbert St", 
        "3098": "Leonard St & Bayard St", 
        // "3224": "W 13 St & Hudson St", 
        // "3223": "E 55 St & 3 Ave", 
        "3222": "Hanson Pl & St Felix St", 
        "3130": "21 St & Queens Plaza North", 
        "3133": "E 67 St & Park Ave", 
        "3101": "N 12 St & Bedford Ave", 
        "3049": "Cambridge Pl & Gates Ave", 
        "3048": "Putnam Ave & Nostrand Ave", 
        "3041": "Kingston Ave & Herkimer St", 
        "3043": "Lewis Ave & Decatur St", 
        "3042": "Fulton St & Utica Ave", 
        "3044": "Albany Ave & Fulton St", 
        "3047": "Halsey St & Tompkins Ave", 
        "3046": "Marcus Garvey Blvd & Macon St", 
        // "3164": "Columbus Ave & W 72 St", 
        // "3165": "Central Park West & W 72 St", 
        "3050": "Putnam Ave & Throop Ave", 
        "3070": "McKibbin St & Manhattan Ave", 
        "3071": "Boerum St & Broadway", 
        "3072": "Leonard St & Boerum St", 
        "3073": "Division Ave & Hooper St", 
        "3074": "Montrose Ave & Bushwick Ave", 
        "3075": "Division Ave & Marcy Ave", 
        "3079": "Leonard St & Grand St", 
        "3108": "Nassau Ave & Russell St", 
        "3109": "Banker St & Meserole Ave", 
        "3104": "Kent Ave & N 7 St", 
        "3105": "N 15 St & Wythe Ave", 
        "3106": "Driggs Ave & N Henry St", 
        "3107": "Bedford Ave & Nassau Ave", 
        "3102": "Driggs Ave & Lorimer St", 
        "3103": "N 11 St & Wythe Ave"
    }








function getFemaleOpacity(male, female){

  var ratio = female/(male + female);
  
  if (ratio > 0.4) {return 1;}
    else if(ratio > 0.25) {return 0.3;}
      else if(ratio > 0.2) {return 0.3;}
        else {return ratio;}


}


function getFemaleRadius(male, female){

    var ratio = female/(male + female);
  
    if (ratio > 0.4) return 8;
      else return 3;  

}

