<template>
    <div class="itemMusicTop" >
        <img :src="playList.coverImgUrl" alt="" class="bgImg">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight" >
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
    </div>
    <div class="itemTopContent">
        <div class="contentLeft">
            <img :src="playList.coverImgUrl" alt="">
            <div class="playCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-play1-copy"></use>
                </svg>
                <span>{{ changeCount(playList.playCount) }}</span>
            </div>
        </div>
        <div class="contentRight">
            <p class="rightP_one">{{ playList.name }}</p>
            <!-- 因为取后台数据是异步的,如果还没有取到数据就可能会报错，所以要用v-if -->
            <div class="right_img" v-if="playList.creator">
                <img :src="playList.creator.backgroundUrl" />
                <span>{{ playList.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
            <p class="rightP_two">
                <span>{{ playList.description }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </p>
            
        </div>
    </div>
    <div class="itemTopFooter">
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <span>{{ playList.commentCount }}</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang-copy"></use>
            </svg>
            <span>{{ playList.shareCount }}</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <span>下载</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>
</template>
<script>
import { onMounted } from 'vue';

export default {
    // 父子组件之间传递数据
    setup(props) {
        // const playList=
        function changeCount(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + "亿";
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "万";
            }
            
        }
        
        onMounted(() => {
            // console.log(props.playList)
        })
        return {
            changeCount
        }
       ;
    },
    props: ["playList"],

}
</script>
<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem;
    position: relative;

    .itemLeft,
    .itemRight {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        // margin: 0 .2rem;
        span {
            font-size: .4rem;
            color: #fff;
        }

        .icon {
            // fill填充色,svg颜色用fill改变
            fill: #fff
        }
    }

    .bgImg {
        width: 100%;
        height: 6.5rem;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        // 虚化背景
        filter: blur(.3rem);
    }
}

.itemTopContent {
    width: 100%;
    height: 3rem;
    padding: 0.2rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-between;

    .contentLeft {
        width: 36%;
        height: 2.6rem;
        position: relative;

        img {
            width: 2.6rem;
            height: 2.6rem;
            border-radius: 0.2rem;
            top: 0;
            left: 0;
            position: absolute;
            z-index: -1;
        }

        .playCount {
            position: absolute;
            right: 0.1rem;
            top: 0.1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .icon {
                fill: #fff;
                width: 0.26rem;
                height: 0.26rem;
                // top: 0;
                // margin-top: -0.02rem;
                // 设置元素的垂直排列的
                // vertical-align: middle;
            }

            span {
                font-size: 0.26rem;
                color: #fff;
            }
        }
    }

    .contentRight {
        width: 60%;
        height: 2.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .rightP_one {
            font-size: 0.3rem;
            font-weight: 900;
            color: #fff;
            font-family: "微软雅黑";
        }

        .right_img {
            width: 100%;
            height: 0.6rem;
            display: flex;

            align-items: center;

            img {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                // vertical-align: middle;
            }

            span {
                margin-left: 0.1rem;
                color: #ccc;
            }

            .icon {
                width: 0.3rem;
                height: 0.3rem;
                fill: white;
                // margin-top: -0.08rem;
                // vertical-align: middle;
            }
        }

        .rightP_two {
            width: 100%;
            height: 0.6rem;
            display: flex;
            align-items: center;

            // justify-content: space-between;
            span {
                // display: inline-block;
                width: 95%;
                height: 100%;
                // 超过部分隐藏
                overflow: hidden;
                // 当对象内文本溢出时显示省略标记
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 0.24rem;
                color: #ccc;
            }

            .icon {
                width: 0.26rem;
                height: 0.26rem;
                fill: #fff;
            }
        }
    }
}

.itemTopFooter {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-around;
    margin-top: .2rem;
    .footerItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;

        .icon {
            fill: #fff;
            height: 0.55rem;
            width: 0.55rem;
        }

        span {
            margin-top: .15rem;
        }
    }

}
</style>