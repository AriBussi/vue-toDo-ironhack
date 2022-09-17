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
        <router-link class="ab-nav-item" to="/">
            <font-awesome-icon icon="fa-solid fa-house" size="xl" fixed-width />
        </router-link>
        <div>
            <router-link v-if="store.currentUser" class="ab-nav-item" to="/create">
                <font-awesome-icon icon="fa-solid fa-plus" size="l" fixed-width/>
                Create
            </router-link>
            <button v-if="store.currentUser"
                class="ab-btn ab-btn--link ab-nav-item"
                @click="logOut">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" size="l" fixed-width />
                Log Out
            </button>
        </div>
    </nav>
</template>

<style scoped>
nav {
    padding: .5rem;
    min-height: 3.1rem;
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background-color: var(--white);
    align-items: center;
    box-shadow: 0px 2px 4px 0px rgb(60 60 60 / 5%);
}

nav div {
    text-align: right;
    flex-grow: 1;
}

.ab-nav-item {
    color: var(--primary);
    font-weight: var(--weight-bold);
    text-decoration: none;
    font-size: .8rem;
    transition: color var(--transition--soft);
}

.ab-nav-item:hover {
    color: var(--neutral-dark);
}
</style>
