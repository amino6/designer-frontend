<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask" @click="$emit('close')">
            <div class="modal-container" @click.stop="">
                <div class="modal-header">
                    <h3 class="w-100 text-bold text-center h3 text-black">
                        To like a photo, please create an account.
                    </h3>
                </div>

                <div class="modal-body">
                    <RouterLink to="/login" class="btn btn-primary mx-auto d-block w-50">
                        Login
                    </RouterLink>
                    <p class="divider">Or</p>
                    <RouterLink to="/register" class="btn btn-dark mx-auto d-block w-50">
                        Register
                    </RouterLink>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
    const props = defineProps({
        show: Boolean,
    });
</script>

<style lang="scss" scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        transition: opacity 0.3s ease;
    }

    .modal-container {
        width: 700px;
        margin: auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
    }

    .modal-header {
        margin-top: 20px;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 50px 0;
    }

    .modal-default-button {
        float: right;
    }

    .divider {
        text-align: center;
        margin-top: 15px;
        margin-bottom: 15px;
        color: #707070;
    }

    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

    .modal-enter-from {
        opacity: 0;
    }

    .modal-leave-to {
        opacity: 0;
    }

    .modal-enter-from .modal-container,
    .modal-leave-to .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
