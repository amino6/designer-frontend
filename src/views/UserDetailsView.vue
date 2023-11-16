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
                                <h5 class="card-title mb-1">
                                    {{ user.name }}
                                </h5>
                                <p class="card-text">
                                    UI Designer <br />
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
                                                Images: <span>{{user_designs.length}}</span>
                                            </h6>
                                        </div>

                                        <div class="stats">
                                            <h6 class="mb-0">
                                                Likes: <span>{{likes_count}}</span>
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
        <div class="row mt-4">
            <div
                class="col-lg-3 col-md-4 col-sm-6 col-12 mt-4"
                v-for="design in user_designs"
                :key="design.id">
                <DesignBox :design="design" @like-design="like" :isLoadingLike="isLoadingLike"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    import { request } from "../helpers/request";
    import { like_design } from "../helpers/design";
    import DesignBox from "../components/DesignBox.vue";

    const route = useRoute();

    const user_id = route.params.id;
    const user_designs = ref(null);
    const user = ref(null);
    const likes_count = ref(0);
    const isLoadingLike = ref(false);

    onMounted(async () => {
        try {
            const res = await request("/api/users/" + user_id + "/designs");
            const data = await res.json();

            user.value = data[0];
            user_designs.value = data[1];
            likes_count.value = data[2];
        } catch (error) {
            console.error(error);
        }
    });

    async function like(design_id) {
        isLoadingLike.value = true;
        await like_design(design_id);
        const res = await request("/api/users/" + user_id + "/designs");
        const data = await res.json();

        user_designs.value = data[1];
        likes_count.value = data[2];
        isLoadingLike.value = false;
    }
</script>

<style lang="scss" scoped></style>
