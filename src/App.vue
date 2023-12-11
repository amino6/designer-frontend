<template>
    <div class="layout">
        <vue-progress-bar></vue-progress-bar>
        <Header />
        <RouterView />
        <Footer />
    </div>
</template>

<script>
    import { RouterView } from "vue-router";
    import Header from "./components/Header.vue";
    import Footer from "./components/Footer.vue";
    import { useSearchStore } from "./stores/search";

    export default {
        mounted() {
            this.$Progress.finish();
        },
        created() {
            this.$Progress.start();

            this.$router.beforeEach((to, from, next) => {
                const searchStore = useSearchStore();

                if (to.name !== "home") {
                    searchStore.replace_url = false;
                } else {
                    searchStore.replace_url = true;
                }

                if (to.meta.progress !== undefined) {
                    let meta = to.meta.progress;
                    this.$Progress.parseMeta(meta);
                }
                this.$Progress.start();
                next();
            });
            this.$router.afterEach((to, from) => {
                this.$Progress.finish();
            });
        },
        components: {
            RouterView,
            Header,
            Footer,
        },
    };
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
