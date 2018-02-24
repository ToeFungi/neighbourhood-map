function AppViewModel() {
	this.searchOption = ko.observable("");
	this.filteredLocations = ko.observable(locations);
	this.markers = [];
	this.infoWindow = new google.maps.InfoWindow();

	this.initMap = () => {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -34.072788, lng: 18.4536387},
			zoom: 14,
			disableDefaultUI: true
		});

		this.initMarkers();
	};

    this.initMarkers = () => locations.forEach((location) => {
        let marker = new google.maps.Marker({
            map: map,
            position: location.location,
            title: location.title,
            id: location.id,
            animation: google.maps.Animation.DROP
        });
        google.maps.event.addListener(marker, 'click', () => this.openInfoWindow(marker));
        this.markers.push(marker);
    });


    this.searchOption.subscribe((search) => {
    	let searched = locations.filter((location) => {
    		return location.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
		});

        this.filteredLocations(searched);
    });

	this.openInfoWindow = (marker) => {
		console.log(this.getMarkerData(marker.id));
	};

	this.getMarkerData = (markerId) => {
		return locations.filter((location) => {
			return location.id === markerId;
		})[0];
	};

    this.getInfo = (evt) => {
    	this.toggleNav();
    	let marker = this.markers.filter((marker) => {
    		return marker.id === evt.id;
		});
    	this.openInfoWindow(marker[0]);
    };

	this.toggleNav = (evt) =>
		(document.getElementById("side-nav").style.width === "100%") ?
			document.getElementById("side-nav").style.width = "0" :
			document.getElementById("side-nav").style.width = "100%";

	this.initMap();
}

function startApp() {
	ko.applyBindings(new AppViewModel());
}