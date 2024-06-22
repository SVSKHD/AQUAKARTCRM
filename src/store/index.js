import { createStore } from "vuex";

export default createStore({
  state: {
    miniState: false,
    token: null, // token to store from user object to acesss every where.
    userStatus: false, //boolean for user login,
    userName: "",
    user: null, // save user object,
    role: null, // save the role.
    chatId:null,
    chatData:""
  },
  getters: {
    miniState: (state) => state.miniState,
    token: (state) => {
      if (state.user) {
        return state.user.jwtToken;
      } else {
        return null;
      }
    },
    userStatus: (state) => state.userStatus,
    userName: (state) => state.userName,
    user: (state) => {
      if (state.user) {
        return state.user;
      } else {
        return null;
      }
    },
    role: (state) => {
      if (state.role) {
        return state.role;
      } else {
        return null;
      }
    },
    chatId:(state)=>{
      if(state.chatId){
        return state.chatId
      }else{
        return null
      }
    },
    chatData:(state)=>{
      if(state.chatData){
        return state.chatData
      }else{
        return null
      }
    }
  },
  mutations: {
    setMiniState(state, payload) {
      state.miniState = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setUserStatus(state, payload) {
      state.userStatus = payload;
    },
    setUserData(state, payload) {
      state.user = payload;
    },
    setRole(state, payload) {
      state.role = payload;
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    setChatId(state,payload){
      state.chatId=payload
    },
    setChatData(state,payload){
      state.chatData=payload
    }
  },
  actions: {
    manipulateMiniState(context, data) {
      context.commit("setMiniState", data);
    },
    loginUser(context, data) {
      if (data) {
        context.commit("setToken", data.jwtToken);
        context.commit("setUserStatus", true);
        context.commit("setUserData", data);
        context.commit("setUserName", data.cusUserTxt);
      }
    },
    logoutUser(context) {
      context.commit("setToken", null);
      context.commit("setUserStatus", false);
      context.commit("setToken", null);
      context.commit("setUserData", null);
    },
    roleAssign(context, data) {
      context.commit("setRole", data);
    },
    SaveUserName(context, data) {
      context.commit("setUserName", data);
    },
    setChatId(context , data){
      context.commit("setChatId", data)
    },
    setChatData(context , data){
      context.commit("setChatData" , data)
    }
  },
});
