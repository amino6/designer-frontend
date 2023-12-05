<template>
    <div>
        <section class="hero text-center">
            <div class="container">
                <h1 class="font-24 fw-500 text-capitalize m-0">
                    Liked Designs
                </h1>
            </div>
        </section>
        <div class="container-xl mb-4">
            <template v-if="!isLoading">
                <div class="row">
                    <template v-if="liked_designs.length > 0">
                        <div
                            class="col-md-4 col-sm-6 col-12"
                            v-for="design in liked_designs"
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
                        <h2 class="no-results">You didn't like any designs.</h2>
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
        </div>
    </div>
</template>

<script setup>
    import { onBeforeMount, ref } from "vue";
    import DesignBox from "../components/DesignBox.vue";
    import InfiniteLoading from "v3-infinite-loading";
    import "v3-infinite-loading/lib/style.css";
    import { request } from "../helpers/request";
    import { like_design } from "../helpers/design";

    const liked_designs = ref([]);
    const currentlyLiking = ref([]);
    const isLoading = ref(false);

    let next_page = 1;

    onBeforeMount(async () => {
        isLoading.value = true;
        await getLikedDesigns();
        isLoading.value = false;
    });

    async function getLikedDesigns(load = false) {
        try {
            const res = await request(
                "/api/user/designs/liked?page=" + next_page
            );
            const data = await res.json();
            if (load) {
                Array.prototype.push.apply(liked_designs.value, data.data);
            } else {
                liked_designs.value = data.data;
            }

            if (data.links?.next) {
                const page = data.links.next.match(/page=\d+/);
                next_page =
                    page.length > 0 ? parseInt(page[0].split("=")[1]) : null;
            } else {
                next_page = null;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function like(design) {
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
    }

    async function loadDesigns($state) {
        $state.loading();

        if (!next_page) {
            $state.complete();
            return;
        }

        try {
            await getLikedDesigns(true);

            $state.loaded();
        } catch (error) {
            $state.error();
        }
    }
</script>

<style lang="scss" scoped>
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
