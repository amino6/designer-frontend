<template>
    <div class="card">
        <img
            src="https://www.gravatar.com/avatar/2c070f8c32d2a582e05cf3eef370c18ejpg?s=200&d=mm"
            class="card-img-top"
            :alt="designer.name + ' profile image'" />
        <div class="card-body">
            <RouterLink
                :to="{
                    name: 'user-details',
                    params: { id: designer.id },
                }">
                <h5 class="card-title">
                    {{ designer.name }}
                </h5>
            </RouterLink>
            <p class="card-text">{{ designer.designs_count }} designs</p>
        </div>
    </div>
</template>

<script setup>
    defineProps(["designer"]);
</script>

<style lang="scss" scoped>
    .card-img-top {
        max-height: 220px;
    }
</style>
