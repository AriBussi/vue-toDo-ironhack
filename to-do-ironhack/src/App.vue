<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import userStore from '@/store/auth';

const store = userStore();
const router = useRouter();

onMounted(async () => {
  try {
    await store.fetchUser();

    if (!store.currentUser) {
      router.push({ name: 'auth' });
    } else {
      router.push({ name: 'home' });
    }
  } catch (error) {
    console.log(error);
  }
});

async function logOut() {
  store.logOut();
  store.currentUser = null;
  router.push({ name: 'auth' });
}
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/create">Create</router-link>
    <button v-if="store.currentUser" class="ab-btn ab-btn--link" @click="logOut">Log out</button>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--neutral--dark);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: var(--neutral--dark);
}

nav a.router-link-exact-active {
  color: var(--primary);
}
</style>
