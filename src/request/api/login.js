// 此文件用于发送登录请求和登录成功后的用户详情数据
import service from "..";
export function getPhoneLogin(data){
    return service({
        method:"get",
        url:`/login/cellphone?phone=${data.phone}&password=${data.pwd}`
    })
}
export function getUserDetail(id){
    return service({
        method:"get",
        url:`/user/detail?uid=${id}`
        
    })
}