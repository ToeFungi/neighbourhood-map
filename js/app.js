//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&mode=bicycling&origins=4800+El+Camino+Road,+Los+Altos,+California&destinations=2465+Latham+Street,+Mountain+View,+California&key=AIzaSyBOSlRsVnEzPxDg6V8peMv6hzr4-GOkqtY

let locations = [
	{
		id: 1,
		title: 'SAPS Kirstenhof',
		location: {
			lat: -34.072077,
			lng: 18.4551723
		}
	},
	{
		id: 2,
		title: 'Kirstenhof Primary School',
		location: {
			lat: -34.0696115,
			lng: 18.4554241
		}
	},
	{
		id: 3,
		title: 'Wise Owl Pre-school',
		location: {
			lat: -34.07289,
			lng: 18.4489899
		}
	},
	{
		id: 4,
		title: 'Hair Gallery',
		location: {
			lat: -34.065176,
			lng: 18.4515428
		}
	},
	{
		id: 5,
		title: 'The Church of the Holy Spirit',
		location: {
			lat: -34.0788875,
			lng: 18.4545959
		}
	},
	{
		id: 6,
		title: 'WESSA (Wildlife and Environment Society of South Africa)',
		location: {
			lat: -34.07408,
			lng: 18.44941
		}
	},
	{
		id: 7,
		title: 'Sound Solutions - Wedding DJ',
		location: {
			lat: -34.0714431,
			lng: 18.4480019
		}
	},
	{
		id: 8,
		title: 'Kirstenhof Car Hire',
		location: {
			lat: -34.075361,
			lng: 18.457439
		}
	},
	{
		id: 9,
		title: 'Domino\'s Pizza',
		location: {
			lat: -34.067027,
			lng: 18.457631
		}
	},
	{
		id: 10,
		title: 'Kirstenhof Dance & Pilates Studio',
		location: {
			lat: -34.0691599,
			lng: 18.45323
		}
	}
];

let markers = [];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.072788, lng: 18.4536387},
		zoom: 14
	});

	initMarkers();
}

function initMarkers() {
	bounds = new google.maps.LatLngBounds();

	locations.forEach((location) => {
		let marker = new google.maps.Marker({
			map: map,
			position: location.location,
			title: location.title,
			id: location.id,
			animation: google.maps.Animation.DROP
		});

		bounds.extend(marker.position);

		markers.push(marker);
	});
}