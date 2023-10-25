<template>
    <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="text-center">
            <h1 class="display-1 fw-bold">500</h1>
            <p class="fs-3">
                <span class="text-danger">Opps!</span> Somthing went wrong.
            </p>
            <p class="lead">Sorry, an Internal error has occured.</p>
            <RouterLink to="/" class="btn btn-primary">Go Home</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped></style>
