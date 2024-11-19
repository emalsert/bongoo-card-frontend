<template>
  <q-header class="bg-white text-black">
    <q-toolbar class="navbar">
      <!-- Logo -->
      <div class="logo">
        <q-img src="/images/bongoo.png" height="40px" class="logonav" alt="Logo Bongoo" />
      </div>

      <!-- Mobile Menu Button -->
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        class="mobile-menu"
        @click="toggleMenu"
        display="lt-md"
      />

      <!-- Desktop Navigation Links -->
      <div class="desktop-menu nav-links" v-if="!menuOpen" display="gt-sm">
        <div class="nav-links">
          <q-btn
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            flat
            class="nav-item"
          >
            {{ link.label }}
          </q-btn>
        </div>
      </div>

      <!-- Mobile Drawer Menu -->
      <q-drawer v-model="menuOpen" side="left" bordered class="mobile-drawer">
        <ScrollingBanner class="scrolling-banner lt-md" />
        <q-list>
          <q-item
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            clickable
            @click="closeMenu"
          >
            <q-item-section>
              <q-item-label>{{ link.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </q-toolbar>
  </q-header>
</template>

<script>
import { ref } from 'vue';
import ScrollingBanner from './ScrollingBanner.vue';

export default {
  name: 'NavbarCompo',
  components: {
    ScrollingBanner,
  },
  setup() {
    const menuOpen = ref(false);

    const navLinks = [
      { to: '/', label: 'Bongoo' },
      { to: '/get-it', label: 'Get It!' },
      { to: '/offers', label: 'Offers' },
      { to: '/faq', label: 'FAQ' },
    ];

    function toggleMenu() {
      menuOpen.value = !menuOpen.value;
    }

    function closeMenu() {
      menuOpen.value = false;
    }

    return {
      menuOpen,
      navLinks,
      toggleMenu,
      closeMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0 20px;
  height: 64px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  .logo {
    transition: transform 0.5s ease-in-out;
    &:hover {
      transform: rotate(360deg);
    }
  }
}

.nav-links {
  display: flex;
  align-items: center;

  .nav-item {
    color: #6573d6;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 0 10px;
    text-transform: uppercase;

    &:hover {
      color: #fdae51;
    }
  }
}

.mobile-menu {
  display: none;
}

// Desktop specific styles
@media (min-width: 769px) {
  .scrolling-banner {
    display: none;
  }

  .mobile-drawer {
    display: none;
  }
}

// Mobile specific styles
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .mobile-menu {
    display: block;
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .mobile-drawer {
    .q-item {
      padding: 12px 20px;
      font-size: 1.2rem;
      color: #6573d6;
      font-weight: bold;

      &:hover {
        color: #fdae51;
      }
    }

    .q-list {
      padding-top: 20px;
    }
  }
}
</style>

