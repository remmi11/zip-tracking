/////////////////////////////////////////////////////////////////////////////////
// jquery ui

$(".dropdown-toggle").dropdown();

$(".dropdown-menu a").click(function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});

// Navbar Menu
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
$(document).ready(function () {
    $("#menu-toggle").click();
});
$("#filter-menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

/////////////////////////////////////////////////////////////////////////////////
// tabletop js

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1e2e7zVw8r-IZPbd9S1hLwSWT2o5x5bT_fStFRR8NWSM/edit?usp=sharing';

function init() {
    Tabletop.init({
        key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: true
    })
}

var destination;
var tracking;
var zipList = [];

$('.form-inline').submit(function (e) {
    e.preventDefault();
    tracking = jQuery('input[name="tracking"]').val();
    destination = jQuery('input[name="zipcode"]').val();
    init()
});

function showInfo(data, tabletop) {
    var regexp = new RegExp(tracking);
    for (var i = 0; i < data.length; i++) {
        if (regexp.test(data[i].tracking)) {
            zipList.push(data[i].location_1)
            zipList.push(data[i].location_2)
            zipList.push(data[i].location_3)
        }
    }
    //zipList.push("79015");
    zipList.push(destination);
    findMe(zipList);
};


/////////////////////////////////////////////////////////////////////////////////
// mapbox js

L.mapbox.accessToken = 'pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNpdGFicWJqYjAwdzUydHM2M2g0MmhsYXAifQ.oO-MYNUC2tVeXa1xYbCIyw';

var map;

var jsonLayer;

//var markers = new L.FeatureGroup();
//var markers = L.layerGroup();//.addTo(map);
//var group = new L.featureGroup();

map = L.map("map", {
    zoomControl: false,
    attributionControl: false
});

map.setView([37.47485, -99.18459], 4);

var streets = L.mapbox.tileLayer('mapbox.streets').addTo(map);
var satellite = L.mapbox.tileLayer('mapbox.satellite');
var outdoors = L.mapbox.tileLayer('mapbox.outdoors');

var baseMaps = {
    "Street Map": streets,
    "Aerial Imagery": satellite
};

L.control.layers(baseMaps).addTo(map);
//define an array to store coordinates
//var featureGroup = L.featureGroup();


var markerArray = [];
var bounds = L.latLngBounds(markerArray);
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup('<h1>' + feature.place_name + '</h1>');
        //markerArray.push(L.marker([feature.geometry.coordinates]));
        markerArray.push(L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]));
    }
}


function findMe(zipList) {
    var listLength = zipList.length;
    for (var i = 0; i < listLength; i++) {
        var myRequest = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + zipList[i] + ".json?access_token=" + L.mapbox.accessToken + "&limit=1";
        $.ajax({
            method: 'GET',
            url: myRequest,
            success: (function (data) {
                jsonLayer = new L.geoJson(data, {
                    onEachFeature: onEachFeature,
                    pointToLayer: function (feature, latlng) {
                        return new L.CircleMarker(latlng, {
                            radius: 10,
                            color: '#000',
                            weight: 5,
                            opacity: 1,
                            fillColor: 'yellow',
                            fillOpacity: 1
                        }).addTo(map);
                    }
                });
            })
        })
    }
    findExtents(jsonLayer);
};


function findExtents() {
    //console.log(markerArray);
    map.fitBounds(jsonLayer);//works!
}


//         }).done(function (data) {
//             jsonLayer = L.geoJson(data, {
//                 onEachFeature: onEachFeature,
//                 pointToLayer: function (feature, latlng) {
//                     return new L.CircleMarker(latlng, {
//                         radius: 10,
//                         color: '#000',
//                         weight: 5,
//                         opacity: 1,
//                         fillColor: 'yellow',
//                         fillOpacity: 1
//                     }).addTo(map);
//                 }
//             });
//         });
//     }
//     map.fitBounds(bounds);//works!
// };




