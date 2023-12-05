<template>
    <div class="container-xl mt-4">
        <h1 class="primary-header">Explore Designs And Designers</h1>
        <SearchForm />
        <div class="row filter-section my-4">
            <div class="col filter-section__left d-none d-sm-flex">
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
                :class="{
                    'd-block': show_filters,
                    'd-none': !show_filters,
                }">
                <FilterForm />
            </div>
        </div>
        <template v-if="!searchStore.isLoading">
            <div class="row" v-if="searchStore.searchType === 'designs'">
                <template v-if="searchStore.designs.length > 0">
                    <div
                        class="col-lg-4 col-md-4 col-sm-6 col-12"
                        v-for="design in searchStore.designs"
                        :key="design.id">
                        <DesignBox
                            :design="design"
                            @like-design="like"
                            :currentlyLiking="currentlyLiking" />
                    </div>
                    <div class="row infinite-scroll">
                        <InfiniteLoading
                            spinner="waveDots"
                            @infinite="loadDesigns">
                            <template #complete>
                                <span></span>
                            </template>
                        </InfiniteLoading>
                    </div>
                </template>
                <div v-else>
                    <h2 class="no-results">
                        Sorry, we couldn't find any results
                    </h2>
                </div>
            </div>
            <div class="row" v-else>
                <template v-if="searchStore.designers.length > 0">
                    <div
                        class="col-lg-3 col-sm-6 col-12 mb-4"
                        v-for="designer in searchStore.designers"
                        :key="designer.id">
                        <DesignerBox :designer="designer"></DesignerBox>
                    </div>
                    <div class="row infinite-scroll">
                        <InfiniteLoading
                            spinner="waveDots"
                            @infinite="loadDesigns">
                            <template #complete>
                                <span></span>
                            </template>
                        </InfiniteLoading>
                    </div>
                </template>
                <div v-else>
                    <h2 class="no-results">
                        Sorry, we couldn't find any results
                    </h2>
                </div>
            </div>
        </template>
        <template v-else>
            <div id="loading">
                <svg
                    width="38"
                    height="38"
                    stroke="#000"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <circle
                            cx="12"
                            cy="12"
                            r="9.5"
                            fill="none"
                            stroke-width="3"
                            stroke-linecap="round">
                            <animate
                                attributeName="stroke-dasharray"
                                dur="1.5s"
                                calcMode="spline"
                                values="0 150;42 150;42 150;42 150"
                                keyTimes="0;0.475;0.95;1"
                                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                repeatCount="indefinite" />
                            <animate
                                attributeName="stroke-dashoffset"
                                dur="1.5s"
                                calcMode="spline"
                                values="0;-16;-59;-59"
                                keyTimes="0;0.475;0.95;1"
                                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                repeatCount="indefinite" />
                        </circle>
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            dur="1s"
                            values="0 12 12;360 12 12"
                            repeatCount="indefinite" />
                    </g>
                </svg>
            </div>
        </template>
        <Teleport to="body">
            <LoginRequiredModal :show="showModal" @close="showModal = false" />
        </Teleport>
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
    import LoginRequiredModal from "../components/LoginRequiredModal.vue";
    import { like_design } from "../helpers/design";
    import { useAuthStore } from "../stores/auth";
    import { useSearchStore } from "../stores/search";
    import InfiniteLoading from "v3-infinite-loading";
    import "v3-infinite-loading/lib/style.css";

    const authStore = useAuthStore();
    const searchStore = useSearchStore();

    const show_filters = ref(false);
    const currentlyLiking = ref([]);

    const showModal = ref(false);

    onMounted(async () => {
        await authStore.getUser();
        searchStore.updateState();
        show_filters.value =
            searchStore.openDesignsFilter || searchStore.openDesignersFilter;
        await searchStore.search();
    });

    async function like(design) {
        if (authStore.isLoggedIn) {
            currentlyLiking.value.push(design.id);
            const res = await like_design(design.id);
            // display loader
            currentlyLiking.value.splice(
                currentlyLiking.value.indexOf(design.id),
                1
            );
            if (res.ok) {
                // update design
                if (design.liked) {
                    // dislike
                    design.liked = false;
                    design.likes--;
                } else {
                    // like
                    design.liked = true;
                    design.likes++;
                }
            }
        }else {
            showModal.value = true;
        }
    }

    async function loadDesigns($state) {
        searchStore.loadNextPage($state);
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
    #loading {
        background-color: white;
        text-align: center;
        margin-top: 70px;
        margin-bottom: 70px;
        margin-right: auto;
        margin-left: auto;
        text-align: center;
        width: 100%;
    }
    .no-results {
        color: #505050;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>

<style lang="scss">
    .infinite-scroll {
        .container {
            overflow: initial;
            height: 85px;
            position: relative;

            .spinner {
                position: absolute;
                top: 37%;
                left: 50%;
            }
        }
    }
</style>
