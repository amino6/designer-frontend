<template>
    <form class="row g-3 align-items-center">
        <div class="col-md-6">
            <label class="visually-hidden" for="tags">Tags</label>
            <div class="input-group">
                <div class="input-group-text">
                    <i class="bi bi-search"></i>
                </div>
                <input
                    type="text"
                    class="form-control"
                    id="tags"
                    placeholder="Tags" />
            </div>
        </div>

        <div class="col-md-3 col-6">
            <div
                class="form-check d-flex align-items-center justify-content-center">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="has_comments"
                    true-value="1"
                    false-value="0"
                    @change="searchStore.getDesigns()"
                    v-model="searchStore.searchData.has_comments" />
                <label class="form-check-label px-2" for="has_comments">
                    has comments
                </label>
            </div>
        </div>

        <div class="col-md-3 col-6">
            <div
                class="form-check d-flex align-items-center justify-content-center">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="has_team"
                    true-value="1"
                    false-value="0"
                    @change="searchStore.getDesigns()"
                    v-model="searchStore.searchData.has_team" />
                <label class="form-check-label px-2" for="has_team">
                    has team
                </label>
            </div>
        </div>
    </form>
</template>

<script setup>
    import { useSearchStore } from "../stores/search";

    const searchStore = useSearchStore();
</script>

<style lang="scss" scoped></style>
