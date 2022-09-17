<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import userStore from '@/store/auth';
import MainNavigation from '@/components/MainNavigation.vue';

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
</script>

<template>
  <MainNavigation />
  <router-view/>
</template>

<style>
#app {
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--neutral--dark);
  max-height: 100vh;
}
</style>
