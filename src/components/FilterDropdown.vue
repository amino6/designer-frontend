<template>
    <AppDropdown>
        <template v-slot:toggler>
            <span>Sort</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                class="Lm0mf">
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.6"
                    d="m4.118 5.766 4 4.235 4-4.235"></path>
            </svg>
        </template>
        <template v-slot:content>
            <AppDropdownItem :active="true">Latest</AppDropdownItem>
            <AppDropdownItem>Most Liked</AppDropdownItem>
        </template>
    </AppDropdown>
</template>

<script setup>
    import AppDropdownItem from "./AppDropdownItem.vue";
    import AppDropdown from "./AppDropdown.vue";
</script>

<style lang="scss" scoped></style>
