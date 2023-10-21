<template>
    <div></div>
</template>

<script setup>
    import { useAuthStore } from "../stores/auth";

    const authStore = useAuthStore();

    authStore.logout();
</script>

<style lang="scss" scoped></style>
