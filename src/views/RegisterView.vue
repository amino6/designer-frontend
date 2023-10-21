<template>
    <section class="gradient-custom">
        <div class="container py-5 h-100">
            <div
                class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <main class="form-signin w-100 m-auto">
                        <form @submit.prevent="authStore.register(form)">
                            <h1 class="h1 mb-4">Register</h1>

                            <div
                                class="mb-4 invalid-feedback d-block"
                                v-if="authStore.errors?.message">
                                {{ authStore.errors?.message }}
                            </div>

                            <div class="form-floating mb-2">
                                <input
                                    v-model="form.name"
                                    type="text"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': authStore.errors?.name,
                                    }"
                                    id="name"
                                    placeholder="name" />
                                <label for="name">Name</label>
                                <div
                                    class="invalid-feedback"
                                    v-if="authStore.errors?.name">
                                    {{ authStore.errors?.name[0] }}
                                </div>
                            </div>
                            <div class="form-floating mb-2">
                                <input
                                    v-model="form.email"
                                    type="email"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': authStore.errors?.email,
                                    }"
                                    id="email"
                                    placeholder="email@example.com" />
                                <label for="email">Email address</label>
                                <div
                                    class="invalid-feedback"
                                    v-if="authStore.errors?.email">
                                    {{ authStore.errors?.email[0] }}
                                </div>
                            </div>
                            <div class="form-floating mb-2">
                                <input
                                    v-model="form.password"
                                    type="password"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            authStore.errors?.password,
                                    }"
                                    id="password"
                                    placeholder="Password" />
                                <label for="password">Password</label>
                                <div
                                    class="invalid-feedback"
                                    v-if="authStore.errors?.password">
                                    {{ authStore.errors?.password[0] }}
                                </div>
                            </div>

                            <div class="form-floating mb-2">
                                <input
                                    v-model="form.password_confirmation"
                                    type="password"
                                    class="form-control"
                                    :class="{
                                        'is-invalid':
                                            authStore.errors
                                                ?.password_confirmation,
                                    }"
                                    id="password_confirmation"
                                    placeholder="Password" />
                                <label for="password_confirmation"
                                    >Password Confirmation</label
                                >
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
                                class="btn btn-primary w-100 py-2 mt-4"
                                type="submit">
                                Register
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
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
    });

    onMounted(() => {
        authStore.resetForm();
    });
</script>

<style lang="scss" scoped></style>
