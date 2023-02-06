import { createStore } from 'vuex'
// 当前播放的歌单列表应该为全局数据，适合放在vuex里面
import { getMusicLyric } from "@/request/api/item";
import { getPhoneLogin } from "@/request/api/login";
export default createStore({
  state: {
    playList: [{
      name: '恋爱考验',
      al: {
        id: 155288868,
        name: "冬天温柔我心窝",
        pic: 109951168079035100,
        picUrl: "https://p2.music.126.net/fG6uih8wM3olLS7dFI7frQ==/109951168079035110.jpg",
        pic_str: "109951168079035110"
      },
      ar: [{
        "id": 91214,
        "name": "Discodeine",
        "tns": [],
        "alias": []
      }
      ],
      id: 863956318
    }],
    playListIndex: 0, // 数组默认下标为0
    isbtnShow: true, // 播放按钮样式的判断，判断是暂停还是开始,默认为true表示为暂停
    detailShow: false, // 歌单详情页的弹出是否要显示
    lyricList: {}, // 歌词
    currentTime: 0, // 当前歌曲播放的时间,默认为0
    duration: 129.854694, // 歌曲总时长，默认为129.854694
    isLogin: false, // 判断是否登录，最开始是没有登录的
    isFooterShow: true,  // 判断底部的播放栏组件是否显示，因为登录页面是不需要显示底部组件的
    token:'', // 登录成功后会得到token值，用来保存登录状态
    user:{}  // 用户detail信息
  },
  getters: {
  },
  // vuex全局的数据要用mutations来修改,方便数据追踪
  mutations: {
    // 修改按钮的bool值
    updateIsbtnShow(state, value) {
      state.isbtnShow = value
    },
    updatePlayList(state, value) {
      state.playList = value
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList(state, value) {
      state.lyricList = value
    },
    updateCurrentTime(state, value) {
      // console.log(value);
      state.currentTime = value
    },
    updateDuration(state, value) {
      // console.log(value);
      state.duration = value
    },
    updateIslogin(state,value){
      state.isLogin=value
    },
    updateIsFooterShow(state, value) {
      state.isFooterShow = value
    },
    updateToken(state,value){
      state.token=value
    },
    updateUser(state,value){
      state.user=value
    }
  },
  // actions中处理异步请求
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value)
      // console.log(res);
      // actions提交数据的方法
      // console.log(res.data.lrc);
      context.commit("updateLyricList", res.data.lrc)
    },
    async getPhoneLogin(context,value){
      let res=await getPhoneLogin(value);
      return res
    }
  },
  modules: {
  }
})
