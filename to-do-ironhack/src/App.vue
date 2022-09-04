<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import userStore from '@/store/auth';
import NavBar from '@/components/NavBar.vue';

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
  <NavBar />
  <button @click="store.logOut">Log out</button>
  <router-view/>
</template>

<style>
:root {
  --primary: #b9dacd;
  --neutral-light: #ebebeb;
  --neutral-dark: #404953;
  --danger: #ff3200;
}

html {
  font-size: 20px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--neutral-dark);
}
</style>
