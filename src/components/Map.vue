<template>
  <div id="map-container">
    <div id="map"></div>
    <button id = "map-button" @click="searchInArea">Buscar en esta zona</button>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getTrailsInBounds } from '@/services/trailsService';

export default {
  name: 'MapComponent',
  data() {
    return {
      map: null,
      walks: [],
      mapMarkers: []
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([-35, -71], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map);
    },
    async loadWalks(bounds) {
      try {
        const trails = await getTrailsInBounds(bounds.northEast, bounds.southWest);
        this.walks = trails;
        this.updateMarkers();
      } catch (error) {
        console.error('Error fetching trails:', error);
      }
    },
    updateMarkers() {
      this.mapMarkers.forEach(marker => this.map.removeLayer(marker));
      this.mapMarkers = [];

      this.walks.forEach(walk => {
        const marker = L.marker([walk.latitude, walk.longitude])
          .addTo(this.map)
          .bindPopup(`
            <div id="pin-content">
                <b>${walk.title}</b><br>
                <img src="${walk.pictures[0]}" alt="${walk.title}" width="100">
                <a id="map-button" href="/trails/${walk.id}">Ver detalles</a>
            </div>
          `);

        marker.on('click', () => {
          this.map.setView(marker.getLatLng(), this.map.getZoom(), {
            animate: true
          });
          marker.openPopup();
        });

        this.mapMarkers.push(marker);
      });
    },
    searchInArea() {
      const bounds = this.map.getBounds();
      const area = {
        northEast: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
        southWest: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng }
      };
      this.loadWalks(area);
    }
  }
};
</script>

<style>
#map-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
}
#map {
    height: var(--size-25);
    width: 100%;
    height: 70vh;
    border-radius: var(--border-radius-2);
    margin-top: 2vh;
    box-shadow: var(--shadow);
}

#map-button {
    margin-top: var(--size-2);
    padding: var(--size-05) var(--size-1);
    border-radius: var(--border-radius-2);
    background-color: var(--color-sey);
    font-size: var(--size-1);
    cursor: pointer;
    border-color: var(--color-border);
}

#map-button:hover {
    box-shadow: var(--shadow);
}

#pin-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

#pin-content img {
    margin-top: var(--size-1);
    border-radius: var(--border-radius-2);
    width: 100%;
}

#pin-content a {
    margin-top: var(--size-1);
    padding: var(--size-05) var(--size-1);
    border-radius: var(--border-radius-2);
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
    border-color: var(--color-border);
    font-size: var(--font-size-sm);
}
</style>


