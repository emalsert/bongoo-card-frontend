// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from 'stores/auth'; // Ajustez le chemin si nécessaire

// Layouts
import DefaultLayout from 'layouts/DefaultLayout.vue';
import AdminLayout from 'layouts/AdminLayout.vue';

// Pages
import Signup from 'pages/Signup.vue';
import Login from 'pages/Login.vue';
import Home from 'pages/Home.vue';
import UserProfile from 'pages/user/_id.vue';
import UserCard from 'pages/user/card.vue';
import ManageOffers from 'pages/admin/ManageOffers.vue'; // Page admin
import ManageUsers from 'pages/admin/ManageUsers.vue';
import UnauthorizedCompo from 'pages/unauthorized.vue'; // Page pour accès non autorisé
import OffersPage from "pages/OffersPage.vue";

// Catch-all
import ErrorNotFound from 'pages/ErrorNotFound.vue';



const routes = [
  // Routes sans layout
  { path: '/signup', component: Signup },
  { path: '/login', component: Login },

  // Routes avec le layout par défaut
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', redirect: '/home' },
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'offers',
        component: OffersPage,
      },
      {
        path: 'user/:id',
        name: 'userProfile',
        component: UserProfile,
      },
      {
        path: 'user/card',
        name: 'UserCard',
        component: UserCard,
        meta: { requiresAuth: true },
      },
      // Ajoutez d'autres routes qui nécessitent le layout par défaut ici
    ],
  },

  // Routes admin
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'manage-offers',
        name: 'ManageOffers',
        component: ManageOffers,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'manage-users',
        name: 'ManageUsers',
        component: ManageUsers,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      // Ajoutez d'autres routes admin ici
    ],
  },

  // Page d'accès non autorisé
  { path: '/unauthorized', component: UnauthorizedCompo },

  // Page non trouvée
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware de protection des routes
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  console.log('Navigating to:', to.fullPath);

  // Vérifiez l'état d'authentification
  const isAuthenticated = await authStore.checkAuth();
  const userRole = authStore.user?.role;

  console.log('User:', authStore.user);
  console.log('Route target:', to.path);
  console.log('Meta:', to.meta);
  console.log('isAuthenticated:', isAuthenticated);
  console.log('userRole:', userRole);

  // Vérifiez si la route ou l'une de ses parents nécessite une authentification
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
  const requiresAdmin = to.matched.some(route => route.meta.requiresAdmin);

  if (requiresAuth && !isAuthenticated) {
    console.log(`Redirecting to /login because the route ${to.fullPath} requires authentication`);
    localStorage.setItem('test2', `Redirecting to /login because the route ${to.fullPath} requires authentication`);
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else if (requiresAdmin && userRole !== 'admin') {
    console.log(`Redirecting to /unauthorized because the route ${to.fullPath} requires admin privileges`);
    next({ path: '/unauthorized' });
  } else {
    next();
  }
});

export default router;





