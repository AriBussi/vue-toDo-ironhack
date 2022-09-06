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
      router.push({ path: '/auth' });
    } else {
      router.push({ path: '/' });
    }
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <nav>
      <router-link to="/">Home</router-link>
      <button class="ab-btn" @click="store.logOut">Log out</button>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--neutral-dark);
}

nav {
    padding: 30px;
}

nav a {
font-weight: bold;
color: var(--neutral-dark);
}

nav a.router-link-exact-active {
color: var(--primary);
}
</style>
