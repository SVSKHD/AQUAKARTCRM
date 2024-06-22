import {ref} from "vue"
import moment from "moment"
import useSocketServices from "@/Services/SocketServices/SocketApi";


let userMessengerStatus  = ref(false)
const {sendMessageSave} = useSocketServices()
const OnlineUsersStatus = (socket , userId , onlineUsers , fetchedUsers , id) =>{
    socket.emit("join-room", userId);
    socket.emit("came-online", userId);
    socket.on("online-users-updated", (users) => {
        users.map(r=>{
            onlineUsers.push(r)
        })
        fetchedUsers=onlineUsers.filter((data)=>data==id)
        console.log("js online" ,users , onlineUsers , fetchedUsers)
    });
}

const SendMessage = async(message , socket , member ) =>{
socket.emit("send-message" , {
    ...message,
    members:member,
    createdAt:moment().format("DD-MM-YYYY hh:mm:ss"),
    read:false
})
    const response = await sendMessageSave(message)
    console.log(response)
}

const recieveMessage = (socket) =>{
    socket.on("receieve-message" ,(message)=>{

    })
}

const getDateInRegualarFormat = (date) => {
    let result = "";

    // if date is today return time in hh:mm format
    if (moment(date).isSame(moment(), "day")) {
        result = moment(date).format("hh:mm");
    }
    // if date is yesterday return yesterday and time in hh:mm format
    else if (moment(date).isSame(moment().subtract(1, "day"), "day")) {
        result = `Yesterday ${moment(date).format("hh:mm")}`;
    }
    // if date is this year return date and time in MMM DD hh:mm format
    else if (moment(date).isSame(moment(), "year")) {
        result = moment(date).format("MMM DD hh:mm");
    }

    return result;
};

const useMessengerOPerations = () =>{
    return{
        //variables
        userMessengerStatus,
        //functions
        OnlineUsersStatus,
        SendMessage,
        recieveMessage,
        getDateInRegualarFormat
    }
}

export default useMessengerOPerations
