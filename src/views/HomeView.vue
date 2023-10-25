<template>
    <div class="container-xl mt-4">
        <h1 class="primary-header">Explore Designs And Designers</h1>
        <SearchForm />
        <div class="row filter-section my-4">
            <div class="col filter-section__left d-none d-sm-flex">
                <ul class="tags">
                    <li class="tag active">
                        <RouterLink to="/" class="tag-item">tag 1</RouterLink>
                    </li>
                    <li class="tag">
                        <RouterLink to="/" class="tag-item">tag 1</RouterLink>
                    </li>
                    <li class="tag">
                        <RouterLink to="/" class="tag-item">tag 1</RouterLink>
                    </li>
                    <li class="tag">
                        <RouterLink to="/" class="tag-item">tag 1</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="col filter-section__right">
                <FilterDropdown />
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                <DesignBox />
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                <DesignBox />
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                <DesignBox />
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                <DesignBox />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from "vue";
    import { RouterLink } from "vue-router";
    import SearchForm from "../components/SearchForm.vue";
    import FilterDropdown from "../components/FilterDropdown.vue";
    import DesignBox from "../components/DesignBox.vue";
    import { useAuthStore } from "../stores/auth";

    const authStore = useAuthStore();

    onMounted(async () => {
        await authStore.getUser();
    });
</script>

<style lang="scss" scoped>
    .primary-header {
        font-size: 50px;
        text-align: center;
        margin-top: 50px;
        color: #0d0c22;
        font-weight: 400;
        letter-spacing: 2px;
    }

    .filter-section {
        &__right {
            text-align: right;
        }
    }

    .tags {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        padding: 0;
        gap: 12px;

        .tag {
            display: inline-block;
            border-radius: 5px;
            border: 1px solid #d6d6d6;
            transition: all 0.2s;

            &-item {
                padding: 2px 10px;
                color: inherit;
            }

            &:hover {
                background-color: rgba(55, 80, 155, 0.03);
                border-color: #969696;
            }

            &.active,
            &.active:hover {
                background-color: rgba(55, 80, 155, 0.1);
                border-color: #969696;
            }
        }
    }
</style>
