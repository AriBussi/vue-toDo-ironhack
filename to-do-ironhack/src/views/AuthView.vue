<script setup>
import useUserStore from '@/store/auth';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

function handleSignUp() {
  const userData = {
    email: 'vua@gmail.com',
    password: 'somepassword',
  };

  store.signUp(userData.email, userData.password);
}

watch(() => store.currentUser, () => {
  if (store.currentUser) {
    router.push({ path: '/' });
  }
});

</script>

<template>
    <form action="register">
        <label for="email">
            <input class="ab-input" type="text" placeholder="Email" name="email" required >
        </label>
        <label for="set password">
            <input
                class="ab-input"
                type="text"
                placeholder="Set password"
                name="set password"
                required >
        </label>
        <label for="confirm password">
            <input
                class="ab-input"
                type="text"
                placeholder="Confirm password"
                name="confirm password"
                required >
        </label>

        <button class="ab-btn" @click="handleSignUp">Register</button>
    </form>
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
