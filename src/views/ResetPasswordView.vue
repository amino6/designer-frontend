<template>
    <section class="gradient-custom">
        <div class="container py-5 h-100">
            <div
                class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <main class="form-signin w-100 m-auto">
                        <form @submit.prevent="authStore.resetPassword(form)">
                            <h1 class="h1 mb-4">Set the new password</h1>
                            <div
                                v-if="authStore.success"
                                class="mb-4 alert alert-success"
                                role="alert">
                                Check your email for a link to reset your
                                password.
                            </div>

                            <div
                                class="mb-4 invalid-feedback d-block"
                                v-if="authStore.errors?.message">
                                {{ authStore.errors?.message }}
                            </div>

                            <div class="mb-2">
                                <label for="password" class="form-label"
                                    >Password</label
                                >
                                <input
                                    v-model="form.password"
                                    type="password"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            authStore.errors?.password,
                                    }"
                                    id="password" />
                                <div
                                    class="invalid-feedback"
                                    v-if="authStore.errors?.password">
                                    {{ authStore.errors?.password[0] }}
                                </div>
                            </div>

                            <div class="mb-2">
                                <label
                                    for="password_confirmation"
                                    class="form-label"
                                    >Password Confirmation</label
                                >
                                <input
                                    v-model="form.password_confirmation"
                                    type="password"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            authStore.errors
                                                ?.password_confirmation,
                                    }"
                                    id="password_confirmation" />
                                <div
                                    :disabled="authStore.isSubmitting"
                                    class="invalid-feedback"
                                    :class="{
                                        disabled: authStore.isSubmitting,
                                    }"
                                    v-if="
                                        authStore.errors?.password_confirmation
                                    ">
                                    {{
                                        authStore.errors
                                            ?.password_confirmation[0]
                                    }}
                                </div>
                            </div>

                            <button
                                :disabled="authStore.isSubmitting"
                                class="btn btn-primary w-100 py-2 mt-4"
                                :class="{ disabled: authStore.isSubmitting }"
                                type="submit">
                                Reset password
                            </button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { useAuthStore } from "../stores/auth";
    import { useRoute } from "vue-router";

    const route = useRoute();

    const authStore = useAuthStore();

    const form = ref({
        password: "",
        password_confirmation: "",
        email: route.query.email,
        token: route.params.token,
    });

    onMounted(() => {
        authStore.resetForm();
    });
</script>

<style lang="scss" scoped></style>
