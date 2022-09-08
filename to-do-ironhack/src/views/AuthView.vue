<script setup>
import useUserStore from '@/store/auth';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import ErrorDisplay from '@/components/ErrorDisplay.vue';

const store = useUserStore();
const router = useRouter();

const isRegistered = ref(false);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref(null);

watch(() => store.currentUser, () => {
  if (store.currentUser) {
    router.push({ name: 'home' });
  }
});

function showError(er) {
  error.value = `Error: ${er}`;
  setTimeout(() => {
    error.value = null;
  }, 2000);
}

async function register() {
  if (password.value === confirmPassword.value) {
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
    return;
  }

  showError('passwords do not match');
}

async function log() {
  try {
    const { er } = await store.logIn({
      email: email.value,
      password: password.value,
    });
    if (er) throw error;
    router.push({ name: 'auth' });
  } catch (er) {
    console.log(er);
    showError(er.message);
  }
}

</script>

<template>
    <form @submit.prevent="isRegistered ? register() : log()">
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
                v-if="isRegistered"
                v-model="confirmPassword"
                class="ab-input"
                type="password"
                placeholder="Confirm password"
                name="confirm password"
                required >
        </label>

        <button
            class="ab-btn ab-btn--primary"
            type="submit">{{isRegistered ? 'Register' : 'Log In' }}
        </button>

        <div class="footer">
            <p>{{ isRegistered ? 'Already registered?' : "Don't have an account?" }}</p>
            <button class="ab-btn ab-btn--link" @click="isRegistered = !isRegistered">
                {{ isRegistered ? 'Log In' : 'Register' }}
            </button>
        </div>
    </form>
    <ErrorDisplay v-show="error" :error="error"/>
</template>

<style scoped>
    form {
        display: flex;
        display: flex;
        flex-direction: column;
        background: var(--neutral--light);
        max-width: 70vw;
        margin: 0 auto;
        padding: 2.5rem 1.5rem 1rem 1.5rem;
        border-radius: var(--border-radii);
    }

    .footer {
        display: flex;
        justify-content: center;
        align-items: baseline;
        font-size: .8rem;
    }
</style>
