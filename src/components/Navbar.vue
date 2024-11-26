<template>
  <q-header class="bg-white text-black">
    <q-toolbar class="navbar">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/" class="logo-link">
          <q-img
            src="https://res.cloudinary.com/doyo6tvky/image/upload/v1732441631/nfabcignygjtb6kwqoa2.png"
            height="40px"
            width="40px"
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
        </router-link>
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
        color="primary"
      />

      <!-- Desktop Navigation Links -->
      <div class="desktop-menu nav-links" v-if="!menuOpen">
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
          <q-btn
            to="/user/card"
            class="my-card-btn"
            unelevated
          >
            My Card
          </q-btn>
        </div>
      </div>

      <!-- Mobile Menu Overlay -->
      <div
        v-if="menuOpen"
        class="mobile-menu-overlay"
        @click="closeMenu"
      ></div>

      <!-- Mobile Menu Content -->
      <div
        class="mobile-menu-content"
        :class="{ 'mobile-menu-open': menuOpen }"
      >
        <ScrollingBanner class="scrolling-banner" />
        <div class="mobile-nav-links">
          <q-btn
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            flat
            class="mobile-nav-item"
            @click="closeMenu"
          >
            {{ link.label }}
          </q-btn>
          <q-btn
            to="/user/card"
            class="mobile-my-card-btn"
            @click="closeMenu"
            unelevated
          >
            My Card
          </q-btn>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { ref } from 'vue';
import ScrollingBanner from './ScrollingBanner.vue';
import { QImg } from 'quasar';

export default {
  name: 'NavbarCompo',
  components: {
    ScrollingBanner,
    QImg
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
      if (menuOpen.value) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    function closeMenu() {
      menuOpen.value = false;
      document.body.style.overflow = '';
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
  position: relative;

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
  margin-left: auto;

  .nav-item {
    color: #6573d6;
    font-weight: bold;
    font-family: 'Chau Philomene One', sans-serif;
    font-size: 1.2rem;
    margin: 0 10px;
    text-transform: uppercase;

    &:hover {
      color: #fdae51;
    }
  }

  .my-card-btn {
    background: #FCAD51;
    color: white;
    border-radius: 20px;
    padding: 5px 15px;
    margin-left: 15px;
    font-weight: bold;
    font-family: 'Chau Philomene One', sans-serif;
    text-transform: uppercase;
    transition: transform 0.3s ease;
    font-size: 1.2rem;

    &:hover {
      transform: scale(1.05);
      background: #fd9e31;
    }
  }
}

.mobile-menu {
  display: none;
}

// Mobile Menu Overlay
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

// Mobile Menu Content
.mobile-menu-content {
  position: fixed;
  top: 0;
  left: -100%;
  width: 80%;
  max-width: 300px;
  height: auto;
  background-color: white;
  z-index: 1000;
  border-radius: 0 20px 20px 0;
  padding: 20px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease-in-out;

  &.mobile-menu-open {
    left: 0;
  }

  .scrolling-banner {
    margin-bottom: 20px;
  }

  .mobile-nav-links {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .mobile-nav-item {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      background-color: #f5f5f5;
      color: #6573d6;
      font-weight: bold;
      font-family: 'Chau Philomene One', sans-serif;
      font-size: 1.2rem;
      text-transform: uppercase;
      text-align: left;
      transition: all 0.3s ease;

      &:hover {
        background-color: #6573d6;
        color: white;
        transform: translateX(10px);
      }
    }

    .mobile-my-card-btn {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      background: #FCAD51;
      color: white;
      font-weight: bold;
      font-family: 'Chau Philomene One', sans-serif;
      font-size: 1.2rem;
      text-transform: uppercase;
      text-align: left;
      transition: all 0.3s ease;
      margin-top: 10px;

      &:hover {
        background: #fd9e31;
        transform: translateX(10px);
      }
    }
  }
}

// Desktop specific styles
@media (min-width: 769px) {
  .mobile-menu-content,
  .mobile-menu-overlay {
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
    margin-left: auto;
  }
}
</style>


