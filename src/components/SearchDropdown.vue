<template>
    <AppDropdown class="search-dropdown">
        <template v-slot:toggler>
            <span v-if="searchStore.searchType === 'designs'">Designs</span>
            <span v-if="searchStore.searchType === 'designers'">Designers</span>
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
        <template #content="{ close }">
            <AppDropdownItem
                @click="
                    if (searchStore.searchType !== 'designs') {
                        searchStore.searchType = 'designs';
                        search();
                    }
                    close();
                "
                :active="searchStore.searchType === 'designs'"
                >Designs</AppDropdownItem
            >
            <AppDropdownItem
                @click="
                    if (searchStore.searchType !== 'designers') {
                        searchStore.searchType = 'designers';
                        search();
                    }
                    close();
                "
                :active="searchStore.searchType === 'designers'"
                >Designers</AppDropdownItem
            >
        </template>
    </AppDropdown>
</template>

<script setup>
    import AppDropdownItem from "./AppDropdownItem.vue";
    import AppDropdown from "./AppDropdown.vue";
    import { useSearchStore } from "../stores/search";

    const searchStore = useSearchStore();

    function search() {
        searchStore.updateType();
        searchStore.search();
    }
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
