<template>
    <div class="userInfoTop">
    <img :src="user.avatarUrl" class="user-img"> 
    <div class="nickname">
        {{ user.nickname }}
    </div>
</div>
</template>
<script>
// import { mapState } from 'vuex';

export default {
    data() {
        return {
            user:JSON.parse(localStorage.getItem('user'))
        }
    },
    mounted(){
        console.log(this.user);
    }
    ,
    computed: {
        // ...mapState(['user']), 
    }
}
</script>
<style lang="less" scoped>
.userInfoTop{
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    
.user-img{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
}
.nickname{
    font-weight: 700;
    font-size: .4rem;
}
}
</style>