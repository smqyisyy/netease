<template>
    <!-- 背景图片 -->
    <img :src="musicList.al.picUrl" alt="" class="bgImg">
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon " aria-hidden="true" @click="backHome">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <div class="leftMarquee">
                <Vue3Marquee style="color:#fff">{{ musicList.name }}</Vue3Marquee>
                <span v-for="(item, i) in musicList.ar" :key="i">
                    {{ item.name }}
                </span>
                <svg class="icon " aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
        </div>
        <div class="detailTopRight">
            <svg class="icon " aria-hidden="true">
                <use xlink:href="#icon-fenxiang-copy"></use>
            </svg>
        </div>
    </div>
    <!-- 弹出框的中间的主体部分用v-show决定展示磁盘还是歌词 -->
    <!-- 磁盘部分 -->
    <div class="detailContent" v-show="!isLyricShow" @click="(isLyricShow = !isLyricShow)">
        <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{ img_needle_active: !isbtnShow }">
        <!-- 绑定动态类，实现磁针旋转 -->
        <img src="@/assets/cd.png" alt="" class="img_cd">
        <!-- <img :src="musicList.al.picUrl" alt="" class="img_ar" :class="{img_ar_active:!isbtnShow,img_ar_paused:isbtnShow}"> -->
        <img :src="musicList.al.picUrl" alt="" class="img_ar" :class="[isbtnShow ? 'img_ar_paused' : 'img_ar_active']">
        <!-- 绑定动态类，实现图片旋转 -->
    </div>
    <!-- 歌词部分 -->
    <!-- 绑定ref可以通过this.$refs.name获取到dom元素的全部属性 -->
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="(isLyricShow = !isLyricShow)">
        <div>
            <!-- 歌词绑定动态类，判断是不是当前正在唱的一句 -->
            <p v-for="item in lyric" :key="item"
                :class="{ active: (currentTime * 1000) >= item.time && (currentTime * 1000) <= item.next }">
                {{ item.lrc }}</p>
        </div>
    </div>
    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon " aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon " aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <svg class="icon " aria-hidden="true">
                <use xlink:href="#icon-yinlechangpian"></use>
            </svg>
            <svg class="icon " aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <svg class="icon " aria-hidden="true">
                <use xlink:href="#icon-liebiao-"></use>
            </svg>
        </div>
        <!-- 进度条部分 -->
        <div class="footerContenter">
            <!-- 利用range input标签，最大值为歌曲的总长度，双向绑定一下当前歌曲播放的时长实现进度条效果 step属性设置距离 -->
            <input type="range" class="range" ref="range" min="0" :max="duration"  step="0.05" @change="changeBar" v-model="currentTime">
        </div>
        <div class="footer">
            <svg class="icon " aria-hidden="true">
                <use xlink:href="#icon-danxunhuan"></use>
            </svg>
            <svg class="icon " aria-hidden="true" @click="switchSong(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true" @click="playMusic" v-if="isbtnShow">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true" @click="playMusic" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>

            <svg class="icon " aria-hidden="true" @click="switchSong(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon " aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
    </div>
</template>
<script>


import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex';
export default {
    components: { Vue3Marquee, },
    props: ["musicList", "isbtnShow", "playMusic","addDuration","updateAudioCtime"],
    setup(props) {
        // console.log(props);
    },
    updated(){
        this.addDuration()
    },
    // mounted(){
    //     this.addDuration()

    // },
    watch: {
        // musicList() {        // 在点击切换歌曲时。 去获取歌词的信息
            // $store.dispatch触发vuex里的异步action
            // this.$store.dispatch("getLyric", this.musicList.id)
            // 获取歌曲的总时长
        // },
        // 监听歌词播放的时间，来实现歌词随着唱而滚动
        currentTime(newValue) {
            // 获取p标签中绑定了active类的元素，即当前正在唱的那句歌词
            let p = document.querySelector("p.active");
            // console.log([p]);
            // 如果offset超过300了就要开始调整滚动条的位置，让正在唱的歌词始终处于中间位置
            if (p && p.offsetTop > 300) {
                this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
            }
            // 如果当前的播放时长大于等于总时长,就向下切歌
            if (newValue==this.duration) {
                this.switchSong(1)
            }
            // console.log(this.$refs.musicLyric.offsetTop);
        }
    },
    computed: {
        ...mapState(["lyricList", "currentTime", "playListIndex", "playList","duration"]),
        // 切割处理歌词数据
        lyric() {
            let arr;
            if (this.lyricList.lyric) {
                // 正则表达匹配换行符切割
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, idx) => {
                    // 切割获取时间数据
                    let idxOfRt = item.indexOf(']'); // 右中括号的下标，为了解决处理毫秒位数不统一的问题
                    let min = item.slice(1, 3); // 分
                    let sec = item.slice(4, 6); // 秒
                    let msec = '';
                    let lrc = '';
                    // 将时间转换，用来对比audio标签ref属性中的currentTime的值来确认当前播放到哪,转换为毫秒单位
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000
                    if (idxOfRt != -1) {
                        msec = item.slice(7, idxOfRt); // 毫秒
                        lrc = item.slice(idxOfRt + 1, item.length) // 歌词;
                        time += parseInt(msec)
                    }
                    // 返回一个数组对象
                    // console.log(arr);
                    return { min, sec, msec, lrc, time }
                })
                // 这里是为了拿到下一句歌词的开始时间，方便来判断当前应该显示哪一句歌词
                arr.forEach((item, i) => {
                    // 如果到最后一句歌词就不需要拿下一句了,之间给最后一句的时间大一点，来保证样式在最后一句显示
                    if (i === arr.length - 1 || isNaN(arr[i+1].time)) {
                        item.next = 1000000
                    } else {
                        item.next = arr[i + 1].time
                    }
                });
            }
            console.log(arr)
            return arr
        },

    },
    methods: {
        ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
        backHome() {
            this.updateDetailShow()
            this.isLyricShow = false
        },
        // 点击进度条切换音乐播放时间
        changeBar(event){
            // event.target.value获取进度条被点下所在的进度数据
            // 调用父组件的方法,对当前音乐时间进行修改
            this.updateAudioCtime(event.target.value)
        },
        // 上一首歌下一首歌切换
        switchSong(num) {
            let idx = this.playListIndex + num;
            // 如果为第一首并且点击了上一首按钮,就不做反应
            if (idx == -1) {
                idx = 0
            }
            // 如果为最后一首并且点击了下一首按钮，也不反应
            if (idx >= this.playList.length) {
                idx = this.playList.length - 1
            }
            this.updatePlayListIndex(idx);
        }

    },
    data() {
        return {
            // 控制显示歌曲的磁盘还是歌词，默认显示磁盘，不显示歌曲
            isLyricShow: false,
        }
    }
}
</script>
<style lang="less" scoped>
.bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(1.4rem);
}

.detailTop {
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    fill: #fff;

    .detailTopLeft {
        display: flex;
        align-items: center;

        .leftMarquee {
            width: 2.5rem;
            height: 100%;
            margin-left: 0.4rem;

            span {
                color: #999;
            }

            .icon {
                width: 0.3rem;
                height: 0.3rem;
                fill: #999;
            }
        }
    }
}

.detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img_needle {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        // 设置旋转元素的基点位置，基于自己的左上点
        transform: rotate(-13deg);
        // 旋转-13°
        transition: all 2s;
        // 旋转动画2s
    }

    .img_needle_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        // 设置旋转元素的基点位置，基于自己的左上点
        transform: rotate(2deg);
        // 旋转-13°
        transition: all 2s;
        // 旋转动画2s
    }

    .img_cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }

    .img_ar {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_ar 10s linear infinite;
        // 设置动画名字，时间为10s 匀速 无线循环
    }

    .img_ar_active {
        // 控制动画的暂停和启动
        animation-play-state: running;
    }

    .img_ar_paused {
        animation-play-state: paused;
    }

    @keyframes rotate_ar {
        100% {
            transform: rotate(360deg);
        }
    }
}

// 歌曲部分样式
.musicLyric {
    width: 100%;
    height: 8rem;

    margin-top: .4rem;
    // margin-bottom: .4rem;
    // 设置溢出滚动
    overflow: scroll;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        // 坑点：当设置了justify-content和overflow之后，会把自己上部分内容挡住，解决方式是在flex盒子外面套一层div设置好高度和overflow
        p {
            // margin-top: 2rem;
            color: rgb(203, 199, 199);
            margin-bottom: .4rem;
            text-align: center;
        }

        // 当前演唱歌词的样式
        .active {
            color: #fff;
            font-size: .5rem;
            text-align: center;
        }
    }
}

.detailFooter {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .footerTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
            width: 0.6rem;
            height: 0.6rem;
            fill: rgb(245, 234, 234);
        }
    }

    .range {
        width: 100%;
        height: 0.06rem;
    }

    .footer {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
            fill: rgb(245, 234, 234);
        }

        .bofang {
            width: 1rem;
            height: 1rem;
        }
    }
}
</style>