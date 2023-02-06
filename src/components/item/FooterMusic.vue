<template>
    <div class="footerMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑可以切换上下首</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon liebiao" aria-hidden="true" v-show="isbtnShow" @click="playMusic">
                <use xlink:href="#icon-bofanganniu"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true" v-show="!isbtnShow" @click="playMusic">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-liebiao-"></use>
            </svg>
        </div>
        <audio ref="audio"
            :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    </div>
    <!-- 歌单详情页的弹出 -->
    <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%', width: '100%' }">
        <MusicDetail :musicList="playList[playListIndex]" :playMusic="playMusic" :isbtnShow="isbtnShow" :addDuration="addDuration" :updateAudioCtime="updateAudioCtime"></MusicDetail>
    </van-popup>
</template>
<script>
// 利用辅助函数从vuex中获取歌单列表数据
import { mapMutations, mapState } from 'vuex';
import MusicDetail from "@/components/item/MusicDetail.vue"
export default {
    components: {
        MusicDetail
    },
    data(){
        return {
            // 这个值用来控制在暂停的时候清除掉定时器
            interVal:0
        }
    },
    computed: {
        // 解构从vuex中获取的数据
        ...mapState(['playList', 'playListIndex', "isbtnShow", "detailShow"])
    },
    // update里面存放歌词,每次切换歌曲的时候都要去获取歌词的数据，但是这样会在页面发生改变时就获取，点击播放暂停多次获取，不推荐
    // 页面发生改变的时候,就获取一下总时长
    updated(){
        this.addDuration()
    },
    // mounted里面也要存放歌词,这样在一开始的时候也要把默认歌曲的歌词获取了
    mounted() {
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
    },
    methods: {
        // 用于点击进度条的时候修改当前歌曲的时间
        updateAudioCtime(time){
            this.$refs.audio.currentTime=time
            this.updateCurrentTime(this.$refs.audio.currentTime)
        },
        // 添加总时长
        addDuration(){
            this.updateDuration(this.$refs.audio.duration)
        },
        playMusic() {
            // 判断音乐是否播放
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                this.updateIsbtnShow(false);
                // 在播放音乐的时候，开始触发定时器，去不断获取当前音乐播放时间
                this.updateTime()
            } else {
                this.$refs.audio.pause();
                this.updateIsbtnShow(true);
                // 暂停的时候要清除掉计时器
                clearInterval(this.interVal)
            }
        },
        ...mapMutations(['updateIsbtnShow', 'updateDetailShow','updateCurrentTime',"updateDuration"]),
        // 定义一个定时器。用来不断的去触发获取audio中currentTime值并传给vuex的功能
        updateTime(){
            // this.addDuration();
            this.interVal=setInterval(() => {
                this.updateCurrentTime(this.$refs.audio.currentTime)
            }, 1000);
        }
    },


    watch: {
        playList() { // 利用watch来监听歌曲列表,实现在点击歌曲的时候索引改变进而实现自动播放
            // 但是这里如果监听索引的话,会发生问题,因为索引默认为0.下次还放第一首歌就没改变,就不会自动播放
            this.$refs.audio.autoplay = true;
  
            // 歌曲列表发生改变时就去请求一次歌词的数据
            this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
            // 点击列表播放也要去获取currentTime了
            this.updateTime()
            // 改变歌曲的时候自动播放也要把对应的播放按钮样式改变了
            if (this.$refs.audio.paused) {
                this.updateIsbtnShow(false)
            }
        },
        playListIndex(){
            // this.addDuration()
            this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
        }
        
    },
    // 解构从vuex中获取的方法

}
</script>
<style lang="less" scoped>
.footerMusic {
    width: 100%;
    height: 1.4rem;
    background-color: white;
    position: fixed;
    bottom: 0;
    border-top: .02rem solid #999;
    display: flex;
    padding: .2rem;
    justify-content: space-between;

    .footerLeft {
        height: 100%;
        width: 60%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }

        div {
            height: 100%;
            width: 100%;
            // 设置当歌名太长超过两行时自动隐藏超出部分
            p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp:2;
            }
        }
    }

    .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .icon {
            width: .6rem;
            height: .6rem;
        }
    }
}
</style>