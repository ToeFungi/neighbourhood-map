//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&mode=bicycling&origins=4800+El+Camino+Road,+Los+Altos,+California&destinations=2465+Latham+Street,+Mountain+View,+California&key=AIzaSyBOSlRsVnEzPxDg6V8peMv6hzr4-GOkqtY
function AppViewModel() {
	let self = this;

	this.searchOption = ko.observable("");

	this.initMap = function() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -34.072788, lng: 18.4536387},
			zoom: 14,
			disableDefaultUI: true
		});

		this.initMarkers();
	};

	this.initMarkers = function() {
		locations.forEach((location) => {
			new google.maps.Marker({
				map: map,
				position: location.location,
				title: location.title,
				id: location.id,
				animation: google.maps.Animation.DROP
			});
		});
	};

	this.toggleNav = function() {
		console.log(this.searchOption());
		(document.getElementById("side-nav").style.width === "100%") ?
			document.getElementById("side-nav").style.width = "0" :
			document.getElementById("side-nav").style.width = "100%";
	};

	this.initMap();
}

function startApp() {
	ko.applyBindings(new AppViewModel());
}