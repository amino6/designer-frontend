<template>
    <section class="post-details mt-4 pb-5" v-if="design != null">
        <div class="container">
            <div class="row mt-4">
                <div class="col-md-8">
                    <div class="post-detail">
                        <div class="single-img">
                            <img
                                :src="design.images[0]"
                                alt="Image"
                                class="img-fluid" />
                        </div>
                    </div>
                    <div class="desing-text fs-5 fw-light py-3 pt-2">
                        <p>
                            {{ design.description }}
                        </p>
                    </div>
                    <div class="design-comments mt-3">
                        <h1 class="fs-5 fw-light mb-4">
                            <strong class="fw-normal"
                                >({{ design.comments?.length ?? 0 }})
                                Responses</strong
                            >
                        </h1>
                        <ul class="list-unstyled comment-list">
                            <li
                                class="clearfix"
                                v-for="comment in design.comments">
                                <div class="comment-thumb float-start">
                                    <a href="#">
                                        <img
                                            :src="comment.user.profile_image"
                                            class="neba img-fluid" />
                                    </a>
                                </div>
                                <div class="comment-meta">
                                    <h3 class="fs-5 fw-normal mb-2">
                                        <a
                                            href="#"
                                            :title="comment.user.name"
                                            >{{ comment.user.name }}</a
                                        >
                                    </h3>
                                    <p class="fs-6 fw-light mb-2">
                                        {{ comment.body }}
                                    </p>
                                    <span class="fs-6 fw-light">
                                        <p>{{ comment.created_at_human }}</p>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="post-detail-sidebar">
                        <div class="card" style="border: 0">
                            <div class="card-body pt-0">
                                <div class="row">
                                    <div class="col-md-3">
                                        <img
                                            :src="design.user.profile_image"
                                            alt="User Image"
                                            class="img-fluid rounded-circle" />
                                    </div>
                                    <div class="col-md-9">
                                        <h5 class="card-title mb-1">
                                            {{ design.user.name }}
                                        </h5>
                                        <p class="card-text">UI Designer</p>
                                    </div>
                                </div>
                                <div class="rwo">
                                    <p class="fw-light mt-4">13 days ago</p>
                                </div>
                            </div>
                        </div>
                        <ul class="details-side-meta fs-6 fw-light px-3">
                            <li
                                class="d-table w-100 text-black"
                                style="padding-bottom: 0">
                                <div class="stats-txt d-table-cell w-50">
                                    <a
                                        href=""
                                        @click.prevent="like(design.id)"
                                        class="text-black"
                                        v-if="design.liked">
                                        <span>
                                            <i
                                                class="bi-heart-fill text-danger"></i>
                                        </span>
                                        Unlike
                                    </a>
                                    <a
                                        href=""
                                        @click.prevent="like(design.id)"
                                        class="text-black"
                                        v-else>
                                        <span>
                                            <i class="bi-heart"></i>
                                        </span>
                                        Like
                                    </a>
                                </div>
                                <div
                                    class="stats-num d-table-cell w-50 text-end">
                                    <p>{{ design.likes }} Likes</p>
                                </div>
                            </li>

                            <li class="d-table w-100">
                                <div class="stats-txt d-table-cell w-100">
                                    <a href="#" class="text-black">
                                        More from {{ design.user.name }}
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <div class="more-designs-outer pb-3">
                            <ul class="more-designs row">
                                <li class="col-md-6">
                                    <a href="#">
                                        <img
                                            class="w-100 img-fluid"
                                            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                                            alt="Image" />
                                    </a>
                                </li>
                                <li class="col-md-6">
                                    <a href="#">
                                        <img
                                            class="w-100 img-fluid"
                                            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                                            alt="Image" />
                                    </a>
                                </li>
                                <li class="col-md-6">
                                    <a href="#">
                                        <img
                                            class="w-100 img-fluid"
                                            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                                            alt="Image" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="designs-tag-outer mt-3">
                            <h2 class="fs-6 fw-normal mb-2">Tags</h2>
                            <div class="designs-tag fs-5">
                                <a
                                    href="#"
                                    :title="tag"
                                    v-for="tag in design.tags_list.tag"
                                    :key="tag"
                                    >{{ tag }}</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useRoute } from "vue-router";
    import { onMounted, ref } from "vue";
    import { request } from "../../helpers/request";
    import { like_design } from "../../helpers/design";

    const route = useRoute();

    const design = ref(null);

    onMounted(async () => {
        const res = await request("/api/designs/slug/" + route.params.slug);
        const data = await res.json();

        design.value = data.data;
    });

    async function like(design_id) {
        await like_design(design_id);
        const res = await request("/api/designs/slug/" + route.params.slug);
        const data = await res.json();

        design.value = data.data;
    }
</script>

<style lang="scss" scoped></style>
