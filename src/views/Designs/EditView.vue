<template>
    <div>
        <section class="hero text-center text-white">
            <div class="container">
                <h1 class="font-28 fw-600 text-uppercase m-0">
                    Update design information
                </h1>
            </div>
        </section>
        <div class="container-xl mb-4 mt-4">
            <div class="row">
                <div class="col-md-6">
                    <img :src="design?.images[0]" alt="gear 5" />
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <form action="" @submit.prevent="submit">
                                <div
                                    v-if="success"
                                    class="mb-4 alert alert-success"
                                    role="alert">
                                    Design Updated successfully.
                                </div>
                                <div
                                    class="mb-4 invalid-feedback d-block"
                                    v-if="errors?.message">
                                    {{ errors?.message }}
                                </div>
                                <div class="mb-3">
                                    <label for="title" class="form-label"
                                        >Title</label
                                    >
                                    <input
                                        v-model="form.title"
                                        type="text"
                                        class="form-control"
                                        :class="{
                                            'is-invalid': errors?.title,
                                        }"
                                        id="title" />
                                    <div
                                        class="invalid-feedback"
                                        v-if="errors?.title">
                                        {{ errors?.title[0] }}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label"
                                        >Description</label
                                    >
                                    <textarea
                                        v-model="form.description"
                                        class="form-control"
                                        :class="{
                                            'is-invalid': errors?.description,
                                        }"
                                        id="description" />
                                    <div
                                        class="invalid-feedback"
                                        v-if="errors?.description">
                                        {{ errors?.description[0] }}
                                    </div>
                                </div>
                                <template v-if="user_teams">
                                    <div class="mb-3 text-start form-check">
                                        <input
                                            v-model="form.assign_to_team"
                                            class="form-check-input"
                                            type="checkbox"
                                            :class="{
                                                'is-invalid':
                                                    errors?.assign_to_team,
                                            }"
                                            id="assign_to_team" />
                                        <label
                                            for="assign_to_team"
                                            class="form-check-label"
                                            >Assign to team</label
                                        >
                                        <div
                                            class="invalid-feedback"
                                            v-if="errors?.assign_to_team">
                                            {{ errors?.assign_to_team[0] }}
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <select
                                            class="form-select"
                                            :class="{
                                                'is-invalid': errors?.team,
                                                disabled: !form.assign_to_team,
                                            }"
                                            :disabled="!form.assign_to_team"
                                            v-model="form.team">
                                            <option selected :value="null">
                                                Select a team
                                            </option>
                                            <option
                                                v-for="team in user_teams"
                                                :key="team.id"
                                                :value="team.id">
                                                {{ team.name }}
                                            </option>
                                        </select>
                                        <div
                                            class="invalid-feedback"
                                            v-if="errors?.team">
                                            {{ errors?.team[0] }}
                                        </div>
                                    </div>
                                </template>
                                <div class="mb-3 text-start form-check">
                                    <input
                                        v-model="form.is_live"
                                        class="form-check-input"
                                        type="checkbox"
                                        :class="{
                                            'is-invalid': errors?.is_live,
                                        }"
                                        id="is_live" />
                                    <label
                                        for="is_live"
                                        class="form-check-label"
                                        >Publish the design</label
                                    >
                                    <div
                                        class="invalid-feedback"
                                        v-if="errors?.is_live">
                                        {{ errors?.is_live[0] }}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <vue3-tags-input
                                        :tags="form.tags"
                                        placeholder="Enter some tags"
                                        :class="{
                                            'is-invalid': errors?.tags,
                                        }"
                                        id="tags"
                                        @on-tags-changed="handleChangeTag" />
                                    <div
                                        class="invalid-feedback"
                                        v-if="errors?.tags">
                                        {{ errors?.tags[0] }}
                                    </div>
                                </div>
                                <button
                                    :disabled="isSubmitting"
                                    class="btn btn-primary w-100 py-2 mt-3"
                                    :class="{
                                        disabled: isSubmitting,
                                    }"
                                    type="submit">
                                    Update design
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onBeforeMount, onMounted } from "vue";
    import { request } from "../../helpers/request";
    import { useRoute, useRouter } from "vue-router";
    import Vue3TagsInput from "vue3-tags-input";

    const router = useRouter();
    const { id: design_id } = useRoute().params;

    const form = ref({
        title: "",
        description: "",
        is_live: false,
        tags: [],
        assign_to_team: false,
        team: null,
    });

    const design = ref(null);
    const user_teams = ref(null);
    const isSubmitting = ref(false);
    const errors = ref({});
    const success = ref(false);

    onBeforeMount(async () => {
        try {
            // fetch user teams
            const teamsRes = await request("/api/users/teams");
            const TeamsData = await teamsRes.json();

            if (teamsRes.ok) {
                user_teams.value = TeamsData.data;
            }
        } catch (error) {
            console.error(error);
        }

        try {
            // fetch designs
            const res = await request("/api/designs/" + design_id);
            const data = await res.json();

            console.log(res);

            if (res.ok) {
                design.value = data.data;
            } else {
                if (res.status === 404) {
                    router.push("/404");
                } else {
                    router.push("/500");
                }
            }
        } catch (error) {
            console.error(error);
        }

        if (design.value) {
            Object.keys(form.value).forEach(key => {
                if (design.value.hasOwnProperty(key)) {
                    form.value[key] = design.value[key];
                }
            });

            form.value.tags = design.value.tags_list?.tag || [];

            if (design.value.team) {
                form.value.team = design.value.team.id;
                form.value.assign_to_team = true;
            } else {
                form.assign_to_team = false;
            }
        }
    });

    async function submit() {
        errors.value = {};
        isSubmitting.value = true;
        success.value = false;

        try {
            const res = await request("/api/designs/" + design_id, {
                method: "PUT",
                body: JSON.stringify(form.value),
            });
            const data = await res.json();

            if (!res.ok) {
                if (data.errors) {
                    errors.value = data.errors;
                } else {
                    errors.value.message = data.message;
                }
                success.value = false;
            } else {
                /* success.value = true;
                if (form.value.assign_to_team === false) {
                    form.value.team = null;
                } */
                router.push("/dashboard");
            }
            console.log(data, res);

            isSubmitting.value = false;
        } catch (error) {
            console.error(error);
        }
    }

    function handleChangeTag(tags) {
        form.value.tags = tags;
    }
</script>

<style lang="scss" scoped>
    .hero {
        background: #4d7090;
    }
    img {
        max-width: 100%;
        object-fit: cover;
    }
</style>
