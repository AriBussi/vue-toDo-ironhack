<script setup>
import useUserStore from '@/store/auth';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

const handleSignUp = () => {
  const userData = {
    email: 'vueup@gmail.com',
    password: 'somepassword',
  };

  store.signUp(userData.email, userData.password);
};

watch(() => store.currentUser, () => {
  if (store.currentUser) {
    router.push({ path: '/' });
  }
});

</script>

<template>
    <h1>Auth view</h1>
    <button @click="handleSignUp">Register</button>
</template>
