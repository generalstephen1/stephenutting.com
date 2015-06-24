/*
	A SCRIPT THAT CONTROLS THE MAP ELEMENTS OF TWEETIEBYTE
*/

var doMapSetup = function(geoData){
	//console.log("maps.js || doMapSetup", geoData)
	// Create an array of styles.
  	var mapStyles = {
	  	original: [
		  {
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [
		      { "visibility": "simplified" },
		      { "color": "#ffffff" }
		    ]
		  },{
		    "featureType": "landscape.natural",
		    "elementType": "geometry.fill",
		    "stylers": [
		      { "visibility": "on" },
		      { "color": "#a9dddf" }
		    ]
		  }
		],
		valentine: [
		  {
		    "featureType": "administrative",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "landscape",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "poi",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "road",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "transit",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "landscape.natural.landcover",
		    "elementType": "geometry.fill",
		    "stylers": [
		      { "color": "#ffb0e7" },
		      { "visibility": "on" }
		    ]
		  },{
		    "featureType": "water",
		    "stylers": [
		      { "visibility": "on" },
		      { "color": "#ffffff" }
		    ]
		  },{
		    "featureType": "landscape.natural.terrain",
		    "stylers": [
		      { "visibility": "on" },
		      { "color": "#ffb0e7" }
		    ]
		  },{
		  }
		]}
		
	var markersArray = new Array();
	var circlesArray = new Array();
	var locations = {};
	
	
	var masterOptions = {
		map: {
			zoom: 0,
		    maxZoom: 3,
		    center: new google.maps.LatLng(19.418199, 4.957697),
		    disableDoubleClickZoom: true,
		    disableDefaultUI: true,
		    mapTypeControl: false,
			scrollwheel: false,
		    scaleControl: false,
		    panControl: false,
		    zoomControl: false,
		    draggable: false
		},
		infoBox: {
			content: "",
			disableAutoPan: false,
			maxWidth: 0,
			zIndex: null,
	 		pixelOffset: new google.maps.Size(3, 3),
			closeBoxMargin: "",
			closeBoxURL: "",
			infoBoxClearance: new google.maps.Size(1, 1),
			isHidden: false,
			pane: "floatPane",
			enableEventPropagation: false
		},
		cluster: {
			gridSize: 20,  
			maxZoom: 3,
			averageCenter: true,
			zoomOnClick: false,
			minimumClusterSize: 1,
			styles: [
				{
					fontWeight: 'normal',
					fontFamily: 'defaultFont',
					textColor: '#ffffff',
				    url: 'img/'+App.config.themeType+'/'+App.config.themeType+'Sprites_geoMapIcon.svg',
				    height: 40,
				    width: 40				
				}
			]
		}
		
	}

	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(mapStyles[App.config.themeType], {name: "Styled Map"});  
	var map = new google.maps.Map(document.getElementById('map'), masterOptions.map);
	
	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
	
	setupMarkers();
	
	var markerClusterer = new MarkerClusterer(map, markersArray, masterOptions.cluster);
	
	
	
	/*
	 *	For each geolocation within the geo object create an invisible marker
	*/
	function setupMarkers(){
	//console.log("maps.js || setupMarkers");
		for (var prop in geoData) {
			var iconTitle = prop;
		    var coordinate =  new google.maps.LatLng(geoData[prop].coord[0], geoData[prop].coord[1]);
			
			var newMarker = new google.maps.Marker({
			 	map: map,
			 	draggable: false,
			 	position: new google.maps.LatLng(
					geoData[prop].coord[0], 
					geoData[prop].coord[1]
				),
			 	visible: false
			});
			
		    markersArray.push(newMarker);
		}
	}
	
	
	function reverseGeocode(){	
		//console.log("maps.js |||||||| reverseGeocode for "+markerClusterer.clusters_.length+" markers |||||||||")	
		
		for (var i = 0; i < markerClusterer.clusters_.length; i++){	
			
			
			/*
			 * the geocode function	
			*/
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
					'latLng': markerClusterer.clusters_[i].center_
				}, geoFunc);
		
			//console.log(" ");
			//console.log("maps.js || reverseGeocode || cluster #"+i);

		}
		
		
	}
	
	function geoFunc(results, status){
			    
			    if (status == google.maps.GeocoderStatus.OK) {
			    				    
			      if (results[0]) {
				  	//console.log(" ");
				  	//console.log("maps.js || geoFunc || new marker for "+results.length+" locations");
				  	//console.log("maps.js || geoFunc || obj ",results);
			        var marker = new google.maps.Marker({
			            position: new google.maps.LatLng(results[0].geometry.location.k, results[0].geometry.location.B),
			            map: map,
			            visible: false,
			            draggable: false			            
			        });
			        
			        var boxText = document.createElement("div");
						boxText.setAttribute('class', "geoModule-infoBox curveEdges");
						//var populated = false;
						
						
						
						/*
						 * get the average center name for icon	
						*/
						for(var j = 0; j < results[1].address_components.length; j++){
						
							var curResult = results[1].address_components[j]
							
							if(curResult.types[0] == "administrative_area_level_1"){
								boxText.innerHTML = curResult.long_name;
								//console.log("maps.js || geoFunc || results[1].address_components["+j+"].long_name is administrative_area || "+curResult.long_name);
								break;
							} else if (curResult.types[0] == "country"){
								boxText.innerHTML = curResult.long_name;
								//console.log("maps.js || geoFunc || results[1].address_components["+j+"].long_name is country || "+curResult.long_name);
								break;
							} else if (curResult.types[0] == "sublocality_level_1"){
								boxText.innerHTML = curResult.long_name;
								//console.log("maps.js || geoFunc || results[1].address_components["+j+"].long_name is sublocality || "+curResult.long_name);
								break;
							} else {
								boxText.innerHTML = curResult.long_name;
								//console.log("maps.js || geoFunc || results[1].address_components["+j+"].long_name is something else || "+curResult.long_name);
							}
						}
						  						  
					masterOptions.infoBox.content = boxText;
			        
			        var ib = new InfoBox(masterOptions.infoBox);
			         	//ib.open(map, marker);
			         	//console.log("maps.js || geoFunc || opening infobox for marker: "+boxText.innerHTML)
			      } else {
			       /// alert('No results found');
			      }
			    } else {
			      //alert('Geocoder failed due to: ' + status);
			    }
		   }
	
	setTimeout(reverseGeocode , 1000)
	markerClusterer.fitMapToMarkers();
}


