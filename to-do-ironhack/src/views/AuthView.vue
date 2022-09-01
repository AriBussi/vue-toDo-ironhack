<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/auth';

export default {
  name: 'AuthView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      const userData = {
        email: 'lala@lala.com',
        password: '123456',
      };

      this.signUp(userData.email, userData.password);
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>

<template>
    <h1>Auth view</h1>
    <button @click="handleSignUp">Register</button>
</template>
