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
        <template v-slot:content v-if="searchStore.searchType === 'designs'">
            <AppDropdownItem
                @click="searchStore.sortType = 0"
                :active="searchStore.sortType === 0"
                >Latest</AppDropdownItem
            >
            <AppDropdownItem
                @click="searchStore.sortType = 1"
                :active="searchStore.sortType === 1"
                >Most Liked</AppDropdownItem
            >
        </template>
        <template v-slot:content v-else>
            <AppDropdownItem
                @click="searchStore.sortType = 0"
                :active="searchStore.sortType === 0"
                >Most Popular</AppDropdownItem
            >
            <AppDropdownItem
                v-if="searchStore.searchData.latitude !== null &&
                searchStore.searchData.longitude !== null"
                @click="searchStore.sortType = 1"
                :active="searchStore.sortType === 1"
                >Nearest</AppDropdownItem
            >
        </template>
    </AppDropdown>
</template>

<script setup>
    import { ref, watch } from "vue";
    import AppDropdownItem from "./AppDropdownItem.vue";
    import AppDropdown from "./AppDropdown.vue";
    import { useSearchStore } from "../stores/search";
    import { storeToRefs } from "pinia";

    const searchStore = useSearchStore();
    const { sortType } = storeToRefs(searchStore);

    watch(sortType, () => {
        searchStore.search();
    });
</script>

<style lang="scss" scoped></style>
