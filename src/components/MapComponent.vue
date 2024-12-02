
<template>
  <q-page class="q-pa-md">
    <div ref="mapContainer" style="height: 500px;" class="map-container q-mt-md"></div>
  </q-page>
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getOffers } from '../services/offers';

export default {
  name: 'MapComponent',
  setup() {
    const locations = ref([]);
    const map = ref(null);
    const mapContainer = ref(null);

    const extractCoordinates = (googleMapsUrl) => {
      try {
        const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const matches = googleMapsUrl.match(regex);
        if (matches && matches.length >= 3) {
          const coordinates = [parseFloat(matches[1]), parseFloat(matches[2])];
          console.log(`Coordonnées extraites pour l'URL ${googleMapsUrl} :`, coordinates);
          return coordinates;
        }
        console.log(`Impossible d'extraire les coordonnées pour l'URL ${googleMapsUrl}, utilisation des coordonnées par défaut`);
        return [11.5564, 104.9282];
      } catch (error) {
        console.error('Error extracting coordinates:', error);
        return [11.5564, 104.9282];
      }
    };

    const initMap = () => {
      if (!mapContainer.value) return;

      map.value = L.map(mapContainer.value).setView([11.5564, 104.9282], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);

      const customIcon = L.divIcon({
        html: '<i class="q-icon material-icons" style="font-size: 32px;">place</i>',
        iconSize: [32, 32],
        className: 'custom-div-icon'
      });

      locations.value.forEach(location => {
        L.marker(location.position, { icon: customIcon })
          .addTo(map.value)
          .bindPopup(`
            <div class="location-popup">
              <h3>${location.title}</h3>
              <p>${location.description}</p>
            </div>
          `, {
            maxWidth: 300,
            className: 'custom-popup-wrapper',
            closeButton: true,
            autoClose: false
          });
      });
    };

    const fetchOffers = async () => {
      try {
        const data = await getOffers();
        console.log('Données brutes des offres:', data.offers);

        locations.value = (data.offers || []).map(offer => {
          const position = extractCoordinates(offer.google_maps);
          console.log(`Position finale pour ${offer.title}:`, position);
          return {
            position,
            title: offer.title,
            description: offer.offer_details
          };
        });

        console.log('Locations finales:', locations.value);
        initMap();
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    onMounted(async () => {
      await fetchOffers();
    });

    return {
      mapContainer
    };
  }
};
</script>

<style>
.map-container {
  width: 100%;
  min-height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.location-popup {
  font-family: 'Chau Philomene One', sans-serif;
  text-align: center;
  padding: 10px;
}

.location-popup h3 {
  color: var(--primary-color);
  font-size: 22px;
  line-height: 1.1;
  font-weight: bold;
  font-family: 'Gulf Display', sans-serif;
}

.location-popup p {
  color: var(--secondary-color);
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
}

.custom-popup-wrapper .leaflet-popup-content-wrapper {
  border-radius: 12px;
  border: 2px solid var(--secondary-color);
  background-color: var(--background-color);
  padding: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-popup-wrapper .leaflet-popup-tip {
  background-color: var(--secondary-color);
}

.custom-div-icon {
  background: transparent;
  border: none;
}

.custom-div-icon i {
  color: var(--primary-color);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease, color 0.3s ease;
}

.custom-div-icon i:hover {
  transform: scale(1.1);
  color: var(--secondary-color);
}
</style>

