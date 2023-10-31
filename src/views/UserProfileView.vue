<template>
    <div class="container mt-4 mb-4">
        <h1>{{ authStore.user.name }}</h1>
        <div class="card my-4">
            <div class="card-header">
                <h5 class="card-title my-1">Profile Information</h5>
            </div>
            <div class="card-body">
                <p class="mt-1 text-sm">
                    Update your account's profile information and email address.
                </p>
                <section>
                    <form
                        class="mt-6 space-y-6"
                        @submit.prevent="update_profile_info">
                        <div
                            class="mb-4 invalid-feedback d-block"
                            v-if="authStore.errors?.message">
                            {{ authStore.errors?.message }}
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label"
                                ><span>Name</span></label
                            >
                            <input
                                type="text"
                                class="form-control"
                                :class="{
                                    'is-invalid': authStore.errors?.name,
                                }"
                                id="name"
                                required
                                v-model="profile_info_form.name" />
                            <div
                                class="invalid-feedback"
                                v-if="authStore.errors?.name">
                                {{ authStore.errors?.name[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label"
                                ><span>Email</span></label
                            >
                            <input
                                type="email"
                                class="form-control"
                                id="email"
                                :class="{
                                    'is-invalid': authStore.errors?.email,
                                }"
                                required
                                v-model="profile_info_form.email" />
                            <div
                                class="invalid-feedback"
                                v-if="authStore.errors?.email">
                                {{ authStore.errors?.email[0] }}
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <button
                                type="submit"
                                class="btn btn-primary btn-sm"
                                ref="update_profile_btn">
                                Save
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
        <div class="card my-4">
            <div class="card-header">
                <h5 class="card-title my-1">About Me</h5>
            </div>
            <div class="card-body">
                <section>
                    <form class="mt-6 space-y-6" @submit.prevent="update_about">
                        <div
                            class="mb-4 invalid-feedback d-block"
                            v-if="authStore.errors?.message">
                            {{ authStore.errors?.message }}
                        </div>
                        <div class="mb-3">
                            <label for="about" class="form-label"
                                ><span>About</span></label
                            >
                            <textarea
                                v-model="about_form.about"
                                class="form-control"
                                :class="{
                                    'is-invalid': authStore.errors?.about,
                                }"
                                id="about"
                                rows="4"></textarea>
                            <div
                                class="invalid-feedback"
                                v-if="authStore.errors?.about">
                                {{ authStore.errors?.about[0] }}
                            </div>
                        </div>
                        <div class="text-start form-check mt-3 mb-2">
                            <input
                                v-model="about_form.available_to_hire"
                                class="form-check-input"
                                type="checkbox"
                                true-value="1"
                                false-value="0"
                                value=""
                                id="hire" />
                            <label class="form-check-label" for="hire">
                                Available to hire
                            </label>
                        </div>
                        <div class="flex items-center gap-4 mt-3">
                            <button
                                type="submit"
                                class="btn btn-primary btn-sm"
                                ref="update_about_btn">
                                Save
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title my-1">Update Password</h5>
            </div>
            <div class="card-body">
                <p class="mt-1 text-sm">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
                <section>
                    <form
                        class="mt-6 space-y-6"
                        @submit.prevent="update_password">
                        <div class="mb-3">
                            <label for="current_password" class="form-label"
                                ><span>Current Password</span></label
                            >
                            <input
                                type="password"
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        authStore.errors?.current_password,
                                }"
                                id="current_password"
                                v-model="password_form.current_password" />
                            <div
                                class="invalid-feedback"
                                v-if="authStore.errors?.current_password">
                                {{ authStore.errors?.current_password[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label"
                                ><span>New Password</span></label
                            >
                            <input
                                type="password"
                                class="form-control"
                                :class="{
                                    'is-invalid': authStore.errors?.password,
                                }"
                                id="password"
                                v-model="password_form.password" />
                            <div
                                class="invalid-feedback"
                                v-if="authStore.errors?.password">
                                {{ authStore.errors?.password[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label
                                for="password_confirmation"
                                class="form-label"
                                ><span>Confirm Password</span></label
                            >
                            <input
                                type="password"
                                class="form-control"
                                id="password_confirmation"
                                v-model="password_form.password_confirmation" />
                        </div>
                        <div class="flex items-center gap-4">
                            <button
                                type="submit"
                                class="btn btn-primary btn-sm"
                                ref="update_password_btn">
                                Save
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { useAuthStore } from "../stores/auth";

    const authStore = useAuthStore();

    const profile_info_form = ref({
        name: authStore.user.name,
        email: authStore.user.email,
    });

    const password_form = ref({
        current_password: null,
        password: null,
        password_confirmation: null,
    });

    const about_form = ref({
        about: authStore.user.about,
        available_to_hire: authStore.user.available_to_hire,
        formatted_address: authStore.user.formatted_address,
        location: {
            latitude: authStore.user.location.coordinates[1],
            longitude: authStore.user.location.coordinates[0],
        },
        tagline: authStore.user.tagline,
    });

    const update_profile_btn = ref(null);
    const update_password_btn = ref(null);
    const update_about_btn = ref(null);

    async function update_profile_info() {
        update_profile_btn.value.disabled = true;
        update_profile_btn.value.classList.add("disabled");

        await authStore.update_profile_info(profile_info_form.value);

        update_profile_btn.value.disabled = false;
        update_profile_btn.value.classList.remove("disabled");
    }

    async function update_password() {
        update_password_btn.value.disabled = true;
        update_password_btn.value.classList.add("disabled");

        const res = await authStore.update_password(password_form.value);
        if (res === true) {
            password_form.value.current_password = null;
            password_form.value.password = null;
            password_form.value.password_confirmation = null;
        }

        update_password_btn.value.disabled = false;
        update_password_btn.value.classList.remove("disabled");
    }

    async function update_about() {
        update_about_btn.value.disabled = true;
        update_about_btn.value.classList.add("disabled");

        await authStore.update_about_info(about_form.value);

        update_about_btn.value.disabled = false;
        update_about_btn.value.classList.remove("disabled");
    }

    onMounted(() => {
        authStore.resetForm();
    });
</script>

<style lang="scss" scoped></style>
