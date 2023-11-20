<template>
    <div class="design-box">
        <div class="design-box__top">
            <RouterLink
                :to="{ name: 'design', params: { slug: design.slug } }"
                class="design-box__top-link">
                <img :src="design.images[0]" alt="design thumbnail" />
                <div class="design-box__overlay"></div>
            </RouterLink>
            <div
                class="like-icon"
                @click.stop="$emit('like-design', design)">
                <template v-if="!currentlyLiking.includes(design.id)">
                    <i
                        class="bi bi-heart-fill text-danger"
                        v-if="design.liked"></i>
                    <i class="bi bi-heart" v-else></i>
                </template>
                <template v-else>
                    <svg
                        width="38"
                        height="38"
                        stroke="#000"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <circle
                                cx="12"
                                cy="12"
                                r="9.5"
                                fill="none"
                                stroke-width="3"
                                stroke-linecap="round">
                                <animate
                                    attributeName="stroke-dasharray"
                                    dur="1.5s"
                                    calcMode="spline"
                                    values="0 150;42 150;42 150;42 150"
                                    keyTimes="0;0.475;0.95;1"
                                    keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                    repeatCount="indefinite" />
                                <animate
                                    attributeName="stroke-dashoffset"
                                    dur="1.5s"
                                    calcMode="spline"
                                    values="0;-16;-59;-59"
                                    keyTimes="0;0.475;0.95;1"
                                    keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                    repeatCount="indefinite" />
                            </circle>
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                dur="2s"
                                values="0 12 12;360 12 12"
                                repeatCount="indefinite" />
                        </g>
                    </svg>
                </template>
            </div>
        </div>
        <div class="design-box__middle">
            <div class="row d-flex align-items-center">
                <div class="col-8">
                    <RouterLink
                        :to="{ name: 'design', params: { slug: design.slug } }"
                        class="design-box__title">
                        <h2>{{ design.title }}</h2>
                    </RouterLink>
                </div>
                <div
                    class="col-4 d-flex align-items-center justify-content-end">
                    <div class="design-box__info">
                        <p class="m-0">
                            <i
                                class="bi bi-heart-fill text-danger"
                                v-if="design.liked"></i>
                            <i class="bi bi-heart" v-else></i>
                            <span class="icon-span">{{ design.likes }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div href="#" class="design-box__bottom">
            <RouterLink
                :to="{ name: 'user-details', params: { id: design.user.id } }"
                class="design-box__user">
                <img :src="design.user.profile_image" alt="user avatar" />
                <h3>{{ design.user.name }}</h3>
            </RouterLink>
            <p class="design-box__date">{{ design.created_at_human }}</p>
        </div>
    </div>
</template>

<script setup>
    defineProps(["design", "currentlyLiking"]);
    defineEmits(["like-design"]);
</script>

<style lang="scss" scoped>
    .design-box {
        margin-bottom: 35px;

        &__top {
            z-index: 1;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 10px;
                border: 1px solid #d6d6d6;
            }
        }

        &__info {
            display: flex;
            gap: 10px;
            align-items: center;
            font-size: 12px;
        }

        &__title {
            h2 {
                color: #303030;
                font-size: 14px;
                margin-top: 10px;
                margin-bottom: 10px;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        &__bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 5px;
            margin-bottom: 15px;

            h3 {
                margin: 0;
            }
        }

        &__date {
            margin: 0;
        }

        &__user {
            display: inline-flex;
            align-items: center;
            gap: 10px;

            h3 {
                font-size: 12px;
                font-weight: 700;
                color: #303030;
            }

            img {
                width: 25px;
                height: 25px;
                border-radius: 50%;
            }
        }

        &__date {
            font-size: 12px;
        }
    }

    .icon-span {
        margin-top: 1px;
        margin-left: 5px;
        display: inline-block;
    }

    .design-box {
        position: relative;

        &__top {
            overflow: hidden;
            height: 185px;

            &__top-link {
                display: block;
                width: 100%;
                height: 100%;
                z-index: 2;
            }
        }

        &__overlay {
            position: absolute;
            top: 0;
            bottom: 60%;
            right: 0;
            left: 0;
            display: block;
            background: linear-gradient(
                to top,
                transparent 20%,
                rgba(0, 0, 0, 0.3) 100%
            );
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
        }

        .like-icon {
            position: absolute;
            top: 13px;
            left: 14px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 42px;
            height: 42px;
            background: rgba(255, 255, 255, 0.85);
            transition: background 0.2s;
            padding: 15px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 5;

            &:hover {
                background: #fff;
            }

            i {
                font-size: 17px;
                color: #000;

                &::before {
                    margin-top: 8.5px;
                }
            }
        }

        &__overlay,
        .like-icon {
            transition: opacity 0.4s;
            opacity: 0;
            visibility: hidden;
        }

        &__top:hover .design-box__overlay,
        &__top:hover .like-icon {
            opacity: 1;
            visibility: visible;
        }
    }
</style>
