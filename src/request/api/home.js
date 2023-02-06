// 此文件用来做首页获取api数据的操作
import service from "..";
// 获取首页轮播图数据
export function getBanner() {
    return service({
        method:"get",
        url:"banner?type=2"
    })
}
// 获取发现好歌单的数据
export function getMusicList(){
    return service({
        method:"get",
        url:"personalized?limit=10"
    })
}