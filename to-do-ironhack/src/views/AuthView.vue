<script setup>
import useUserStore from '@/store/auth';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import ErrorDisplay from '@/components/ErrorDisplay.vue';

const store = useUserStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref(null);

watch(() => store.currentUser, () => {
  if (store.currentUser) {
    router.push({ path: '/' });
  }
});

function showError(er) {
  error.value = `Error: ${er}`;
  setTimeout(() => {
    error.value = null;
  }, 2000);
}

async function authenticate() {
  if (email.value === '' || password.value === '') showError('all fields must be completed');
  if (password.value !== confirmPassword.value) showError('passwords do not match');
  if (!error.value) {
    try {
      const { er } = await store.signUp({
        email: email.value,
        password: password.value,
      });
      if (er) throw error;
      router.push({ name: 'auth' });
    } catch (er) {
      showError(er.message);
    }
  }
}

</script>

<template>
    <form @submit.prevent="authenticate">
        <label for="email">
            <input
                v-model="email"
                class="ab-input"
                type="email"
                placeholder="Email"
                name="email"
                required >
        </label>
        <label for="password">
            <input
                v-model="password"
                class="ab-input"
                type="password"
                placeholder="Set password"
                name="set password"
                required >
        </label>
        <label for="confirm password">
            <input
                v-model="confirmPassword"
                class="ab-input"
                type="password"
                placeholder="Confirm password"
                name="confirm password"
                required >
        </label>

        <button class="ab-btn" @click="authenticate">Register</button>
    </form>
    <ErrorDisplay v-show="error" :error="error"/>
</template>

<style scoped>
    form {
        display: flex;
        display: flex;
        flex-direction: column;
        background: var(--neutral-light);
        max-width: 70vw;
        margin: 0 auto;
        padding: 2.5rem 1.5rem;
        border-radius: var(--border-radii);
    }
</style>
