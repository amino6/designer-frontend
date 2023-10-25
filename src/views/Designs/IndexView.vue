<template>
    <div class="container-xl mt-4">
        <div class="card">
            <div class="card-header">
                <h5 class="my-1">Designs</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Title</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="design in designs" :key="design.id">
                                <td style="max-width: 70px">
                                    <img
                                        :src="design.images[1]"
                                        alt="design image"
                                        style="
                                            width: 100%;
                                            max-height: 130px;
                                            object-fit: contain;
                                        " />
                                </td>
                                <td class="align-middle">
                                    {{ design.title }}
                                </td>
                                <td class="align-middle">
                                    {{ design.is_live ? "Published" : "Draft" }}
                                </td>
                                <td class="align-middle">
                                    <router-link
                                        :to="{
                                            name: 'designs-edit',
                                            params: { id: design.id },
                                        }">
                                        Edit
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onBeforeMount, ref } from "vue";
    import { request } from "../../helpers/request";
    import DesignBox from "../../components/DesignBox.vue";

    const designs = ref([]);

    onBeforeMount(async () => {
        try {
            const res = await request("/api/users/designs");

            const data = await res.json();

            if (res.ok) {
                designs.value = data.data;
            }
        } catch (error) {
            console.error(error);
        }
    });
</script>

<style lang="scss" scoped></style>
