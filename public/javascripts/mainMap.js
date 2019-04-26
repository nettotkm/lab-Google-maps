const directionsService = new google.maps.DirectionsService;
const directionsDisplay = new google.maps.DirectionsRenderer;


function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const myLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      startMap(myLoc);
    }, function () {
      console.log('Error in the geolocation service');
    });
  }  else{
    console.log('Browser does not support geolocation');
  }
}
function startMap(myLoc) {
  const ironhackBCN = {
  	lat: -23.547471,
    lng: -46.632881 };

  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 10,
      center: ironhackBCN,
    }
  );
  const myHome = new google.maps.Marker({
    position: {
      lat: -23.202090,
      lng: -45.894619,
    },
    map: map,
    title: 'Home',
  });
  const myMarker = new google.maps.Marker({
    position: myLoc,
    map: map,
    title: 'here',
  });

  const directionRequest = {
    origin: myMarker.position,
    destination: myHome.position,
    travelMode: 'BICYCLING',
  };
  directionsService.route(
    directionRequest,
    (response, status) => {
      if (status === 'OK') {
        // everything is ok
        directionsDisplay.setDirections(response);

      } else {
        // something went wrong
        window.alert('Directions request failed due to ' + status);
      }
    },
  );

  directionsDisplay.setMap(map);
}
getUserLocation();
