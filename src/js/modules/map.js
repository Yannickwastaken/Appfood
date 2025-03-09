// Map module - Handles the Leaflet map integration

// Default map center (Paris, France)
const DEFAULT_LAT = 48.8566;
const DEFAULT_LNG = 2.3522;
const DEFAULT_ZOOM = 13;

// Map instance
let map;

/**
 * Initialize the map
 */
export function initMap() {
    // Create map instance
    map = L.map('map').setView([DEFAULT_LAT, DEFAULT_LNG], DEFAULT_ZOOM);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add default marker
    addDefaultMarker();
    
    // Handle map click events
    map.on('click', onMapClick);
}

/**
 * Add a default marker to the map
 */
function addDefaultMarker() {
    const marker = L.marker([DEFAULT_LAT, DEFAULT_LNG]).addTo(map);
    marker.bindPopup("<b>Bienvenue à Paris!</b><br>Explorez les restaurants autour de vous.").openPopup();
}

/**
 * Handle map click events
 * @param {Object} e - Click event
 */
function onMapClick(e) {
    console.log("Map clicked at: " + e.latlng.lat + ", " + e.latlng.lng);
}

/**
 * Add a marker to the map
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} title - Marker title
 * @param {string} content - Popup content
 * @returns {Object} - Marker instance
 */
export function addMarker(lat, lng, title, content) {
    const marker = L.marker([lat, lng]).addTo(map);
    
    if (content) {
        marker.bindPopup(content);
    }
    
    return marker;
}

/**
 * Add multiple markers from data
 * @param {Array} locations - Array of location objects with lat, lng, title, and content
 */
export function addMarkersFromData(locations) {
    if (!Array.isArray(locations)) {
        console.error('Locations must be an array');
        return;
    }
    
    locations.forEach(location => {
        if (location.lat && location.lng) {
            const content = `
                <div class="map-popup">
                    <h3>${location.title || 'Unnamed Location'}</h3>
                    <p>${location.description || ''}</p>
                    ${location.image ? `<img src="${location.image}" alt="${location.title}" width="150">` : ''}
                    <a href="#" class="btn" data-id="${location.id}">Voir détails</a>
                </div>
            `;
            
            addMarker(location.lat, location.lng, location.title, content);
        }
    });
}

/**
 * Center the map on a specific location
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} zoom - Zoom level
 */
export function centerMap(lat, lng, zoom = DEFAULT_ZOOM) {
    map.setView([lat, lng], zoom);
}

/**
 * Get the current map instance
 * @returns {Object} - Leaflet map instance
 */
export function getMap() {
    return map;
}
