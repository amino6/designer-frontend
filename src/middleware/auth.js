import { useAuthStore } from "../stores/auth";

export default async function checkIfNotLogged() {
    const authStore = useAuthStore();
    await authStore.getUser();
    if (!authStore.isLoggedIn) return { name: 'login' };
}