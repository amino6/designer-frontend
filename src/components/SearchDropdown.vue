<template>
    <AppDropdown class="search-dropdown">
        <template v-slot:toggler>
            <span>Designs</span>
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
            <AppDropdownItem :active="true">Designs</AppDropdownItem>
            <AppDropdownItem>Designers</AppDropdownItem>
        </template>
    </AppDropdown>
</template>

<script setup>
    import AppDropdownItem from "./AppDropdownItem.vue";
    import AppDropdown from "./AppDropdown.vue";
</script>

<style lang="scss">
    .dopdown-wrapper.search-dropdown {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 100%;
        border: 1px solid transparent;

        .toggler {
            background: transparent;
            border-left: 1px solid #d6d6d6;
            height: 100%;
            box-shadow: none;
            width: 140px;
        }
    }
</style>
