<script setup>
import { ref } from "vue";
import SearchDropdown from "./SearchDropdown.vue";
const searchInput = ref(null);
const focusInput = () => {
    searchInput.value.focus();
};
</script>

<template>
    <form class="search-form">
        <input value="" placeholder="Search" class="search-input" ref="searchInput" />
        <div class="search-button">
            <div class="submit-button">
                <i class="bi bi-search fs-4"></i>
            </div>
        </div>
        <SearchDropdown @click.stop="" />
    </form>
</template>

<style lang="scss" scoped>
.search-form {
    position: relative;
    top: 50%;
    left: 50%;
    width: 65%;
    height: 65px;
    border-radius: 40px;
    transform: translate(-50%, -50%);
    background: #fff;
    transition: all 0.3s ease;
    margin-top: 80px;
    border: 1px solid #d6d6d6;
    z-index: 2;

    &:focus-within {
        box-shadow: 0 4px 9px rgba(0, 0, 0, 0.2);
    }

    input {
        position: absolute;
        top: 50%;
        left: 57px;
        right: 0;
        transform: translateY(-50%);
        font-size: 20px;
        background: none;
        color: #5a6674;
        max-width: calc(100% - 137px - 57px);
        height: 100%;
        width: 100%;
        border: none;
        appearance: none;
        outline: none;

        &::-webkit-search-cancel-button {
            appearance: none;
        }
    }

    .search-button {
        position: absolute;
        top: 50%;
        left: 25px;
        transform: translateY(-61%);
        height: 20px;
        width: 20px;
        padding: 0;
        margin: 0;
        border: none;
        background: none;
        outline: none !important;

        i {
            position: absolute;
            top: 50%;
            transform: translateY(-44.5%);
            left: -4px;
        }

        & div {
            width: 20px;
            height: 20px;
            fill: #5a6674;
        }
    }
}
</style>
