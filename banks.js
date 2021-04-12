function loadMapScenario(){
    window.addEventListener("load", function(){
        let map = new Microsoft.Maps.Map('#aMap');
        let infobox;
        /**
         * Set the view of the map
         */
         map.setView({
            center: new Microsoft.Maps.Location(43.255203,-79.843826),
            zoom:11
        });
        function getLocations(){
            fetch("getBanks.php").then(response => response.json()).then(displayPins);
        }
        getLocations();
        Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
            directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
            directionsManager.setRequestOptions({
                routeMode: Microsoft.Maps.Directions.RouteMode.driving
            });
        });
        let lat;
        let long;
        let firstWaypoint;
        let secondWaypoint;
        let searchManager;
        let infoboxDetails = {
            visible: false,
        }
        /**
         * Get the current location of the user
         */
         navigator.geolocation.getCurrentPosition(successCall, errorCall);
         
         function successCall(position){
            lat = position.coords.latitude;
            long = position.coords.longitude;
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
        /**
             * Show the directions on map and in panel
             * @param {latitude} pinLat 
             * @param {longitude} pinLong 
             */
        function showDirections(pinLat, pinLong) {
            console.log("I am in");
            document.getElementById("dirPanel").style.visibility = "visible";
            directionsManager.removeWaypoint(firstWaypoint);
            directionsManager.removeWaypoint(secondWaypoint);
            let currPos = new Microsoft.Maps.Location(pinLat, pinLong);
            firstWaypoint = new Microsoft.Maps.Directions.Waypoint({
                location: new Microsoft.Maps.Location(lat,long)
            });
            directionsManager.addWaypoint(firstWaypoint);

            secondWaypoint = new Microsoft.Maps.Directions.Waypoint({
                location: currPos
            });
            directionsManager.addWaypoint(secondWaypoint);

            directionsManager.setRenderOptions({
                itineraryContainer: document.getElementById("dirPanel")
            });
            directionsManager.calculateDirections();
        }
        function displayPins(locations) {
            console.log(locations);
            
            for (i = 0; i < locations.length; i++) {
                let location = new Microsoft.Maps.Location(locations[i].latitude,locations[i].longitude);
                let pushpinOptions = {
                    title: locations[i].name
                }
            
                pushpin = new Microsoft.Maps.Pushpin(location, pushpinOptions);
                pushpin.metadata = {
                    myDescription: locations[i].name + "</br>" + locations[i].address + "</br>" + locations[i].city +", "+locations[i].province + " " + locations[i].postalCode,
                    myActions:[{label:'Directions',eventHandler:() => {showDirections(location.latitude,location.longitude);
                    }}]

                }
                infobox = new Microsoft.Maps.Infobox(location, infoboxDetails);
                infobox.setMap(map);
                Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
                map.entities.push(pushpin);
            }
            
        }

        /**
             * Event attached to pushpin clicked
             * @param {pushpin} e 
             */
         function pushpinClicked(e) {
            let infoboxNewOptions = {
                location: e.target.getLocation(),
                description: e.target.metadata.myDescription,
                actions:e.target.metadata.myActions,
                visible: true
            }
            infobox.setOptions(infoboxNewOptions);
        }

        

        function addNewLocation(pinName, address,city,prov,postalCode) {
            Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
                searchManager = new Microsoft.Maps.Search.SearchManager(map);
                geocodeQuery(address);
            });

            function geocodeQuery(query) {
                var searchRequest = {
                    where: query,
                    callback: function (r) {
                        if (r && r.results && r.results.length > 0) {
                            let lt = r.results[0].location.latitude;
                            let lg = r.results[0].location.longitude;
                            fetch("addLocation.php?locationName="+pinName+"&locationAddress="+address+"&locationCity="+city+"&locationProv="+prov+
                            "&locationCode="+postalCode+"&lat="+lt+"&long="+lg)
                            .then(response => response.json())
                            .then(addSuccess)
                            .then(getLocations);

                            function addSuccess(message){
                                document.getElementById("addError").innerHTML = message;
                            }
                            
                        } else {
                            document.getElementById("addError").innerHTML = "Invalid Address";
                        }
                    },
                    errorCallback: function (e) {
                        document.getElementById("addError").innerHTML = "No results found for the specified address";
                    }
                }
                searchManager.geocode(searchRequest);
            }
        }
        function searchLocation(name,address){
            Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
                searchManager = new Microsoft.Maps.Search.SearchManager(map);
                geocodeQuery(name,address);
            });
            function geocodeQuery(name,address) {
                var searchRequest = {
                    where: name+address,
                    callback: function (r) {
                        if (r && r.results && r.results.length > 0) {
                            let lt = r.results[0].location.latitude;
                            let lg = r.results[0].location.longitude;
                            showDirections(lt,lg);
                            
                        } else {
                            document.getElementById("addError").innerHTML = "Invalid name or Address";
                        }
                    },
                    errorCallback: function (e) {
                        document.getElementById("addError").innerHTML = "No results found for the specified address";
                    }
                }
                searchManager.geocode(searchRequest);
            }
        }
        document.getElementById("addForm").addEventListener("submit",function(event){
            event.preventDefault();
            let name = document.forms.addForm.locationName.value;
            let address = document.forms.addForm.locationAddress.value;
            let city = document.forms.addForm.locationCity.value;
            let prov = document.forms.addForm.locationProv.value;
            let postalCode = document.forms.addForm.locationCode.value;
            addNewLocation(name,address,city,prov,postalCode);
        });

        document.getElementById("searchForm").addEventListener("submit",function(event){
            event.preventDefault();
            let name = document.forms.searchForm.searchName.value;
            let address = document.forms.searchForm.searchAddress.value;
            searchLocation(name,address);
        });
        
    });

}