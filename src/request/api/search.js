// 获取搜索页搜索的数据
import service from ".."
export function searchMusic(keyWord){
    return service({
        url:`/search?keywords=${keyWord}`,
        method:'get'
    })
}