<template>
  <container-component class="bongoo-card">
    <div class="card-inner">
      <div class="card-header">
        <div class="title">
          <span class="bongoo-text">Bongoo</span>
          <span class="location">Cambodia 🇰🇭</span>
        </div>
        <q-img
          src="https://res.cloudinary.com/doyo6tvky/image/upload/v1732441631/nfabcignygjtb6kwqoa2.png"
          class="logonav"
          alt="Logo Bongoo"
          spinner-color="primary"
          spinner-size="40px"
        >
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              Cannot load image
            </div>
          </template>
        </q-img>
      </div>

      <div class="card-content">
        <div class="field">
          <span class="label">FIRSTNAME:</span>
          <div class="input-box">{{ firstName }}</div>
        </div>
        <div class="field">
          <span class="label">NAME:</span>
          <div class="input-box">{{ lastName }}</div>
        </div>
      </div>

      <div class="card-footer">
        <p class="website">www.bongoo-card.com</p>
        <p class="disclaimer">This card is nominative, strictly personal and limited to 1 per person per year. Cannot be resold, exchanged or refunded. Offers valid upon presentation of ID.</p>
      </div>
    </div>
  </container-component>
</template>

<script>
import ContainerComponent from './ContainerComponent.vue'

export default {
  name: 'BongooCard',
  components: {
    ContainerComponent
  },
  props: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.bongoo-card {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 0;

  @media (max-width: 600px) {
    width: 90%;
    margin: 1rem auto;
  }
}

.card-inner {
  position: relative;
  width: 100%;
  padding: 1%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 1%;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .title {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    @media (min-width: 601px) {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .bongoo-text {
    font-family: 'Gulf Display', sans-serif;
    color: #FCAD51;
    font-size: clamp(24px, 5vw, 36px);
    line-height: 1;
  }

  .location {
    font-family: 'Gulf Display', sans-serif;
    color: #6573D6;
    font-size: clamp(18px, 4vw, 24px);
    line-height: 1;
  }

  .logonav {
    width: clamp(40px, 8vw, 60px);
    height: clamp(40px, 8vw, 60px);
  }
}

.card-content {
  .field {
    margin-bottom: 1rem;

    .label {
      color: #6573D6;
      font-family: 'Gulf Display', sans-serif;
      font-size: clamp(16px, 3.5vw, 20px);
      margin-bottom: 0.2rem;
      display: block;
    }

    .input-box {
      border: 2px solid #bd5a0d;
      border-radius: 25px;
      padding: 0.75rem 1rem;
      font-size: clamp(14px, 3vw, 16px);
      background: white;
      width: 100%;
      box-sizing: border-box;
      min-height: 44px; // Pour une meilleure accessibilité tactile
    }
  }
}

.card-footer {
  margin-top: 1.5rem;
  text-align: center;

  .website {
    font-family: 'Gulf Display', sans-serif;
    color: #FCAD51;
    font-size: clamp(16px, 3.5vw, 18px);
    margin-bottom: 0.75rem;
  }

  .disclaimer {
    font-size: clamp(8px, 2vw, 10px);
    color: #666;
    line-height: 1.4;
    padding: 0 0;

    @media (max-width: 600px) {
      padding: 0 0;
    }
  }
}
</style>
