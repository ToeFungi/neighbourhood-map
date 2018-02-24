function AppViewModel() {
	let self = this;

	this.searchOption = ko.observable("");
	this.filteredLocations = ko.observable(locations);

	this.initMap = () => {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -34.072788, lng: 18.4536387},
			zoom: 14,
			disableDefaultUI: true
		});

		this.initMarkers();
	};

    this.searchOption.subscribe((search) => {
    	let searched = locations.filter((location) => {
    		return location.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
		});

        this.filteredLocations(searched);
    });

	this.initMarkers = () => locations.forEach((location) => {
		new google.maps.Marker({
			map: map,
			position: location.location,
			title: location.title,
			id: location.id,
			animation: google.maps.Animation.DROP
		});
	});

    this.getInfo = (evt) => self.toggleNav();

	this.toggleNav = () =>
		(document.getElementById("side-nav").style.width === "100%") ?
			document.getElementById("side-nav").style.width = "0" :
			document.getElementById("side-nav").style.width = "100%";

	this.initMap();
}

function startApp() {
	ko.applyBindings(new AppViewModel());
}