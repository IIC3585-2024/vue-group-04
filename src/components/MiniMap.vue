<template>
  <div class="mini-map-container">
    <div id="mini-map" class="mini-map"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MiniMap',
  props: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const map = L.map('mini-map', { zoomControl: false }).setView([this.latitude, this.longitude], 9);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      L.marker([this.latitude, this.longitude]).addTo(map);
    }
  }
};
</script>

<style>
.mini-map-container {
  width: 80%;
  margin-left: 10%;
  height: 100%;
  box-shadow: var(--shadow);
  border-radius: var(--border-radius-2);
  margin-top: var(--size-2);
}

.mini-map {
  width: 100%;
  height: 20vh;
  min-height: var(--size-10);
  border-radius: var(--border-radius-2);
}
</style>
