import { useAuthStore } from "../stores/auth";

export default function checkIfNotLogged() {
    const authStore = useAuthStore();
    if (!authStore.isLoggedIn) return { name: 'login' };
}