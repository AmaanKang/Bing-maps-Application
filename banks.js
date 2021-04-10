function loadMapScenario(){
    window.addEventListener("load", function(){
        let map = new Microsoft.Maps.Map('#aMap');

        Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
            directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
            directionsManager.setRequestOptions({
                routeMode: Microsoft.Maps.Directions.RouteMode.driving
            });
        });

        map.setView({
            center: new Microsoft.Maps.Location(43.255203,-79.843826),
            zoom:11
        });
        let infoboxDetails = {
            visible: false,
        }

        /**
         * Get the current location of the user
         */
         navigator.geolocation.getCurrentPosition(successCall, errorCall);
         function successCall(position){
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            let locate = new Microsoft.Maps.Location(lat, long);
         }
         /**
         * Run errorCall if user's location cannot be tracked
         * @param {error} error 
         */
         function errorCall(error) {
            let errMsg;
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errMsg = 'User denied the request for geolocation';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errMsg = 'Location information is unavailable';
                    break;
                case error.TIMEOUT:
                    errMsg = 'The request to get user location timed out';
                    break;
                case error.UNKNOWN_ERROR:
                default:
                    errMsg = 'An unknown error occurred';
                    break;
            }

            document.getElementById("error").innerHTML = "Error: " + errMsg;
        }
    });
}