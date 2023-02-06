<template>
    <div>
        <!-- 绑定playList，props传参 -->
        <ItemMusicTop :playList="state.playList"></ItemMusicTop>
        <!-- 传歌单里的歌曲以及歌单的收藏量 -->
        <ItemMusicList :songList="state.songList" :subscribedCount="state.playList.subscribedCount"></ItemMusicList>
    </div>
</template>
<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getMusicItemList,getItemList } from "@/request/api/item";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue"
import ItemMusicList from "@/components/item/ItemMusicList.vue"
export default {
    setup() {
        const state = reactive({
            playList: { // 歌单详情页数据
            },
            songList:[] // 歌单里歌曲的数据
        })
        onMounted(async () => {
            let id = useRoute().query.id;
            // 获取歌单详情
            let res = await getMusicItemList(id)
            state.playList = res.data.playlist
            // console.log(state.playList);
            // 获取歌单的歌曲
            let result =await getItemList(id)
            state.songList=result.data.songs
            // console.log(state.songList);
        })
        return {
            state
        }
    },
    components:{
        ItemMusicTop,
        ItemMusicList

    }
}
</script>
