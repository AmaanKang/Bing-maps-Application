/**
 *  I, Amandeep Kaur, student number 000822179, certify that this material is my original work. No other person's work has been used without due acknowledgment and 
 * I have not made my work available to anyone else.
 */
function loadMapScenario(){
    window.addEventListener("load", function(){
        function loadTheHomePage(){
            let map = new Microsoft.Maps.Map('#aMap');
            let infobox;
        /**
         * Set the view of the map
         */
        map.setView({
            center: new Microsoft.Maps.Location(43.25593045,-79.86830339),
            zoom:14
        });
        /**
         * Get bank locations from php file
         */
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
            visible: false
        }
        /**
         * Get the current location of the user
         */
         navigator.geolocation.getCurrentPosition(successCall, errorCall);
         
         function successCall(position){
            lat = position.coords.latitude;
            long = position.coords.longitude;
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
            document.getElementById("dirPanel").style.display = "block";
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
        /**
         * Adds a location to favourites table
         * @param {id} bankId 
         */
        function addToFavourites(bankId){
            fetch("addToFav.php?id="+bankId).then(response => response.json());
        }
        /**
         * Display pins on map after getting the bank locations
         * @param {locations} locations 
         */
        function displayPins(locations) {
            for (i = 0; i < locations.length; i++) {
                let bankId = locations[i].bankId;
                let location = new Microsoft.Maps.Location(locations[i].latitude,locations[i].longitude);
                let pushpinOptions = {
                    title: locations[i].name
                }
            
                pushpin = new Microsoft.Maps.Pushpin(location, pushpinOptions);
                pushpin.metadata = {
                    myDescription: locations[i].name + "</br>" + locations[i].address + "</br>" + locations[i].city +", "+locations[i].province + " " + locations[i].postalCode,
                    myActions:[{label:'Directions',eventHandler:() => {showDirections(location.latitude,location.longitude);}},
                    {label:'Add to Favourites',eventHandler:() => {addToFavourites(bankId);}}]
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

        
        /**
         * Adds a new location to locations table in database
         * @param {name} pinName 
         * @param {address} address 
         * @param {city} city 
         * @param {province} prov 
         * @param {postal code} postalCode 
         */
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
        /**
         * Search for a location by using search manager
         * @param {name} name 
         * @param {address} address 
         */
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
                            document.getElementById("searchError").innerHTML = "Invalid name or Address";
                        }
                    },
                    errorCallback: function (e) {
                        document.getElementById("searchError").innerHTML = "No results found for the specified address";
                    }
                }
                searchManager.geocode(searchRequest);
            }
        }
        /**
         * When user clicks on add button to add a location
         */
        document.getElementById("addForm").addEventListener("submit",function(event){
            event.preventDefault();
            let name = document.forms.addForm.locationName.value;
            let address = document.forms.addForm.locationAddress.value;
            let city = document.forms.addForm.locationCity.value;
            let prov = document.forms.addForm.locationProv.value;
            let postalCode = document.forms.addForm.locationCode.value;
            addNewLocation(name,address,city,prov,postalCode);
        });
        /**
         * When user clicks on Search button to search for a location
         */

        document.getElementById("searchForm").addEventListener("submit",function(event){
            event.preventDefault();
            let name = document.forms.searchForm.searchName.value;
            let address = document.forms.searchForm.searchAddress.value;
            searchLocation(name,address);
        });
        
        }
        loadTheHomePage();
        /**
         * Display Home page
         */
        document.getElementById("homeLink").addEventListener("click",function(){
            document.getElementById("homePage").style.display = "block";
            document.getElementById("favPage").style.display = "none";
            document.getElementById("aTable").style.display = "none";
            loadTheHomePage();
        });
        /**
         * Display All Banks page
         */
        document.getElementById("allLink").addEventListener("click",function(){
            document.getElementById("homePage").style.display = "none";
            document.getElementById("favPage").style.display = "none";
            document.getElementById("aTable").style.display = "block";
            let tableData = "";
            document.getElementById("aTable").innerHTML = "";
            $("#aTable").append("<tr><th>Bank Name</th><th>Address</th><th>City</th><th>Province</th><th>Postal Code</th></tr>");
            fetch("getBanks.php").then(response => response.json()).then(displayTable);
            function displayTable(arrayOfLocations){
                for(let i = 0; i<arrayOfLocations.length; i++){
                    tableData = "<tr><td>"+arrayOfLocations[i].name+"</td><td>"+ arrayOfLocations[i].address+"</td><td>"+ arrayOfLocations[i].city+"</td><td>"+ arrayOfLocations[i].province+"</td><td>"+ arrayOfLocations[i].postalCode+"</td></tr>";
                    $("#aTable").append(tableData);
                }
            }
        });
        /**
         * Display Favourites page
         */
        document.getElementById("favLink").addEventListener("click",function(){
            document.getElementById("homePage").style.display = "none";
            document.getElementById("favPage").style.display = "block";
            document.getElementById("aTable").style.display = "none";
            document.getElementById("favPage").innerHTML = "";
            displayTableFav();
        })
    });

}