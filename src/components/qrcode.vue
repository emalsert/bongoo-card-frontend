<template>
  <div class="qr-container">
    <q-card class="qr-card">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="qr-content">
        <qrcode-vue
          :value="userUrl"
          :size="size"
          :level="level"
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          flat
          color="primary"
          icon="content_copy"
          label="Copy URL"
          @click="copyUrl"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { ref, onMounted } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useQuasar } from 'quasar';

export default {
  name: 'QRCodeGenerator',
  components: {
    QrcodeVue
  },
  props: {
    title: {
      type: String,
      default: 'Scan QR Code'
    },
    size: {
      type: Number,
      default: 200
    },
    level: {
      type: String,
      default: 'H'
    }
  },
  setup() {
    const authStore = useAuthStore();
    const userUrl = ref('');
    const $q = useQuasar();

    onMounted(() => {
      const userId = authStore.user?.id;
      userUrl.value = `https://bongoo-card.com/user/${userId}`;
    });

    const copyUrl = async () => {
      try {
        await navigator.clipboard.writeText(userUrl.value);
        $q.notify({
          message: 'URL copied to clipboard',
          color: 'positive',
          position: 'top'
        });
      } catch (err) {
        $q.notify({
          message: 'Failed to copy URL',
          color: 'negative',
          position: 'top'
        });
      }
    };

    return {
      userUrl,
      copyUrl
    };
  }
}
</script>

<style scoped>
.qr-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.qr-card {
  max-width: 300px;
  width: 100%;
}

.qr-content {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
