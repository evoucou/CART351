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

<!-- JS file -->
<script src="jquery.easy-autocomplete.min.js"></script>

<!-- CSS file -->
<link rel="stylesheet" href="easy-autocomplete.min.css">

<!-- Additional CSS Themes file - not required-->
<link rel="stylesheet" href="easy-autocomplete.themes.min.css">

  <!-- <script type="text/javascript" src="map.js"></script> -->
  <link rel="stylesheet" href="main.css"/>

</head>

  <body>
    <div id="header">
    <img src="sources/plus.svg" id="newrequest" onclick="toggleNewReqMenu()"/>
    <img src="sources/logo.svg" id="logo"/><br>
  <input type="text" placeholder="Search for places or addresses" onfocus="Search for places or addresses" id="searchAdress">
  </div>
  <div id="errorMsg"></div>
  <button id="newPin" onclick="addNewPin()"><img src="sources/addPin.svg"/></button>
        <button id="finduser" onclick="relocate()"><img src="sources/userLoc.svg"/></button>

        <div id="newReqMenuContainer"><form id="reqForm">
            <div id="newReqTextBox">
          <h2>CREATE A REQUEST</h2>
          <input type="text" placeholder="Type in your request..." onfocus="this.style.color='black';" id="titleBox" maxlength = "40" name = "a_title" required>
          <input type="text" placeholder="What's your name?" onfocus="this.style.color='black';" id="nameBox" maxlength = "40" name = "a_username" required>
        <button class="jscolor {width: 280, height: 260, position:'center' , onFineChange:'update(this)', valueElement:null, closable:true}" id="colorPicker">
          Choose your pin's color</button>
  <button type="submit" name = "submit">Submit</button><br><br>
</div></form>
  </div>

  <div id="map"></div>
<script>

var state = 0;
var map = L.map('map').locate({setView: true, maxZoom: 16});
var s = document.getElementById("newReqMenuContainer");
var a = document.getElementById("errorMsg");
var y = document.getElementById("finduser");

//a.style.display="none";
a.innerHTML = "";
s.style.display="none";
y.style.opacity="0.3";
var recenter = false;
var allMarker = [];
var allLayer  = [];
var counter = 0;
var formSubmitted = false;
var layerGroup = new L.layerGroup().addTo(map);
var markerColor;
var permanentMarker = new L.marker;
var tempMarker = new L.marker;

function update(jscolor) {
    // Marker has color that user choses
    markerColor = '#' + jscolor;
    console.log('markerColor in update : '+markerColor);
    //setIcon();
    map.removeLayer(tempMarker);
    createSVG(markerColor);
}


var search = BootstrapGeocoder.search({
  inputTag: 'searchAdress',
}).addTo(map);
// placeholders for the L.marker and L.circle representing user's current position and accuracy
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZXZvdWNvdSIsImEiOiJjam83ZnJrb3UwZWI2M3FvOW0zNzIwZXRnIn0.2HBTS6fDGxp1pjp54zflnw'
}).addTo(map);

function centerOnMarker(map, tempMarker) {
  var latLngs = [ tempMarker.getLatLng() ];
  var markerBounds = L.latLngBounds(latLngs);
  map.fitBounds(markerBounds);
}

function getRandomColor() {
var letters = '0123456789ABCDEF';
var color = '#';
for (var i = 0; i < 6; i++) {
color += letters[Math.floor(Math.random() * 16)];
}
return color;
}

loadData();

function toggleNewReqMenu() {
  if (state != 0) {
    a.innerHTML = "";
    state = 2;
      map.off('click',function(e){Dragpin(e,tempMarker);});

    centerOnMarker(map,tempMarker);

if (s.style.display === "none") {
    s.style.display = "block";

    document.getElementById('titleBox').value = '';
    document.getElementById('nameBox').value = '';
    document.getElementById('colorPicker').style.backgroundColor = markerColor;

} else {
    s.style.display = "none";
    state = 1;
}
} else {
  a.innerHTML = "No pin has been detected. You first need to create a pin and choose its location on the map.";
}
}

function createSVG(markerColor) {

  var icon = "<svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 30 51' style='enable-background:new 0 0 30 51;' xml:space='preserve'> <path fill='"+markerColor+"' d='M15,0.8C6.9,0.8,0.3,7.4,0.3,15.5c0,7.4,5.5,13.4,12.6,14.5v21h4.2V29.9c7.1-1,12.6-7.1,12.6-14.5 C29.7,7.4,23.1,0.8,15,0.8z M10.8,13.4c-2.3,0-4.2-1.9-4.2-4.2C6.6,6.9,8.5,5,10.8,5S15,6.9,15,9.2S13.1,13.4,10.8,13.4z'/><path fill = 'white' d='M15,9.2c0,2.3-1.9,4.2-4.2,4.2s-4.2-1.9-4.2-4.2C6.6,6.9,8.5,5,10.8,5S15,6.9,15,9.2z'/></svg>";
  var svgURL = "data:image/svg+xml;base64," + btoa(icon);
       // create icon
       var markerIcon = L.icon({
           iconUrl: svgURL,
           shadowUrl: 'sources/shadow.png',
           iconSize:     [19, 40], // size of the icon
           shadowSize:   [30, 30], // size of the shadow
           iconAnchor:   [12, 30], // point of the icon which will correspond to marker's location
           shadowAnchor: [10, 23],  // the same for the shadow
           popupAnchor:  [-3, -24] // point from which the popup should open relative to the iconAnchor
       });

  tempMarker = L.marker(latlng, {icon: markerIcon}).addTo(map);
}

 function addNewPin() {
   if (state == 0) {
         state = 1;
         //If there was one, the error message disappears.
        map.on('click',createPin);
        a.innerHTML = "";
// Create a new random color for each new pin
          markerColor = getRandomColor();
        } else {
a.innerHTML = "Please submit your pin before creating a new one.";
console.log("cannot create pin");
        }
    }
function createPin(ev) {

   y.style.opacity="1";
        latlng = map.mouseEventToLatLng(ev.originalEvent);

  map.removeLayer(tempMarker);

            createSVG(markerColor)
            map.off('click',createPin);
            map.on('click',function(e){Dragpin(e,tempMarker);});
            }
function Dragpin(e,tempMarker) {
        if(state==1)
            {
                a.innerHTML = "";
        latlng = map.mouseEventToLatLng(e.originalEvent);
          tempMarker._icon.style.transition = "transform 0.3s ease-out";
          tempMarker._shadow.style.transition = "transform 0.3s ease-out";
      	tempMarker.setLatLng(latlng);
      }
            }

function onLocationError(e) {
    alert(e.message);
}

function relocate() {
    map.locate({setView: true})
    map.on('locationfound', function(ev){
            tempMarker.setLatLng(ev.latlng);
    })
}


 $("#reqForm").submit(function(e) {

   //stop submit the form, we will post it manually.
  event.preventDefault();

  // if ((liveNameInput != "") && (liveTitleInput != "")) {
  console.log(state);

     state = 0;
     y.style.opacity="0.3";

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
     tempMarker = L.marker(latlng, {
             title: "Resource Location",
             alt: "Resource Location",
             draggable: false,
         });
         //tempMarker.on("popupopen", onPopupOpen);
         return tempMarker;
     }
 }).addTo(map);




   s.style.display="none";


    latlng = tempMarker.getLatLng();
    var titleInput = document.getElementById("titleBox").value;
    var nameInput = document.getElementById("nameBox").value;

      var myJSON = { "title": titleInput, "name": nameInput, "color": markerColor, "coordinates": latlng};
      var markerData = JSON.stringify(myJSON);
      console.log(markerData);

     $.ajax
       ({
           type: 'POST',
           url: 'handleJSON.php',
           data: { data: markerData },
           success: function (response) {console.log(response)},
           failure: function(response) {console.log(response)}
       });

});

//
// var options = {
// 	data: marker.title;
// };




function loadData() {


  var options = {
    url: "markers.json",

    listLocation: "marker",

    getValue: "title",

    list: {
      onSelectItemEvent: function() {
  			var value = $("#titleBox").getSelectedItemData().color;

  			$("#colorPicker").val(value).trigger("change");
  		},
  		match: {
  			enabled: true
  		},
      showAnimation: {
  type: "slide", //normal|slide|fade
  time: 400,
  callback: function() {}
},

hideAnimation: {
  type: "slide", //normal|slide|fade
  time: 400,
  callback: function() {}
}
  	}
  };

  $("#titleBox").easyAutocomplete(options);


  $.getJSON('markers.json',function(data) {



for(let i = 0; i<data.length;i++){
for(let property in data[i]){
  let obj = data[i][property];
  let marker = JSON.parse(obj.marker);

  // $('#titleBox').val(marker.title);
  // console.log(marker.title);

  var icon = "<svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 30 51' style='enable-background:new 0 0 30 51;' xml:space='preserve'> <path fill='"+marker.color+"' d='M15,0.8C6.9,0.8,0.3,7.4,0.3,15.5c0,7.4,5.5,13.4,12.6,14.5v21h4.2V29.9c7.1-1,12.6-7.1,12.6-14.5 C29.7,7.4,23.1,0.8,15,0.8z M10.8,13.4c-2.3,0-4.2-1.9-4.2-4.2C6.6,6.9,8.5,5,10.8,5S15,6.9,15,9.2S13.1,13.4,10.8,13.4z'/><path fill = 'white' d='M15,9.2c0,2.3-1.9,4.2-4.2,4.2s-4.2-1.9-4.2-4.2C6.6,6.9,8.5,5,10.8,5S15,6.9,15,9.2z'/></svg>";
  var svgURL = "data:image/svg+xml;base64," + btoa(icon);
       //create icon
        //console.log(color[i]);

       var markerIcon = L.icon({
           iconUrl: svgURL,
           shadowUrl: 'sources/shadow.png',
           iconSize:     [19, 40], // size of the icon
           shadowSize:   [30, 30], // size of the shadow
           iconAnchor:   [12, 30], // point of the icon which will correspond to marker's location
           shadowAnchor: [10, 23],  // the same for the shadow
           popupAnchor:  [-3, -24] // point from which the popup should open relative to the iconAnchor

       });

   var customPopup ="<b>"+marker.title+"</div></b><br>Requested by "+marker.name+".";

  permanentMarker = L.marker([marker.coordinates.lng,marker.coordinates.lat], {icon: markerIcon}).bindPopup(customPopup).addTo(map);

  // Set popup wrapper to marker color
    document.documentElement.style.setProperty(`--color`, marker.color);

}// second for loop
} //first for loop


// var options = {
// 	url: "markers.json",
//
// 	getValue: "title",
//
// 	list: {
// 		match: {
// 			enabled: true
// 		}
// 	}
// };

          loaded=true;
        })
        //fail
        .fail(function() {
          console.log( "error" );
        });
      }

</script>
  </body>
  </html>
