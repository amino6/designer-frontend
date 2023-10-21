<template>
    <section class="gradient-custom">
        <div class="container py-5 h-100">
            <div
                class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <main class="form-signin w-100 m-auto">
                        <form @submit.prevent="authStore.forgotPassword(form)">
                            <h1 class="h1 mb-4">Reset your password</h1>
                            <div v-if="authStore.success" class="mb-4 alert alert-success" role="alert">
                                Check your email for a link to reset your password.
                            </div>

                            <div
                                class="mb-4 invalid-feedback d-block"
                                v-if="authStore.errors?.message">
                                {{ authStore.errors?.message }}
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label"
                                    >Email</label
                                >
                                <input
                                    v-model="form.email"
                                    type="email"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': authStore.errors?.email,
                                    }"
                                    id="email" />
                                <div
                                    class="invalid-feedback"
                                    v-if="authStore.errors?.email">
                                    {{ authStore.errors?.email[0] }}
                                </div>
                            </div>
                            <button
                                :disabled="authStore.isSubmitting"
                                class="btn btn-primary w-100 py-2"
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

    const authStore = useAuthStore();

    const form = ref({
        email: null,
    });

    onMounted(() => {
        authStore.resetForm();
    });
</script>

<style lang="scss" scoped></style>
