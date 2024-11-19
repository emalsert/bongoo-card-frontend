<template>
  <div class="scrolling-banner bg-orange-8">
    <q-slide-transition appear>
      <div class="scrolling-text">
        BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO BONGOO
      </div>
    </q-slide-transition>
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

  .scrolling-text {
    display: inline-block;
    white-space: nowrap;
    animation: scroll 10s linear infinite;
    font-family: 'Gulf Display', sans-serif;
    font-size: 2rem;
    color: #FFF8EF;
  }
}

@keyframes scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
