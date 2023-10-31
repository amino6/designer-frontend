import { defineStore } from 'pinia'
import { request } from '../helpers/request';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
        isSubmitting: false,
        errors: {},
        success: false
    }),
    getters: {
        user: (state) => state.authUser,
        isLoggedIn: (state) => state.authUser !== null
    },
    actions: {
        async getUser() {
            if (this.user === null) {
                const res = await request('/api/user');
                const data = await res.json();
                if (res.ok) {
                    this.authUser = data;
                }
            }
        },
        async refreshUser() {
            const res = await request('/api/user');
            const data = await res.json();
            if (res.ok) {
                this.authUser = data;
            }
        },
        async logout() {
            try {
                await request("/logout", {
                    method: "POST",
                });
                this.authUser = null;
                this.router.push('/');
            } catch (e) {
                console.error(e);
            }
        },
        async login(form) {
            this.isSubmitting = true;
            this.errors = {};

            try {
                const res = await request("/login", {
                    method: "POST",
                    body: JSON.stringify(form),
                });
                const data = await res.json();

                this.isSubmitting = false;

                if (res.status !== 200) {
                    if (data.errors) {
                        this.errors = data.errors;
                    } else {
                        this.errors.message = data.message;
                    }
                } else {
                    this.router.push("/");
                }
            } catch (e) {
                console.error(e);
            }
            this.isSubmitting = false;
        },
        async register(form) {
            this.isSubmitting = true;
            this.errors = {};
            try {
                const res = await request("/register", {
                    method: "POST",
                    body: JSON.stringify(form),
                });
                const data = await res.json();

                this.isSubmitting = false;

                if (res.status !== 200 && res.status !== 201) {
                    if (data.errors) {
                        this.errors = data.errors;
                    } else {
                        this.errors.message = data.message;
                    }
                } else {
                    this.router.push("/");
                }
            } catch (e) {
                console.error(e);
            }
            this.isSubmitting = false;
        },
        async forgotPassword(form) {
            this.isSubmitting = true;
            this.errors = {};
            this.success = false;

            try {
                const res = await request("/forgot-password", {
                    method: "POST",
                    body: JSON.stringify(form),
                });
                const data = await res.json();

                this.isSubmitting = false;

                if (res.status < 200 || res.status > 300) {
                    if (data.errors) {
                        this.errors = data.errors;
                    } else {
                        this.errors.message = data.message;
                    }
                } else {
                    this.success = true;
                }
            } catch (e) {
                console.error(e);
            }
            this.isSubmitting = false;
        },
        async resetPassword(form) {
            this.isSubmitting = true;
            this.errors = {};
            this.success = false;

            try {
                const res = await request("/reset-password", {
                    method: "POST",
                    body: JSON.stringify(form),
                });
                const data = await res.json();

                this.isSubmitting = false;

                if (res.status < 200 || res.status > 300) {
                    if (data.errors.password) {
                        this.errors = data.errors;
                    } else {
                        this.errors.message = data.message;
                    }
                } else {
                    this.router.push("/login");
                }
            } catch (e) {
                console.error(e);
            }
            this.isSubmitting = false;
        },
        resetForm() {
            this.errors = {};
            this.isSubmitting = false;
            this.success = false;
        },
        async update_profile_info(form) {
            this.isSubmitting = true;
            this.errors = {};

            try {
                const res = await request("/user/profile-information", {
                    method: "PUT",
                    body: JSON.stringify(form),
                });
                const data = await res.json();

                this.isSubmitting = false;

                if (res.status !== 200) {
                    if (data.errors) {
                        this.errors = data.errors;
                    } else {
                        this.errors.message = data.message;
                    }
                } else {
                    this.refreshUser();
                }
            } catch (e) {
                console.error(e);
            }
            this.isSubmitting = false;
        },
        async update_password(form) {
            this.isSubmitting = true;
            this.errors = {};

            try {
                const res = await request("/user/password", {
                    method: "PUT",
                    body: JSON.stringify(form),
                });
                const data = await res.json();

                this.isSubmitting = false;

                if (res.status !== 200) {
                    if (data.errors) {
                        this.errors = data.errors;
                    } else {
                        this.errors.message = data.message;
                    }
                } else {
                    this.refreshUser();
                    return true;
                }
            } catch (e) {
                console.error(e);
            }
            this.isSubmitting = false;
        },
        async update_about_info(form) {
            this.isSubmitting = true;
            this.errors = {};

            try {
                const res = await request("/api/user/settings", {
                    method: "PUT",
                    body: JSON.stringify(form),
                });
                const data = await res.json();

                this.isSubmitting = false;

                if (res.status !== 200) {
                    if (data.errors) {
                        this.errors = data.errors;
                    } else {
                        this.errors.message = data.message;
                    }
                } else {
                    this.refreshUser();
                }
            } catch (e) {
                console.error(e);
            }
            this.isSubmitting = false;
        },
    },
    persist: true,
})