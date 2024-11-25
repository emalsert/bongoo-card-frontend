<template>
  <div class="scrolling-banner bg-orange-8">
    <div class="scrolling-container">
      <div class="scrolling-text">
        BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO
      </div>
      <div class="scrolling-text">
        BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollingBanner'
}
</script>

<style lang="scss">
.scrolling-banner {
  width: 100%;
  overflow: hidden;
  padding: 5px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.scrolling-container {
  display: flex;
  width: fit-content;
  animation: scroll 20s linear infinite;
}

.scrolling-text {
  white-space: nowrap;
  font-family: 'Gulf Display', sans-serif;
  font-size: 2rem;
  color: #FFF8EF;
  padding-right: 50px; // Espace entre les deux copies du texte
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
