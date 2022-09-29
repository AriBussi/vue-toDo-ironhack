<script setup>
import { useRouter } from 'vue-router';
import userStore from '@/store/auth';
import TaskFilters from './TaskFilters.vue';

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
    <div>
        <router-link class="nav-item logo" to="home">
            <font-awesome-icon icon="fa-solid fa-house" size="xl" fixed-width />
        </router-link>
        <div class="controls" v-if="store.currentUser" >
            <TaskFilters class="btn btn--link nav-item" />

            <router-link class="nav-item" to="/create">
                <font-awesome-icon icon="fa-solid fa-plus" size="lg" fixed-width/>
                Create
            </router-link>

            <button
                class="btn btn--link nav-item"
                @click="logOut">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" size="lg" fixed-width />
                Log out
            </button>
        </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
    display: flex;
    padding: .5rem;
    min-height: 3.1rem;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background-color: var(--white);
    box-shadow: 0px 2px 4px 0px rgb(60 60 60 / 5%);
}

nav > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    max-width: var(--layout-width);
}

.controls {
    text-align: right;
    flex-grow: 1;
}

.nav-item {
    color: var(--primary);
    font-weight: var(--weight-bold);
    text-decoration: none;
    font-size: .8rem;
    transition: color var(--transition--soft);
    margin-right: .5rem;
    padding: 0;
}

.logo {
    margin-left: 1rem;
}

.nav-item:hover {
    color: var(--neutral-dark);
}

@media (min-width: 500px) {
    .nav-item {
        margin-right: 1.2rem;
    }
}
</style>
