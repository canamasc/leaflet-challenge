// Creating the map object
var myMap = L.map("map", {
    center: [40, -50],
    zoom: 2.45
  });
  
  // Adding the tile layer
  var tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Use this link to get the GeoJSON data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Getting our GeoJSON data
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  console.log(data.features);

  function chooseColor(depth){
    switch(true){
      case depth > 80:
        return "#993300";
      case depth > 60:
        return "#ff3300";
      case depth > 40:
        return "#ff6600";
      case depth > 20:
        return "#ff6666";
      case depth > 10:
        return "#ff9999";
      default:
        return "#ffcccc";

    }
  }

  function chooseRadius(m){
    if (m == 0){
      var mag = 1;
      return mag;
    }
    var mag = m * 3.5;
    return mag;
  }

  function fillStyle(f){
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: chooseColor(f.geometry.coordinates[2]),
      color: "#000000",
      radius: chooseRadius(f.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  for (var i=0; i < data.features.length; i++){
  L.geoJson(data, {
    pointToLayer: function(features, coords){
      return L.circleMarker(coords);
    },

    style: fillStyle(data.features[i]) ,

    onEachFeature: function(features, l){
      l.bindPopup("Located at: " + features.properties.place + "<br>Magnitude: " + features.properties.mag + "<br>Alert: " + features.properties.alert);
    }
  }).addTo(myMap);
  }

});

  // var heatarray = [];
  // for (var i =0; i < data.length; i++){
  //     var loc = data.features[i].geometry.coordinates;
  //     var depth = loc[2];
      
  //     heatarray.push([loc[1], loc[0]]);


  // }
  // var heat = L.heatLayer(heatarray, {
  //   radius: 500,
  //   blur: 35
  // }).addTo(myMap);

  // console.log(data.features[0].geometry.coordinates[2]);