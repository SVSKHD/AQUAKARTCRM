import Axios from "axios";

let socketUrl = process.env.VUE_APP_BASE_SOCKET;
let socketBaseUrl = process.env.VUE_APP_BASE_SOCKET_DIRECT


let headers={
  authorization: `Bearer ${localStorage.getItem("chat-token")}`,
}

//user register
const userSocketRegister = async (name) =>
  await Axios.post(`${socketUrl}/users/users-login`, name , headers);
//save send message
const sendMessageSave = async(message)=>(
    await Axios.post(`${socketUrl}/messages/new-message`, message)
)
//retrieve messages
const getMessages = async(id)=>(
    await Axios.get(`${socketUrl}/messages/get-all-messages/${id}`)
)
//retreive chats
const getAllChats = async()=>(
  await Axios.get(`${socketUrl}/chats/get-all-chats` , headers)
)
//create a new chat
const createNewChat = async(members) =>(
  await Axios.post(`${socketUrl}/chats/create-new-chat` , {members})
)
//clear messages
const clearChatMessages = async(chatId)=>(
  await Axios.post(`${socketUrl}/chats/clear-unread-messages`,{chat:chatId})
)

const getAllUsers = async () => await Axios.get(`${socketUrl}/users/get-all-users`);
const useSocketServices = () => {
  return {
    userSocketRegister,
    getAllUsers,
    sendMessageSave,
    getMessages,
    getAllChats,
    createNewChat,
    clearChatMessages
  };
};

export default useSocketServices;
