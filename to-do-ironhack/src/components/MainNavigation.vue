<script setup>
import { useRouter } from 'vue-router';
import userStore from '@/store/auth';

const store = userStore();
const router = useRouter();

async function logOut() {
  store.logOut();
  store.currentUser = null;
  router.push({ name: 'auth' });
}
</script>

<template>
    <nav>
        <router-link to="/">
            <font-awesome-icon icon="fa-solid fa-house" size="l" fixed-width />
        </router-link>
        <div>
            <router-link v-if="store.currentUser" to="/create">
                <font-awesome-icon icon="fa-solid fa-plus" size="l" fixed-width/>
            </router-link>
            <button v-if="store.currentUser"
                class="ab-btn ab-btn--link"
                @click="logOut">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" size="xl" fixed-width />
            </button>
        </div>
    </nav>
</template>

<style>
nav {
    padding: .5rem;
    display: flex;
}

nav a {
    font-weight: bold;
    color: var(--neutral--dark);
}

nav a.router-link-exact-active {
    color: var(--primary);
}

nav div {
    text-align: right;
    flex-grow: 1;
}
</style>
