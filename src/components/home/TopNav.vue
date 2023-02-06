<template>
    <div class="topNav">
        <div>
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
        </svg>
        </div>
    
    <div class="topContent">
        <div @click="$router.push('/userinfo')">我的</div>
        <div class="active">发现</div>
        <div>云村</div>
        <div>视频</div>
    </div>
    <div>
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
            <use xlink:href="#icon-sousuo"></use>
        </svg>
    </div>
</div>
</template>
<style lang="less" scoped>
.topNav{
    width: 100%;
    padding: .2rem;
    height: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .topContent{
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        // align-items: center;
        font-size: .36rem;
        .active {
            font-weight: 900;
        }
    }
}
</style>