function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
        
var map = L.map('map').setView([37.09024, -95.712891], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

for (let i = 0; i < 3; i++) {
    const lat = getRandomInRange(30, 35, 3);
    const long = getRandomInRange(-100, -90, 3);

    var marker = L.marker([lat, long]).addTo(map);
    
    function fetchLocality (lat, long, i) {
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
            .then(resp => resp.json())
            .then(data => {
                const locality = data.locality;
                marker.bindPopup(`Marker ${i}: ${locality}`).openPopup();
                document.getElementById('markersInfo').innerHTML += `<p><h2>Marker ${i}: Latitude ${lat}, Longitude ${long} </h2></p> <p><h3>Locality: ${locality}</h3></p>`;
            });
    };

    fetchLocality(lat, long, i + 1);
}
