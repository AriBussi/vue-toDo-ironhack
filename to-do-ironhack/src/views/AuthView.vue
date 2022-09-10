<script setup>
import useUserStore from '@/store/auth';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import ErrorDisplay from '@/components/ErrorDisplay.vue';

const store = useUserStore();
const router = useRouter();

const isRegistered = ref(true);
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
    <form class="ab-form" @submit.prevent="isRegistered ? log() : register()">
        <label for="email">
            <input
                v-model="email"
                class="ab-form-input"
                type="email"
                placeholder="Email"
                name="email" >
        </label>
        <label for="password">
            <input
                v-model="password"
                class="ab-form-input"
                type="password"
                placeholder="Password"
                name="set password" >
        </label>
        <label for="confirm password">
            <input
                v-if="!isRegistered"
                v-model="confirmPassword"
                class="ab-form-input"
                type="password"
                placeholder="Confirm password"
                name="confirm password" >
        </label>

        <button
            class="ab-btn ab-btn--primary"
            type="submit">{{isRegistered ? 'Log In' : 'Register' }}
        </button>

        <div class="ab-form-footer">
            <p>{{ isRegistered ? "Don't have an account?" : 'Already registered?' }}</p>
            <button class="ab-btn ab-btn--link" @click.prevent="isRegistered = !isRegistered">
                {{ isRegistered ? 'Register' : 'Log In'}}
            </button>
        </div>
    </form>
    <ErrorDisplay v-show="error" :error="error"/>
</template>
