<template>
    <div class="container-xl mt-4" v-if="user">
        <div class="row mt-4">
            <div class="col-md-6 mx-auto">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-3">
                                <img
                                    :src="user.profile_image"
                                    alt="User Image"
                                    class="img-fluid rounded-circle" />
                            </div>
                            <div class="col-9">
                                <h5 class="card-title mb-1 mt-3">
                                    {{ user.name }}
                                </h5>
                                <p class="card-text">
                                    <span v-if="user.job_title">
                                        {{ user.job_title }} <br />
                                    </span>
                                    <span
                                        v-if="user.available_to_hire"
                                        class="badge bg-primary"
                                        >Available to hire</span
                                    >
                                </p>
                                <div class="card-text">
                                    <div class="d-flex gap-4">
                                        <div class="stats">
                                            <h6 class="mb-0">
                                                Images:
                                                <span>{{
                                                    user.designs_count
                                                }}</span>
                                            </h6>
                                        </div>

                                        <div class="stats">
                                            <h6 class="mb-0">
                                                Likes:
                                                <span>{{ likes_count }}</span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <h4 class="text-black">About:</h4>
                            <p>{{ user.about }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template v-if="!isLoading">
            <div class="row mt-4">
                <template v-if="user_designs?.length > 0">
                    <div
                        class="col-md-4 col-sm-6 col-12"
                        v-for="design in user_designs"
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
                        This user doesn't have any designs.
                    </h2>
                </div>
            </div>
        </template>
        <div class="mt-4" v-else>
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
        </div>
        <Teleport to="body">
            <LoginRequiredModal :show="showModal" @close="showModal = false" />
        </Teleport>
    </div>
</template>

<script setup>
    import { onBeforeMount, ref } from "vue";
    import { useRoute } from "vue-router";
    import { request } from "../helpers/request";
    import { like_design } from "../helpers/design";
    import DesignBox from "../components/DesignBox.vue";
    import LoginRequiredModal from "../components/LoginRequiredModal.vue";
    import { useAuthStore } from "../stores/auth";
    import InfiniteLoading from "v3-infinite-loading";
    import "v3-infinite-loading/lib/style.css";

    const route = useRoute();
    const authStore = useAuthStore();

    const user_id = route.params.id;
    const user_designs = ref(null);
    const user = ref(null);
    const likes_count = ref(0);
    const currentlyLiking = ref([]);
    const isLoading = ref(false);
    const showModal = ref(false);

    let next_page = 1;

    onBeforeMount(async () => {
        await getUserInfo();
        isLoading.value = true;
        await getUserDesigns();
        isLoading.value = false;
    });

    async function getUserInfo() {
        try {
            const res = await request("/api/users/" + user_id + "/info");
            const data = await res.json();

            user.value = data[0];
            likes_count.value = data[1];
        } catch (error) {
            console.error(error);
        }
    }

    async function getUserDesigns(load = false) {
        try {
            const res = await request("/api/users/" + user_id + "/designs");
            const data = await res.json();

            if (load) {
                Array.prototype.push.apply(user_designs.value, data.data);
            } else {
                user_designs.value = data.data;
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
        if (authStore.isLoggedIn) {
            currentlyLiking.value.push(design.id);
            const like_res = await like_design(design.id);

            currentlyLiking.value.splice(
                currentlyLiking.value.indexOf(design.id),
                1
            );

            if (like_res.ok) {
                // update design
                if (design.liked) {
                    // dislike
                    design.liked = false;
                    design.likes--;
                    likes_count.value = likes_count.value - 1;
                } else {
                    // like
                    design.liked = true;
                    design.likes++;
                    likes_count.value = likes_count.value + 1;
                }
            }
        }else {
            showModal.value = true;
        }
    }

    async function loadDesigns($state) {
        $state.loading();

        if (!next_page) {
            $state.complete();
            return;
        }

        try {
            await getUserDesigns(true);

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
