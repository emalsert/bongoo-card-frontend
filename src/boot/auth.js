// src/boot/auth.js

import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth';

export default boot(({ app, router }) => {
  const authStore = useAuthStore();

});
