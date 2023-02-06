function remSize() {
    // 获取设备的宽度
    var deviceWidth=document.documentElement.clientWidth || window.innerWidth
    // 设备太宽或者太窄都不可以。
    if (deviceWidth>=750) {
        deviceWidth=750
    }
    if (deviceWidth<=320) {
        deviceWidth=320
    }
    //  设置rem的值 750px宽度下，字体大小为750/7.5=100px 1rem=100px
    document.documentElement.style.fontSize=(deviceWidth/7.5)+'px'
    // 设置字体大小,通过js原生元素选择器，选中body标签
    document.querySelector('body').style.fontSize=0.3+"rem"
}
remSize()
// 窗口大小发生变化时，调用字体调整的函数
window.onresize=function () {
    remSize()
}