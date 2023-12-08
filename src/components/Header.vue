<template>
    <header
        class="header bg-light pt-2 pb-2"
        :class="navbarOpen ? 'navbar-open' : ''">
        <nav class="navbar navbar-light navbar-expand-sm">
            <div class="container-xl">
                <a href="/" class="navbar-brand">
                    DesignHouse
                </a>

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
                <li class="nav-item dropdown" v-else>
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <div class="profile-pic">
                            <img
                                :src="authStore.user.photo_url"
                                alt="Profile Picture" />
                        </div>
                    </a>
                    <ul
                        class="dropdown-menu user-dropdown-menu"
                        aria-labelledby="userDropdown">
                        <li class="dropdown-menu-top" @click.stop="">
                            <h5>{{ authStore.user.name }}</h5>
                        </li>
                        <li>
                            <RouterLink
                                class="pb-2 dropdown-item d-flex gap-2"
                                :to="{ name: 'upload' }">
                                Upload
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="pb-2 dropdown-item d-flex gap-2"
                                :to="{ name: 'designs' }">
                                My Designs
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="pb-2 dropdown-item d-flex gap-2"
                                :to="{ name: 'liked-designs' }">
                                Liked Designs
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="pb-2 dropdown-item d-flex gap-2"
                                :to="{ name: 'user-profile' }">
                                Settings
                            </RouterLink>
                        </li>
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                            <button
                                class="dropdown-item d-flex gap-2"
                                @click="
                                    navbarOpen = false;
                                    authStore.logout();
                                ">
                                Log Out
                            </button>
                        </li>
                    </ul>
                </li>
            </div>
        </nav>
    </header>
</template>

<script setup>
    import { ref } from "vue";
    import { RouterLink } from "vue-router";
    import { useAuthStore } from "../stores/auth";
    import { useSearchStore } from "../stores/search";

    const authStore = useAuthStore();
    const searchStore = useSearchStore();

    const navbarOpen = ref(false);
    const menu_guest = ref([
        { name: "Login", to: "/login" },
        { name: "Register", to: "/register" },
    ]);
</script>

<style lang="scss" scoped>
    .header {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .nav-link {
        color: rgb(13, 12, 34);
    }
    .navbar {
        margin-top: 0;
    }
    .nav-list {
        font-size: 18px;
        list-style: none;
        display: flex;
        gap: 8px;
        align-items: center;
        margin: 0;
    }
    .profile-pic {
        display: inline-block;
        vertical-align: middle;
        width: 55px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
    }

    .profile-pic img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
    .user-dropdown-menu {
        right: 0;
        left: unset;
    }
    .nav-item {
        list-style: none;
    }
    .toggle-change::after {
        border-top: 0;
        border-bottom: 0.3em solid;
    }
    button.dropdown-item:active {
        color: initial !important;
        background-color: initial !important;
    }
    .dropdown-menu-top {
        margin-top: 8px;
        padding-bottom: 4px;
        margin-bottom: 8px;
        border-bottom: 1px solid #bdbdbd;
        text-align: center;
    }
</style>
