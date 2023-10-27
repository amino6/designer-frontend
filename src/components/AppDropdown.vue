<template>
    <div class="dopdown-wrapper" ref="target">
        <div @click="toggle" class="toggler btn">
            <slot name="toggler"></slot>
        </div>
        <div v-if="active" class="dropdown-content" ref="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { onClickOutside } from "@vueuse/core";

    const active = ref(false);
    const target = ref(null);

    function toggle() {
        active.value = !active.value;
    }

    onMounted(() => {
        onClickOutside(target, () => {
            if (active.value === true) {
                active.value = false;
            }
        });
    });
</script>

<style lang="scss" scoped>
    .toggler,
    .toggler:focus {
        display: inline-block;
        background: rgba(55, 80, 155, 0.1);
        border-radius: 3px;
        box-shadow: inset 0 0 0 1px rgba(55, 80, 155, 0.1);
        display: inline-flex;
        align-items: center;
        justify-content: space-around;
        position: relative;
        padding: 5px 10px;
        width: 110px;
        cursor: pointer;
    }
    /*.toggler:focus span {
        border: 1px solid #000;
    }*/
    .dopdown-wrapper {
        display: inline-block;
        position: relative;
    }

    .dropdown-content {
        position: absolute;
        box-shadow: rgba(27, 32, 50, 0.1) 0px 15px 50px 0px;
        right: 0;
        padding: 10px;
        border: 1px solid #d6d6d6;
        width: 200px;
        background: #fff;
        z-index: 1000;
    }
</style>
