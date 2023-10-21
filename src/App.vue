<template>
    <div class="layout">
        <Header />
        <RouterView />
        <Footer />
    </div>
</template>

<script setup>
    import { RouterLink, RouterView } from "vue-router";
    import Header from "./components/Header.vue";
    import Footer from "./components/Footer.vue";
</script>

<style>
    header {
        line-height: 1.5;
        max-height: 100vh;
    }

    .logo {
        display: block;
        margin: 0 auto 20px;
    }

    nav {
        width: 100%;
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
    }

    nav a.router-link-exact-active {
        color: var(--color-text);
    }

    nav a.router-link-exact-active:hover {
        background-color: transparent;
    }

    nav a {
        display: inline-block;
        padding: 0 10px;
        border-left: 1px solid var(--color-border);
    }

    nav a:first-of-type {
        border: 0;
    }

    @media (min-width: 1024px) {
        header {
            display: flex;
            place-items: center;
            padding-right: calc(var(--section-gap) / 2);
        }

        .logo {
            margin: 0 20px 0 0;
        }

        header .wrapper {
            display: flex;
            place-items: flex-start;
            flex-wrap: wrap;
        }

        nav {
            text-align: left;
            margin-left: -10px;
            font-size: 10px;

            padding: 10px 0;
            margin-top: 10px;
        }
    }
</style>
