<template>
    <form
        class="row g-3 align-items-center"
        @submit.prevent=""
        v-if="searchStore.searchType === 'designs'">
        <div class="col-md-6">
            <label class="visually-hidden" for="tags">Tags</label>
            <div class="input-group">
                <div class="input-group-text">
                    <i class="bi bi-search"></i>
                </div>
                <input
                    type="text"
                    class="form-control"
                    id="tags"
                    placeholder="Tags"
                    v-model="searchStore.tags"
                    @keydown.enter="searchStore.search()" />
            </div>
        </div>

        <div class="col-md-3 col-6">
            <div
                class="form-check d-flex align-items-center justify-content-center">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="has_comments"
                    true-value="1"
                    false-value="0"
                    @change="searchStore.search()"
                    v-model="searchStore.searchData.has_comments" />
                <label class="form-check-label px-2" for="has_comments">
                    has comments
                </label>
            </div>
        </div>

        <div class="col-md-3 col-6">
            <div
                class="form-check d-flex align-items-center justify-content-center">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="has_team"
                    true-value="1"
                    false-value="0"
                    @change="searchStore.search()"
                    v-model="searchStore.searchData.has_team" />
                <label class="form-check-label px-2" for="has_team">
                    has team
                </label>
            </div>
        </div>
    </form>
    <form class="row g-3 align-items-center" @submit.prevent="" v-else>
        <div class="col-md-6">
            <label class="visually-hidden" for="range">Range</label>
            <div class="input-group">
                <div
                    v-if="
                        searchStore.searchData.latitude === null &&
                        searchStore.searchData.longitude === null
                    "
                    class="input-group-text tooltipC"
                    style="cursor: pointer"
                    @click="getCurrentLocation">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-crosshair2"
                        viewBox="0 0 16 16">
                        <path
                            d="M8 0a.5.5 0 0 1 .5.5v.518A7.001 7.001 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7.001 7.001 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7.001 7.001 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7.001 7.001 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0Zm-.5 2.02A6.001 6.001 0 0 0 2.02 7.5h1.005A5.002 5.002 0 0 1 7.5 3.025V2.02Zm1 1.005A5.002 5.002 0 0 1 12.975 7.5h1.005A6.001 6.001 0 0 0 8.5 2.02v1.005ZM12.975 8.5A5.002 5.002 0 0 1 8.5 12.975v1.005a6.002 6.002 0 0 0 5.48-5.48h-1.005ZM7.5 12.975A5.002 5.002 0 0 1 3.025 8.5H2.02a6.001 6.001 0 0 0 5.48 5.48v-1.005ZM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                    </svg>
                    <span class="tooltipCtext">Get Current Location</span>
                </div>
                <div
                    v-else
                    class="input-group-text tooltipC"
                    style="cursor: pointer"
                    @click="resetLocationInfo">
                    <i class="bi bi-x-lg" style="color: red"></i>
                    <span class="tooltipCtext">Remove location filter</span>
                </div>
                <input
                    type="number"
                    min="0"
                    class="form-control"
                    id="range"
                    :placeholder="loading ? 'Please Wait...' : 'Range'"
                    :disabled="
                        searchStore.searchData.latitude == null ||
                        searchStore.searchData.longitude == null
                    "
                    :class="{
                        disabled:
                            searchStore.searchData.latitude == null ||
                            searchStore.searchData.longitude == null,
                    }"
                    v-model="searchStore.searchData.distance"
                    @keydown.enter="searchStore.search()" />
                <div class="input-group-text" style="padding-right: 0">
                    <select
                        v-model="searchStore.searchData.unit"
                        class="form-select shadow-none bg-light border-0"
                        style="padding-left: 0; padding-right: 31px">
                        <option>Km</option>
                        <option>Mile</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="col-md-3 col-6">
            <div
                class="form-check d-flex align-items-center justify-content-center">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="has_comments"
                    true-value="1"
                    false-value="0"
                    @change="searchStore.search()"
                    v-model="searchStore.searchData.available_to_hire" />
                <label class="form-check-label px-2" for="has_comments">
                    available to hire
                </label>
            </div>
        </div>

        <div class="col-md-3 col-6">
            <div
                class="form-check d-flex align-items-center justify-content-center">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="has_team"
                    true-value="1"
                    false-value="0"
                    @change="searchStore.search()"
                    v-model="searchStore.searchData.has_designs" />
                <label class="form-check-label px-2" for="has_team">
                    has designs
                </label>
            </div>
        </div>
    </form>
</template>

<script setup>
    import { ref } from "vue";
    import { useSearchStore } from "../stores/search";

    const searchStore = useSearchStore();
    const loading = ref(false);

    function getCurrentLocation() {
        loading.value = true;
        const options = {
            enableHighAccuracy: false,
        };
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                searchStore.searchData.latitude = latitude;
                searchStore.searchData.longitude = longitude;

                loading.value = false;

                searchStore.search();
            },
            err => {
                console.error(err);
                loading.value = false;
            },
            options
        );
    }

    function resetLocationInfo() {
        searchStore.resetLocationInfo();
        searchStore.search();
    }
</script>

<style lang="scss" scoped>
    .tooltipC {
        position: relative;
    }
    .tooltipC .tooltipCtext {
        background-color: black;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        display: inline-block;
        visibility: hidden;
        opacity: 0;
        padding: 3px 15px;
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        transition: all 0.2s;
    }

    .tooltipC .tooltipCtext::after {
        content: " ";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }

    .tooltipC:hover .tooltipCtext {
        visibility: visible;
        opacity: 1;
    }
</style>
