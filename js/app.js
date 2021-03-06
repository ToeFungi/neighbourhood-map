let map;

function AppViewModel() {
    this.searchOption = ko.observable("");
    this.filteredLocations = ko.observable(locations);
    this.markers = [];
    this.infoWindow = new google.maps.InfoWindow();

    this.initMap = () => {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.072788, lng: 18.4536387},
            zoom: 14,
            disableDefaultUI: true
        });

        this.initMarkers();
    };

    this.initMarkers = () => locations.forEach((location) => {
        let marker = new google.maps.Marker({
            map: this.map,
            position: location.location,
            title: location.title,
            id: location.id,
            animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'click', () => {
            this.openInfoWindow(marker);
            marker.setAnimation(google.maps.Animation.DROP);
        });

        this.markers.push(marker);
    });


    this.searchOption.subscribe((search) => {
        let searched = locations.filter((location) => {
            return location.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
        this.filteredLocations(searched);

        this.markers.forEach((marker) => {
            for(let i = 0; i < this.filteredLocations().length; i++) {
                if(marker.id === this.filteredLocations()[i].id) {
                    marker.setVisible(true);
                    return true;
                }
            }
            marker.setVisible(false);
        });
    });

    this.openInfoWindow = (marker) => {
        if(this.infoWindow.marker && this.infoWindow.marker.id === marker.id) return;

        this.infoWindow.marker = marker;

        this.getFoursquareData();

        this.infoWindow.setContent(`<div>Loading data from Foursquare</div>`);
        this.infoWindow.addListener('closeclick', () => this.infoWindow.marker = null);
        this.infoWindow.open(map, marker);
    };

    this.getFoursquareData = () => {
        let clientId = 'Q44UCWZHNTBACXILOCW2VWKDZIEOFFFYJHE2PKHF4YGA21BD';
        let clientSecret = 'NL3QNYHNQABL0A4DVHQODX2JTSAKR4AIJCH4AEG5YKURRCDP';

        let marker = this.infoWindow.marker;
        let apiUrl = `https://api.foursquare.com/v2/venues/search?ll=${marker.position.lat()},${marker.position.lng()}&client_id=${clientId}&client_secret=${clientSecret}&query=${marker.title}&v=20180224&m=foursquare`;

        fetch(apiUrl, {
            method: 'get'
        }).then((resp) => {
            return resp.json();
        }).then((evt) => {
            this.infoWindow.setContent(`<h4>${this.infoWindow.marker.title}</h4><p>${this.infoWindow.marker.position.lat()}, ${this.infoWindow.marker.position.lng()}</p>`);

            if(evt.response.venues.length === 0) throw Error('Foursquare has no information of this place.');

            let venue = evt.response.venues.filter((venue) => {
                return venue.name.toLowerCase() === this.infoWindow.marker.title.toLowerCase();
            })[0];

            if(venue === undefined) throw Error('Foursquare doesn\'t know this place.');

            let obj = {};

            obj.title = venue.name;
            obj.category = venue.categories.length > 0 ? obj.category = venue.categories[0].name : '';
            obj.street = venue.location.formattedAddress[0] ? venue.location.formattedAddress[0] : '';
            obj.city = venue.location.formattedAddress[1] ? venue.location.formattedAddress[1] : '' ;
            obj.zip = venue.location.formattedAddress[3] ? venue.location.formattedAddress[3] : '';
            obj.country = venue.location.formattedAddress[4] ? venue.location.formattedAddress[4] : '';
            obj.lat = venue.location.lat;
            obj.lng = venue.location.lng;

            this.updateInfoWindow(obj);
        }).catch((err) => {
            alert(err);
        });
    };

    this.updateInfoWindow = (obj) => {
        this.infoWindow.setContent(`
			<h4>${obj.title}</h4>
			<p>${obj.category}</p>
			<p>${obj.street}</p>
			<p>${obj.city}</p>
			<p>${obj.zip}</p>
			<p>${obj.country}</p>
			<p>${obj.lat}, ${obj.lng}</p>
			<p>Powered by Foursquare</p>`);
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

    this.toggleNav = () =>
        (document.getElementById("side-nav").style.width === "100%") ?
            document.getElementById("side-nav").style.width = "0" :
            document.getElementById("side-nav").style.width = "100%";

    this.initMap();

    this.mapLoadFailed = () => {
        alert('Google Maps failed to load. Please try again later!');
    };
}

function startApp() {
    ko.applyBindings(new AppViewModel());
}