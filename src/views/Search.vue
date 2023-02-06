<template>
    <div class="searchTop">
        <div>
            <svg class="icon " aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
        </div>
        <!-- 搜索框 -->
        <input type="text" placeholder="陈奕迅" @keyup.enter="enterKey" v-model="searchKey" />
    </div>
    <!-- 搜索历史记录 -->
    <div class="searchHistory">
        <span class="history">历史</span>
        <!-- 点击历史记录也可以进行搜索 -->
        <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchByHistory(item)">{{ item }}</span>
        <svg class="icon " aria-hidden="true" @click="clearHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <!-- 搜索结果展示 -->
    <div class="itemList">
        <div class="item" :class="{ 'itemLast': i + 1 === searchList.length }" v-for="(song, i) in searchList" :key="i">
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
</template>
<script>
import { searchMusic } from "@/request/api/search";
export default {
    data() {
        return {
            // 搜索历史
            keyWordList: [],
            // 搜索关键字
            searchKey: "",
            // 搜索结果
            searchList: [],
        }
    },
    mounted() {
        // 页面挂载的时候把localstorage中的历史记录拿出来,要加|| '[]'，这样在localStorage里没有数据的时候不会报错
        this.keyWordList = JSON.parse(localStorage.getItem('keyWordList') || '[]')
    },
    methods: {
        // 点击搜索到的歌曲进行播放音乐
        playMusic(num){
            this.$store.commit("updatePlayList",this.searchList)
            this.$store.commit("updatePlayListIndex",num)
        },
        async enterKey() {
            // 用户输入的数据处理掉前后空格之后不为0才能输入
            if (this.searchKey.trim().length != 0) {
                // 用unshift把搜索的放到数组第一个位置，第一个展示
                this.keyWordList.unshift(this.searchKey.trim());
                // 列表去重
                this.keyWordList = [...new Set(this.keyWordList)]
                // 固定长度为7个
                if (this.keyWordList.length > 7) {
                    this.keyWordList.pop()
                }
                // 请求搜索到的数据
                let res = await searchMusic(this.searchKey.trim())
                // 赋值
                this.searchList = res.data.result.songs
                // 解决每次刷新了就没有历史记录问题，要保存到localstorage里面
                localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList))
                this.searchKey = "";
            }
        },
        clearHistory() {
            // 删除列表
            this.keyWordList = []
            // 删除localstorage数据
            localStorage.removeItem("keyWordList")
        },
        // 通过历史记录搜索
        async searchByHistory(item) {
            let res = await searchMusic(item)
            // 赋值
            this.searchList = res.data.result.songs
            // console.log(this.searchList);
        }
    }
}
</script>
<style lang="less" scoped>
.searchTop {
    display: flex;
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    align-content: center;
    .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: #999;
    }
    input {
        border: none;
        border-bottom: .02rem solid #999;
        margin-left: .5rem;
        width: 80%;
        padding: .1rem;
    }
}
.searchHistory {
    width: 100%;
    height: 1.8rem;
    padding: .2rem;
    position: relative;
    overflow: hidden;

    .history {
        font-weight: 700;
        margin-right: .2rem;
    }

    .spanKey {
        padding: .1rem .15rem;
        background-color: rgb(225, 212, 212);
        border-radius: .4rem;
        margin: .1rem .2rem .1rem .1rem;
        // 搜索记录过多时，样式的处理,变成inline-block就好
        display: inline-block;
    }

    .icon {
        width: 0.45rem;
        height: 0.45rem;
        fill: #999;
        position: absolute;
        right: .2rem;
        top: .34rem;
    }
}
.itemList {
    width: 100%;
    padding-left: .4rem;
    padding-right: .4rem;
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
</style>