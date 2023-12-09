<template>
    <section class="gradient-custom mt-4">
        <div class="container py-5 h-100">
            <div
                class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <main class="form-signin w-100 m-auto">
                        <form @submit.prevent="login">
                            <h1 class="h1 mb-4">Sign in</h1>

                            <div
                                class="mb-4 invalid-feedback d-block"
                                v-if="authStore.errors?.message">
                                {{ authStore.errors?.message }}
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="email">Email address</label>
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
                            <div class="mb-3">
                                <label class="form-label" for="password">Password</label>
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
                            <div class="text-start form-check mt-3 mb-2">
                                <input
                                    v-model="form.remember"
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="remember" />
                                <label class="form-check-label" for="remember">
                                    Remember me
                                </label>
                            </div>

                            <div class="text-start mt-4 mb-4">
                                <router-link
                                    class="forgot-pass color-blue font-14 fw-400"
                                    :to="{ name: 'forgot-password' }">
                                    Forgot password?
                                </router-link>
                            </div>
                            <button
                                :disabled="authStore.isSubmitting"
                                class="btn btn-primary w-100 py-2"
                                :class="{ disabled: authStore.isSubmitting }"
                                type="submit">
                                Sign in
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

    const authStore = useAuthStore();
    const route = useRoute();

    console.log(route.redirectedFrom);

    const form = ref({
        email: null,
        password: null,
        remember: false,
    });

    onMounted(() => {
        authStore.resetForm();
    });

    function login() {
        if(route.redirectedFrom) {
            authStore.login(form.value, route.redirectedFrom.name);
        }else {
            authStore.login(form.value);
        }
    }
</script>

<style lang="scss" scoped></style>
