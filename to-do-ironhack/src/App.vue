<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import userStore from '@/store/auth';
import MainNavigation from '@/components/MainNavigation.vue';
import TheFooter from '@/components/TheFooter.vue';

const store = userStore();
const router = useRouter();

onMounted(async () => {
  await store.fetchUser();

  if (!store.currentUser) {
    router.push({ name: 'auth' });
  }
});
</script>

<template>
  <MainNavigation />
  <main>
    <router-view/>
  </main>
  <TheFooter />
</template>

<style>
#app {
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--neutral--dark);
  margin-top: 3.5rem;
}

main {
  min-height: calc(100vh - 5.9rem);
}
</style>
