<template>
    <div>
        <section class="hero text-center text-white">
            <div class="container">
                <h1 class="font-28 fw-600 text-uppercase m-0">
                    Upload a design
                </h1>
            </div>
        </section>
        <div class="container-xl mb-4">
            <div class="upload-shot">
                <div
                    class="row justify-content-center align-items-center text-center">
                    <div class="col-md-7 my-4">
                        <div class="card bg-white shadow-sm">
                            <div class="card-body">
                                <div
                                    class="alert alert-danger"
                                    role="alert"
                                    v-if="errors">
                                    {{ errors }}
                                </div>
                                <Slim :options="slimOptions">
                                    <input
                                        type="file"
                                        name="image"
                                        id="image" />
                                </Slim>
                            </div>
                        </div>
                        <div
                            class="caption-sm mt-2 bg-success"
                            v-if="uploading">
                            <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
                            <svg
                                width="38"
                                height="38"
                                viewBox="0 0 38 38"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#fff">
                                <g fill="none" fill-rule="evenodd">
                                    <g
                                        transform="translate(1 1)"
                                        stroke-width="2">
                                        <circle
                                            stroke-opacity=".5"
                                            cx="18"
                                            cy="18"
                                            r="18" />
                                        <path d="M36 18c0-9.94-8.06-18-18-18">
                                            <animateTransform
                                                attributeName="transform"
                                                type="rotate"
                                                from="0 18 18"
                                                to="360 18 18"
                                                dur="1s"
                                                repeatCount="indefinite" />
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="alert alert-info p-2 mt-3" role="alert">
                            <p class="mb-0">
                                The image dimensions must be atleast 800px x
                                600px in size. The maximum image size is 2mb.
                                Please resize your image accordingly before you
                                upload.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { request } from "../../helpers/request";
    import { useRouter } from "vue-router";

    const router = useRouter();

    import Slim from "../../components/slim/slim.vue";

    async function slimService(formData, progress, success, failure, slim) {
        try {
            const res = await request(
                "/api/designs",
                {
                    method: "POST",
                    body: formData,
                },
                false
            );

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 422 && data.errors.image) {
                    [errors.value] = data.errors.image;
                } else {
                    errors.value = `Something went wrong during the upload
                        process.`;
                }
                failure(500);
            } else {
                router.push({
                    name: "designs-edit",
                    params: {
                        id: data.id,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const slimOptions = ref({
        ratio: "3:2",
        minSize: "800,600",
        service: slimService,
        post: "output",
        defaultInputName: "image",
        label: "Select or drop your image here",
        maxFileSize: 2,
    });
    const uploading = ref(false);
    const errors = ref(null);
</script>

<style lang="scss" scoped>
    .hero {
        background: #4d7090;
    }
    .upload-shot {
        .slim {
            cursor: pointer;
            width: 100%;
            height: 100%;
        }

        .card-body,
        .slim {
            height: 100%;
        }
    }
</style>

<style>
    .footer {
        margin-top: 180px !important;
    }
</style>
