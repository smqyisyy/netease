// 本文件用来获取歌单详情页的数据
import service from "..";
export function getMusicItemList(id){
    return service({
        url:'playlist/detail?id='+id,
        method:"get"
    })
}
export function getItemList(id){
    return service({
        url:`playlist/track/all?id=${id}+&limit=20&offset=0`,
        method:"get"
    })
}
export function getMusicLyric(id){
    return service({
        url:`lyric?id=${id}`,
        method:"get"
    })
}
