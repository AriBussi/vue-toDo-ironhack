<script setup>
import useUserStore from '@/store/auth';
import useErrorStore from '@/store/error';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import ErrorDisplay from '@/components/ErrorDisplay.vue';

const store = useUserStore();
const errorStore = useErrorStore();
const router = useRouter();

const isRegistered = ref(true);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

watch(() => store.currentUser, () => {
  if (store.currentUser) {
    router.push({ name: 'home' });
  }
});

function register() {
  if (password.value !== confirmPassword.value) {
    errorStore.showError('Passwords do not match');
    return;
  }

  store.signUp({
    email: email.value,
    password: password.value,
  })
    // .then(router.push({ name: 'auth' }))
    .catch((er) => errorStore.showError(er));
}

function log() {
  if (!password.value) {
    errorStore.showError('Password is required');
    return;
  }

  store.logIn({
    email: email.value,
    password: password.value,
  })
    // .then(router.push({ name: 'home' }))
    .catch((er) => errorStore.showError(er));
}

</script>

<template>
    <form class="form" @submit.prevent="isRegistered ? log() : register()">
        <label for="email">
            <input
                v-model="email"
                class="form-input"
                type="email"
                placeholder="Email"
                name="email" >
        </label>
        <label for="password">
            <input
                v-model="password"
                class="form-input"
                type="password"
                placeholder="Password"
                name="set password" >
        </label>
        <label for="confirm password">
            <input
                v-if="!isRegistered"
                v-model="confirmPassword"
                class="form-input"
                type="password"
                placeholder="Confirm password"
                name="confirm password" >
        </label>

        <button
            class="btn btn--primary"
            type="submit">

            {{isRegistered ? 'Log In' : 'Register' }}

            <font-awesome-icon v-if="isRegistered" icon="fa-solid fa-right-to-bracket" size="lg" />
            <font-awesome-icon v-else icon="fa-solid fa-address-card" size="lg"/>
        </button>

        <div class="form-footer">
            <p>{{ isRegistered ? "Don't have an account?" : 'Already registered?' }}</p>
            <button class="btn btn--link" @click.prevent="isRegistered = !isRegistered">
                {{ isRegistered ? 'Register' : 'Log In'}}
            </button>
        </div>
    </form>
    <ErrorDisplay :error="errorStore.error"/>
</template>
