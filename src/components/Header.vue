<template>
    <header
        class="header bg-light mb-4 padding-wrapper pt-2 pb-2"
        :class="navbarOpen ? 'navbar-open' : ''">
        <nav class="navbar navbar-light navbar-expand-sm">
            <div class="container-xl">
                <RouterLink to="/" class="navbar-brand">
                    DesignHouse
                </RouterLink>

                <ul class="nav-list" v-if="authStore.user === null">
                    <li
                        v-for="item in menu_guest"
                        :key="item.name"
                        class="nav-item my-2 text-center">
                        <RouterLink
                            @click="navbarOpen = false"
                            :to="item.to"
                            class="nav-link"
                            >{{ item.name }}</RouterLink
                        >
                    </li>
                </ul>
                <ul class="nav-list" v-else>
                    <li
                        v-for="item in menu_auth"
                        :key="item.name"
                        class="nav-item my-2 text-center">
                        <RouterLink
                            @click="navbarOpen = false"
                            :to="item.to"
                            class="nav-link"
                            >{{ item.name }}</RouterLink
                        >
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script setup>
    import { ref } from "vue";
    import { RouterLink } from "vue-router";
    import { useAuthStore } from "../stores/auth";

    const authStore = useAuthStore();

    const navbarOpen = ref(false);
    const menu_guest = ref([
        { name: "Login", to: "/login" },
        { name: "Register", to: "/register" },
    ]);
    const menu_auth = ref([{ name: "Logout", to: "/logout" }]);
</script>

<style lang="scss" scoped>
    .header {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px 0px;
    }
    .nav-link {
        color: rgb(13, 12, 34);
    }
    .navbar {
        margin-top: 0;
    }
    .navbar-brand {
        padding-left: 0;
    }
    .nav-list {
        font-size: 18px;
        list-style: none;
        display: flex;
        gap: 8px;
        align-items: center;
        margin: 0;
    }
</style>
