import ChatMessage from "./components/TheMessageComponents.js"

(() => {
    console.log('fired');

    // load the socket library and make a connection
    const socket = io();

    // messenger service event handling -> incoming from the manager
    function setUserId({sID, message}) {
        // incoming connected event with data
        // debugger;

        vm.socketID = sID;
    }

    function appendMessage(message) {
        vm.messages.push(message);
    }


   const vm = new Vue ({
       data: {
           messages: [],
           nickname: "",
           username: "",
           socketID: "",
           message: "",
           users: [],
           typing: false,
           connection: 0
       },
       

       created: function() {
           console.log('its alive!!');
           socket.on('connection',(data)=>{
               this.connections = data;
           })
       },

       methods: {
        dispatchMessage(){
            // debugger;
            socket.emit('chatmessage', { content: this.message, timeStamp: this.timestamp, name: this.nickname || "Anonymous" });

            this.message = "";
            this.timestamp = new Date().getTime();

            socket.on("typing", (data) => {
                this.typing = data;
              });
          
              socket.on("stopTyping", () => {
                this.typing = false;
              });
        },

        // watch: {
        //     message(value) {
        //       value ? socket.emit("typing", this.socketID) : socket.emit("stopTyping");
        //     },
        //   },
        
       },
      
      components: {
          newmessage: ChatMessage
      },
      
   }) .$mount("#app");

   socket.addEventListener("connected", setUserId);
   socket.addEventListener("message", appendMessage);

})();