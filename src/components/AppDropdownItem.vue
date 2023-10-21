<template>
    <div class="dropdown-item" :class="props.active ? 'active' : ''">
        <slot />
    </div>
</template>

<script setup>
    const props = defineProps(["active"]);
</script>

<style lang="scss" scoped>
    .dropdown-item {
        display: block;
        cursor: pointer;
        padding: 10px 15px;
        border-radius: 4px;
        transition: all 0.2s;

        &:hover,
        &:active,
        &:focus,
        &.active {
            background-color: rgba(55, 80, 155, 0.1);
        }
    }
</style>
