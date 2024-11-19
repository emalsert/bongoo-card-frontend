<template>
  <container-component class="bongoo-card">
    <div class="card-header">
      <div class="number">24/25</div>
      <div class="title">
        <span class="bongoo-text">Bongoo</span>
        <span class="location">Phnom Penh</span>
      </div>
      <img src="src/assets/images/bongoo.png" alt="Bongoo mascot" class="mascot"/>
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
      <p class="website">www.carte-bongoo.com</p>
      <p class="disclaimer">This card is nominative, strictly personal and limited to 1 per person per year. Cannot be resold, exchanged or refunded. Offers valid upon presentation of ID.</p>
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
  width: 400px;
  aspect-ratio: 1.586;
  background: white;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;

  .number {
    font-size: 24px;
    font-weight: bold;
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;

    .bongoo-text {
      font-family: 'Chau Philomene One', sans-serif;
      color: #FCAD51;
      font-size: 36px;
    }

    .location {
      font-family: 'Gulf Display', sans-serif;
      color: #6573D6;
      font-size: 24px;
    }
  }

  .mascot {
    width: 60px;
    height: auto;
  }
}

.card-content {
  .field {
    margin-bottom: 20px;

    .label {
      color: #6573D6;
      font-family: 'Gulf Display', sans-serif;
      font-size: 20px;
      margin-bottom: 5px;
    }

    .input-box {
      border: 2px solid #bd5a0d;
      border-radius: 25px;
      padding: 8px 15px;
      font-size: 16px;
      background: white;
    }
  }
}

.card-footer {
  margin-top: 20px;
  text-align: center;

  .website {
    font-family: 'Gulf Display', sans-serif;
    color: #6573D6;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .disclaimer {
    font-size: 10px;
    color: #666;
  }
}
</style>
