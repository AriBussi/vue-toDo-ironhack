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
  error.value = er;
  setTimeout(() => {
    error.value = null;
  }, 4000);
}

function register() {
  if (password.value !== confirmPassword.value) {
    showError('Passwords do not match');
    return;
  }

  store.signUp({
    email: email.value,
    password: password.value,
  })
    // .then(router.push({ name: 'auth' }))
    .catch((er) => showError(er));
}

function log() {
  if (!password.value) {
    showError('Password is required');
    return;
  }

  store.logIn({
    email: email.value,
    password: password.value,
  })
    // .then(router.push({ name: 'home' }))
    .catch((er) => showError(er));
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
            type="submit">

            {{isRegistered ? 'Log In' : 'Register' }}
        </button>

        <div class="ab-form-footer">
            <p>{{ isRegistered ? "Don't have an account?" : 'Already registered?' }}</p>
            <button class="ab-btn ab-btn--link" @click.prevent="isRegistered = !isRegistered">
              <font-awesome-icon v-if="isRegistered" icon="fa-solid fa-address-card" size="lg" />
              <font-awesome-icon v-else icon="fa-solid fa-right-to-bracket" size="lg"/>
                {{ isRegistered ? 'Register' : 'Log In'}}
            </button>
        </div>
    </form>
    <ErrorDisplay :error="error"/>
</template>
