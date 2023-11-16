<template>
    <div class="container-xl mt-4">
        <h1 class="primary-header">Explore Designs And Designers</h1>
        <SearchForm />
        <div class="row filter-section my-4">
            <div class="col filter-section__left d-none d-sm-flex">
                <!-- <ul class="tags">
                    <li class="tag active">
                        <RouterLink to="/" class="tag-item">tag 1</RouterLink>
                    </li>
                    <li class="tag">
                        <RouterLink to="/" class="tag-item">tag 1</RouterLink>
                    </li>
                    <li class="tag">
                        <RouterLink to="/" class="tag-item">tag 1</RouterLink>
                    </li>
                    <li class="tag">
                        <RouterLink to="/" class="tag-item">tag 1</RouterLink>
                    </li>
                </ul> -->
                <button
                    type="button"
                    class="toggle-filters btn p-0"
                    @click="show_filters = !show_filters">
                    <i class="bi bi-filter"></i> Filters
                </button>
            </div>
            <div class="col filter-section__right">
                <FilterDropdown />
            </div>
            <div
                class="col-12 mt-4"
                :class="{ 'd-block': show_filters, 'd-none': !show_filters }">
                <FilterForm />
            </div>
        </div>
        <div class="row" v-if="searchStore.searchType === 'designs'">
            <div
                class="col-lg-3 col-md-4 col-sm-6 col-12"
                v-for="design in searchStore.designs"
                :key="design.id">
                <DesignBox
                    :design="design"
                    @like-design="like"
                    :currentlyLiking="currentlyLiking" />
            </div>
        </div>
        <div class="row" v-else>
            <div
                class="col-lg-3 col-sm-6 col-12 mb-4"
                v-for="designer in searchStore.designers"
                :key="designer.id">
                <DesignerBox :designer="designer"></DesignerBox>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { RouterLink } from "vue-router";
    import SearchForm from "../components/SearchForm.vue";
    import FilterDropdown from "../components/FilterDropdown.vue";
    import DesignBox from "../components/DesignBox.vue";
    import DesignerBox from "../components/DesignerBox.vue";
    import FilterForm from "../components/FilterForm.vue";
    import { like_design } from "../helpers/design";
    import { useAuthStore } from "../stores/auth";
    import { useSearchStore } from "../stores/search";

    const authStore = useAuthStore();
    const searchStore = useSearchStore();

    const show_filters = ref(false);
    const currentlyLiking = ref([]);

    onMounted(async () => {
        await authStore.getUser();
        searchStore.updateState();
        await searchStore.search();
    });

    async function like(design_id) {
        currentlyLiking.value.push(design_id);
        await like_design(design_id);
        await searchStore.search();
        currentlyLiking.value.splice(currentlyLiking.value.indexOf(design_id), 1);
    }
</script>

<style lang="scss" scoped>
    .toggle-filters,
    .toggle-filters:focus {
        background: rgba(55, 80, 155, 0.1);
        border-radius: 3px;
        box-shadow: inset 0 0 0 1px rgba(55, 80, 155, 0.1);
        display: inline-flex;
        align-items: center;
        justify-content: space-evenly;
        position: relative;
        padding: 5px;
        width: 100px;
        cursor: pointer;
    }

    .toggle-filters:focus {
        border: 1px solid #000;
    }
    .primary-header {
        font-size: 50px;
        text-align: center;
        margin-top: 50px;
        color: #0d0c22;
        font-weight: 400;
        letter-spacing: 2px;
    }

    .filter-section {
        &__right {
            text-align: right;
        }
    }

    .tags {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        padding: 0;
        gap: 12px;

        .tag {
            display: inline-block;
            border-radius: 5px;
            border: 1px solid #d6d6d6;
            transition: all 0.2s;

            &-item {
                padding: 2px 10px;
                color: inherit;
            }

            &:hover {
                background-color: rgba(55, 80, 155, 0.03);
                border-color: #969696;
            }

            &.active,
            &.active:hover {
                background-color: rgba(55, 80, 155, 0.1);
                border-color: #969696;
            }
        }
    }
</style>
