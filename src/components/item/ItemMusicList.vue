<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <span>播放全部<span>(共{{ songList.length }}首)</span></span>
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏({{ subscribedCount }})</span>
            </div>
        </div>
        <div class="itemList">
            <div class="item" :class="{ 'itemLast': i + 1 === songList.length }" v-for="(song, i) in songList" :key="i">
                <!-- :class"{}"花括号里面的键是绑定的类，值是bool值，用来确定什么时候给这个类名 -->
                <div class="itemLeft" @click="playMusic(i)">
                    <!-- 点击歌曲的时候进行歌曲播放与列表切换 -->
                    <span class="leftSpan">{{ i + 1 }}</span>
                    <div>
                        <p>{{ song.name }}</p>
                        <span v-for="(song1, index) in song.ar" :key="index">{{
                                song1.name
                        }}</span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon bofang" aria-hidden="true" v-if='song.mv != 0'>
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { mapMutations } from 'vuex';

export default {
    setup(props) {
        // console.log(props);
    },
    props: ["songList", "subscribedCount"],
    methods:{
        // ...mapMutations["updatePlayList","updatePlayListIndex"],
        playMusic(num){
            this.$store.commit("updatePlayList",this.songList)
            this.$store.commit("updatePlayListIndex",num)
            // this.updatePlayListIndex(num)
        },
        
    },
    
}
</script>
<style lang="less" scoped>
.itemMusicList {
    background-color: #fff;
    border-top-left-radius: .4rem;
    border-top-right-radius: .4rem;
    margin-top: .2rem;
    width: 100%;
    // height: 100rem;
    // 内容自适应的元素最好不要给高度，否则可能会出现边框不生效的问题
    padding: 0 .2rem;

    .itemListTop {
        height: 1rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        
        .listLeft {
            width: 3rem;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .icon {
                // stoke可以改变svg的线条颜色
                stroke: #333333;
                // stroke-width设置粗细
                stroke-width: 20;
            }

            span {
                font-weight: 700;

                span {
                    font-weight: 400;
                    font-size: 0.24rem;
                    color: #999;
                }
            }
        }

        .listRight {
            display: flex;
            align-items: center;
            background-color: red;
            padding: .2rem;
            border-radius: .4rem;
            // margin-top: .1rem;
            color: #fff;

            .icon {
                width: 0.3rem;
                height: 0.3rem;
                // fill: #fff;
                margin-right: 0.1rem;
                stroke: #fff;
                stroke-width: 90;
            }
        }
    }

    .itemList {
        width: 100%;

        // margin-bottom: 10rem;
        // height: 10rem;
        .itemLast {
            // padding-bottom: 3rem;
            margin-bottom: 1.4rem;
        }

        .item {
            width: 100%;
            height: 1.4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .itemLeft {
                width: 80%;
                height: 100%;
                display: flex;
                align-items: center;

                .leftSpan {
                    display: inline-block;
                    width: 0.2rem;
                    text-align: center;

                }

                div {
                    p {
                        width: 4.54rem;
                        height: .4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-weight: 700;
                    }

                    span {
                        font-weight: 400;
                        font-size: .24rem;
                        color: #999;
                    }

                    margin-left: 0.3rem;
                }
            }
        }

        .itemRight {
            width: 20%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;

            .icon {
                fill: #999;
            }

            // .bofang {
            // position: absolute;
            // left: 0;
            // }

            .liebiao {
                position: absolute;
                right: 0;
            }
        }
    }
}
</style>
