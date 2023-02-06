<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">
                发现好歌单
            </div>
            <div class="more">
                查看更多
            </div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="150" class="my-swiper" :show-indicators="false">
                <van-swipe-item v-for="item in state.musicList" :key="item">
                    <!-- 路由跳转，点击图片进入详情页 -->
                    <router-link :to="{ path: '/itemmusic', query: { id: item.id } }">
                        <img :src="item.picUrl" :alt="item.name">
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-play1-copy"></use>
                            </svg>
                            {{ getPlayCount(item.playCount) }}
                        </span>
                        <span class="musicListName">
                            {{ item.name }}
                        </span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import { getMusicList } from '@/request/api/home';
import { onMounted, reactive } from 'vue';


export default {
    // vue2写法
    // data() {
    //     return {
    //         musicList: [

    //         ]
    //     }
    // },
    // methods: {
    //     async getGeDan() {
    //         let res = await getMusicList()
    //         this.musicList = res.data.result
    //         console.log(this.musicList);
    //     },
    //     getPlayCount(num) {
    //         if ( num>= 100000000) {
    //             return (num / 100000000).toFixed(1)+"亿"
    //         } else if (num >= 10000) {
    //             return (num/10000).toFixed(1)+"万"
    //         }
    //     }
    // },
    // mounted() {
    //     this.getGeDan()
    // }
    // vue3写法
    setup() {
        const state = reactive({
            musicList: []
        })
        onMounted(async () => {
            let res = await getMusicList()
            state.musicList = res.data.result
            // console.log(state.musicList);
        })
        function getPlayCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + "亿"
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "万"
            }
        }
        return {
            state, getPlayCount
        }
    }
}

</script>
<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 5rem;
    padding: .2rem;

    .musicTop {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: .6rem;
        margin-bottom: .1rem;

        .title {
            font-size: .4rem;
            font-weight: 900;
        }

        .more {
            border: 1px solid #ccc;
            border-radius: 0.4rem;
            height: .6rem;
            padding: 0 .2rem;
            text-align: center;
            line-height: .6rem;
        }
    }

    .musicContent {
        width: 100%;
        height: 3.6rem;

        // .van-swipe-item {
        //     height: 3.8rem;
        // }
        .van-swipe-item {
            height: 3.8rem;
            padding-right: 0.2rem;
            position: relative;

            img {
                width: 100%;
                height: 2.4rem;
                border-radius: 0.2rem;
            }

            .playCount {
                color: white;
                position: absolute;
                z-index: 1;
                right: .27rem;
                top: 0.06rem;

                // margin-top: 0.06rem;
                .icon {
                    height: .3rem;
                    width: .3rem;
                }
            }
        }
    }
}
</style>