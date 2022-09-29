<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import userStore from '@/store/auth';
import MainNavigation from '@/components/MainNavigation.vue';

const store = userStore();
const router = useRouter();

onBeforeMount(async () => {
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
</template>

<style>
#app {
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--neutral--dark);
  margin: 4.2rem auto 0 auto;
}

main {
  min-height: calc(100vh - 5.9rem);
}

@media (min-width: 500px) {
  #app {
    margin-left: .5rem;
    margin-right: .5rem;
  }
}

@media (min-width: 500px) {
  #app {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
