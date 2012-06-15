function checkLocation() {
var win = function(position) {
var lat = position.coords.latitude;
var long = position.coords.longitude;
var myLatlng = new google.maps.LatLng(lat, long);

var myOptions = {
center: myLatlng,
zoom: 16,
mapTypeId: google.maps.MapTypeId.HYBRID
};
map_element = document.getElementById("map_canvas");
map = new google.maps.Map(map_element, myOptions);
};

var fail = function(e) {
$.mobile.hidePageLoadingMsg();
alert('Can\'t retrieve position.\nError: ' + e);
};

watchID = navigator.geolocation.getCurrentPosition(win, fail);
} 