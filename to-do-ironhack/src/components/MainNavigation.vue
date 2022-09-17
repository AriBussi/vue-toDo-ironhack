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
        <router-link to="/">Home</router-link>
        <div>
            <router-link to="/create">Create</router-link>
            <button v-if="store.currentUser"
                class="ab-btn ab-btn--link"
                @click="logOut">Log out</button>
        </div>
    </nav>
</template>

<style>
nav {
    padding: 30px;
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
