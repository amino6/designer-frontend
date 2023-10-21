<template>
    <div class="design-box">
        <div class="design-box__top">
            <a href="#" class="design-box__top-link">
                <img src="https://cdn.dribbble.com/users/22069/screenshots/16815570/media/0b5e4333f2c1d7088e550b40e91ec779.jpg?compress=1&resize=320x240&vertical=top"
                    alt="design thumbnail" />
                <div class="design-box__overlay">
                </div>
            </a>
            <div class="like-icon" @click.stop="">
                <i class="bi bi-heart"></i>
            </div>
        </div>
        <div class="design-box__middle">
            <div class="row d-flex align-items-center">
                <div class="col-8">
                    <a href="#" class="design-box__title">
                        <h2>Lorem ipsum dolor sit amet.</h2>
                    </a>
                </div>
                <div class="col-4 d-flex align-items-center justify-content-end">
                    <div class="design-box__info">
                        <p class="m-0">
                            <i class="bi bi-heart"></i>
                            <span class="icon-span">10</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div href="#" class="design-box__bottom">
            <a href="#" class="design-box__user">
                <img src="https://www.gravatar.com/avatar/random@gmail.com/jpg?d=mm" alt="user avatar" />
                <h3>username</h3>
            </a>
            <p class="design-box__date">Jan 20, 2023</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.design-box {
    margin-bottom: 20px;

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
        margin-top: 15px;
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
        background: linear-gradient(to top,
                transparent 20%,
                rgba(0, 0, 0, .3) 100%);
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
        transition: opacity .4s;
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
