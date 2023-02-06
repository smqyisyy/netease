<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>

    </div>
</template>
<script>
import { onMounted, reactive } from 'vue';
// 引入获取首页轮播图数据的函数
import { getBanner } from "@/request/api/home";
export default {
    setup() {
        const state = reactive({
            images: [
            ]
        })

        onMounted(async () => {
            let res = await getBanner()
            state.images=res.data.banners
        })
        return { state };
    }
}
</script>
<style lang="less" scoped>
#swiperTop {
    .van-swipe {

        width: 100%;
        padding: .2rem;
        height: 3rem;

        .van-swipe__track {
            .van-swipe-item {
                padding: 0 0.3rem;

                img {
                    width: 95%;
                    height: 100%;
                    border-radius: .2rem;
                }
            }
        }

        /deep/ .van-swipe__indicators--active {
            background-color: red;
        }


    }
}
</style>