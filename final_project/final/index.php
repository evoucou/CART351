<!DOCTYPE html>
<html>


<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
  integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
  crossorigin=""/>

  <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
  integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
  crossorigin=""></script>

  <!-- Load Esri Leaflet from CDN -->
  <script src="https://unpkg.com/esri-leaflet"></script>

  <!-- Esri Leaflet Geocoder -->
  <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css">
  <script src="https://unpkg.com/esri-leaflet-geocoder"></script>


  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="jscolor.js"></script>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<!-- <link rel="stylesheet" href="https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.0.0-beta.7/css/calcite-web.min.css"> -->

<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

<!-- this demo plugin bundles the needed code from Esri Leaflet and Esri Leaflet Geocoder -->
<script src="bootstrap-geocoder.js"></script>

  <!-- <script type="text/javascript" src="map.js"></script> -->
  <link rel="stylesheet" href="main.css"/>

</head>

  <body>
    <div id="header">
         <input class="get-markers" type="button" value="Get all the Markers" />
    <!--  <object data="sources/pin.svg" type="image/svg+xml"
               id="pinsvg" width="20p"></object> -->
    <img src="sources/plus.svg" id="newrequest" onclick="toggleNewReqMenu()"/>
    <img src="sources/logo.svg" id="logo"/><br>
  <input type="text" placeholder="Search for places or addresses" id="searchAdress">
  </div>
  <p id="noPinDetected">No pin has been detected.<br>
  You first need to create a new pin and choose its location.</p>
  <button id="finduser" onclick="relocate()">locate</button>
        <button id="newPin" onclick="addNewPin()">new</button>

        <form action=”insertForm.php” method=”post” enctype =”multipart/form-data”>
          <fieldset>
      <div id="newReqMenu"><div id="newReqTextBox">
        <h2>CREATE A REQUEST</h2>
        <input type="text" placeholder="Type in your request..." id="titleBox" maxlength = "40" name = "a_title" required>
        <!--<input type="color" id="colorPicker">-->
      <br><button class="jscolor {width: 280, height: 260, position:'center' , onFineChange:'update(this)', valueElement:null, closable:true}" id="colorPicker">
        Choose your pin's color
</button>
</fieldset>
</form>

<button id="submitButton" onclick="submitForm()">Submit</button></div></div>
  <div id="map"></div>

  <?php
  echo "Hello World!";
  ?>

<script>
var state = 0;
var map = L.map('map').locate({setView: true, maxZoom: 16});
var s = document.getElementById("newReqMenu");
var a = document.getElementById("noPinDetected");
var y = document.getElementById("finduser");
var title = document.getElementById("titleBox").value;
a.style.display="none";
s.style.display="none";
y.style.display="none";
var recenter = false;
var current_location;
var markerBon;
var allMarker = [];
var allLayer  = [];
var oldmarker;
var counter = 0;
var formSubmitted = false;
var markerColor;

// We determine a random beginning color for the pin before the submit menu is called
// var possibleColors = ["red","blue","purple","orange","green"];
// var beginningColor = possibleColors[Math.floor(Math.random()*possibleColors.length)];
// console.log(beginningColor);

var icon = "<svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 30 51' style='enable-background:new 0 0 30 51;' xml:space='preserve'> <path fill='"+markerColor+"' d='M15,0.8C6.9,0.8,0.3,7.4,0.3,15.5c0,7.4,5.5,13.4,12.6,14.5v21h4.2V29.9c7.1-1,12.6-7.1,12.6-14.5 C29.7,7.4,23.1,0.8,15,0.8z M10.8,13.4c-2.3,0-4.2-1.9-4.2-4.2C6.6,6.9,8.5,5,10.8,5S15,6.9,15,9.2S13.1,13.4,10.8,13.4z'/><path fill = 'white' d='M15,9.2c0,2.3-1.9,4.2-4.2,4.2s-4.2-1.9-4.2-4.2C6.6,6.9,8.5,5,10.8,5S15,6.9,15,9.2z'/></svg>";
var svgURL = "data:image/svg+xml;base64," + btoa(icon);


var markerIcon = L.icon({
    iconUrl: svgURL,
    shadowUrl: 'sources/shadow.png',
    iconSize:     [19, 40], // size of the icon
    shadowSize:   [30, 30], // size of the shadow
    iconAnchor:   [12, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 23],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var tempMarker = new L.marker;


 //document.getElementById("newPin").addEventListener("click", AddNewPin())
//map.on('locationfound', onLocationFound);
//map.locate({setView: true, maxZoom: 16});
//map.addControl(searchControl);
//Initially we locate the user's position to load the map around
/*Longitude of Montreal: -73.567256
Latitude of Montreal: 45.5016889*/
/*
var a = document.getElementById("pinsvg");
 // It's important to add an load event listener to the object,
 // as it will load the svg doc asynchronously
 a.addEventListener("load",function(){
   console.log("loaded");
     // get the inner DOM of alpha.svg
     var svgDoc = a.contentDocument;
     // get the inner element by id
     var delta = svgDoc.getElementById("delta");
     // add behaviour
     delta.addEventListener("mousedown",function(){
             alert('hello world!')
     }, false);
 }, false);*/
var search = BootstrapGeocoder.search({
  inputTag: 'searchAdress',
}).addTo(map);
// placeholders for the L.marker and L.circle representing user's current position and accuracy
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZXZvdWNvdSIsImEiOiJjam83ZnJrb3UwZWI2M3FvOW0zNzIwZXRnIn0.2HBTS6fDGxp1pjp54zflnw'
}).addTo(map);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function centerOnMarker(map, tempMarker) {
  var latLngs = [ tempMarker.getLatLng() ];
  var markerBounds = L.latLngBounds(latLngs);
  map.fitBounds(markerBounds);
}
// CODE TO TRY FOR REMOVING MARKER BEFORE A NEW ONE
// leafletData.getMap().then(function (map) {
// map.eachLayer(function(layer) {
//   // Remove all layers except the background (tilelayer)
//   // EDIT: and the main marker with the custom property
//   if (!(layer instanceof L.TileLayer) && layer.options.myCustomProperty != 'myMainMarker')) {
//     map.removeLayer(layer);
//   }
// });
function getRandomColor() {
var letters = '0123456789ABCDEF';
var color = '#';
for (var i = 0; i < 6; i++) {
color += letters[Math.floor(Math.random() * 16)];
}
return color;
}


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function toggleNewReqMenu() {
  if (state != 0) {
    state = 2;
      map.off('click',function(e){Dragpin(e,tempMarker);});

    centerOnMarker(map,tempMarker);

  //document.getElementById("st0Id").style.fill = "rgb(255,30,0)";
  //console.log(st0Id);

if (s.style.display === "none") {
    s.style.display = "block";
    //Initial values
      //map.locate({setView: true});
    document.getElementById('titleBox').value = '';
    document.getElementById('colorPicker').style.backgroundColor = markerColor;
//CODE FOR COLOR
    //document.getElementById('test').path.style.fill = randomStartColor;
} else {
    s.style.display = "none";
    state = 1;
}
} else {
      a.style.display = "block";
}
}
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function update(jscolor) {
    // Marker has color that user choses
    markerColor = '#' + jscolor;
}


 function addNewPin() {
         state = 1;
         //If there was one, the error message disappears.
         a.style.display = "none";
        map.on('click',createPin);
// Create a new random color for each new pin
          markerColor = getRandomColor();
    }
function createPin(ev) {

   y.style.display="block";
        latlng = map.mouseEventToLatLng(ev.originalEvent);
        //console.log(latlng.lat + ', ' + latlng.lng);
// if (!formSubmitted){
//         map.removeLayer(marker);
//         formSubmitted = false;
//       }
  map.removeLayer(tempMarker);
            //(latlng, {icon: markerIcon})
            tempMarker = L.marker(latlng, {icon: markerIcon}).addTo(map);
            map.off('click',createPin);
            map.on('click',function(e){Dragpin(e,tempMarker);});
            }
function Dragpin(e,tempMarker) {
        if(state==1)
            {
        var latlng = map.mouseEventToLatLng(e.originalEvent);
          tempMarker._icon.style.transition = "transform 0.3s ease-out";
          tempMarker._shadow.style.transition = "transform 0.3s ease-out";
      	tempMarker.setLatLng(latlng);
      }

            }
    function onPopupOpen() {
  tempMarker.openPopup();
    }




    function submitForm() {

console.log('markerColor : '+markerColor);

      state = 0;
      y.style.display="none";

      var marker = tempMarker;
// if tempMarker becomes marker, then GEOJSON counts it. But if it stays tempMarker, then GeoJSON
// does not count it, but marker stays the same...

      var geojsonFeature = {
      "type": "Feature",
          "properties": {},
          "geometry": {
              "type": "Point",
              "coordinates": [latlng.lat, latlng.lng]
      }
  }
  L.geoJson(geojsonFeature, {
      pointToLayer: function(feature, latlng){
      marker = L.marker(latlng, {
              title: "Resource Location",
              alt: "Resource Location",
              draggable: false,
          });
          //tempMarker.on("popupopen", onPopupOpen);
          return marker;
      }
  }).addTo(map);



    //var name;
    s.style.display="none";
    console.log(title);

    }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function onLocationError(e) {
    alert(e.message);
}
//map.on('locationerror', onLocationError);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function onLocationFound(e, current_location) {
        current_location = L.latLng(e.latlng);
        return current_location;
               //markerBon = myMarker;
    //var circle = document.getElementById("newrequest").addEventListener("click", function(){
          //centerOnMarker(map, myMarker);
    //});
  }
function relocate() {
    //instantiatePin(marker);
    //console.log(myMarker.latlng);
    map.locate({setView: true})
    map.on('locationfound', function(ev){
            tempMarker.setLatLng(ev.latlng);
    })
}

function getAllMarkers() {
    var allMarkersObjArray = [];//new Array();
    var allMarkersGeoJsonArray = [];//new Array();
    $.each(map._layers, function (ml) {
        //console.log(map._layers)
        if (map._layers[ml].feature) {
            allMarkersObjArray.push(this)
                                    allMarkersGeoJsonArray.push(JSON.stringify(this.toGeoJSON()))
        }
    })
    console.log(allMarkersObjArray);
    alert("total Markers : " + allMarkersGeoJsonArray.length + "\n\n" + allMarkersGeoJsonArray + "\n\n Also see your console for object view of this array" );
}
$(".get-markers").on("click", getAllMarkers);
</script>
  </body>
  </html>
