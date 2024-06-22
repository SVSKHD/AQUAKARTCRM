<template>
    <q-card class="row justify-between" flat bordered>
      <q-card-section class="col-xs-12 col-sm-12 col-lg-4 col-md-4 bg-primary">
        <chat-tabs>
          <template v-slot:Chats>
            <div class="q-pa-xs">
              <q-list>
                <q-item v-for="(item,index) in fetchedFilterOnlIneUsers" clickable @click="handleConversations(item)" :key="index" class="bg-white text-dark chat-custom-list q-mb-sm">
                  <q-item-section avatar>
                    <q-avatar color="primary" text-color="white">
                      H
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{item}}</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-badge color="green"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </template>
        </chat-tabs>
      </q-card-section>

      <q-card-section class="col-xs-12 col-sm-12 col-lg-8 col-md-8">
        <chat-header />
        <chat-area />
        <chat-input/>
      </q-card-section>
    </q-card>
</template>

<script>
import { onMounted, ref , computed , watchEffect , onBeforeMount} from "vue";
import chatTabs from "./chatTabs.vue";
import chatHeader from "./chatHeader.vue";
import chatInput from "./chatInput.vue";
import chatArea from "./chatArea.vue";
import { io } from "socket.io-client";
import {useStore} from "vuex";
import useMessengerOPerations from "@/components/Messenger/chatOperations";
import notificationHelper from "@/helpers/notificationHelpers/notificationHelper";
import useSocketServices from "@/Services/SocketServices/SocketApi";
export default {
  components: { chatTabs, chatArea, chatHeader, chatInput },
  setup(){
    //Store
    const Store = useStore()
    //api services
    const {getAllChats , getAllUsers} = useSocketServices()

    let userChatData = computed(()=>Store.getters.chatData)
    let userId = ref("")
    //chat oprations

    const chatUserIdFetch = onBeforeMount(()=>{
      let data = JSON.parse(localStorage.getItem("chat-user"))
      userId.value=data.user._id
      getAllUsers().then((data)=>{
        console.log("chat users" , data.data)
      })
    })

    //variables
    let onlineUsers = ref([])
    let fetchedFilterOnlIneUsers = ref("")

    //socket initialization    
    let socket = io(process.env.VUE_APP_BASE_SOCKET_DIRECT);
    const socketChatOperations = onMounted(()=>{
      socket.emit("join-room", userId.value);
      socket.emit("came-online", userId.value);
      socket.on("online-users-updated", (users) => {
        console.log("users-online" , users)
        onlineUsers.value=users
        fetchedFilterOnlIneUsers.value=onlineUsers.value.filter((a)=>a!==userId.value && a!==null)
        console.log("js online" ,users, fetchedFilterOnlIneUsers.value , userId.value)
      });
    })

    watchEffect(()=>{
      socket.on("recieve-message",(message)=>{
        console.log(message)
      })
    })

    const handleConversations = (id) =>{
      console.log("conversations", id)

    }

    const sendNewMessage = async ()=>{
      const message = {
        chat: "",
        sender: userId.value,
        text: "hello",
      };
      socket.emit("send-message", {
        ...message,
        members: selectedChat.members.map((mem) => mem._id),
        createdAt: moment().format("DD-MM-YYYY hh:mm:ss"),
        read: false,
      });
    }
    watchEffect(()=>{
      socket.on("recieve-message",(message)=>{
        console.log("recieved-message" , message)
      })
    })
    return{
      //variables
      onlineUsers,
      fetchedFilterOnlIneUsers,
      //functions
      sendNewMessage,
      handleConversations
    }
  }
}
</script>
