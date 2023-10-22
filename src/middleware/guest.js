import { useAuthStore } from "../stores/auth";

export default function checkIfLogged() {
    const authStore = useAuthStore();
    if (authStore.isLoggedIn) return '/';
}