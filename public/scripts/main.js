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
           date: "",
           typing: false,
           connection: 0
       },
       

       created: function() {
           console.log('its alive!!');
           socket.on('connection',(data)=>{
               this.connections = data;
           })
           

       },
       
       created() {
        socket.on('typing', (data) => {
            this.typing = data;
        })

        socket.on('stoptyping', () => {
            this.typing = false;
        })
    },

    watch: {

        message(value) {
            value ? socket.emit('typing', this.username || "anonymous") : socket.emit('stoptyping')
        }
    },


       methods: {
        dispatchMessage(){
            // debugger;
            socket.emit('chatmessage', { content: this.message, name: this.nickname || 'Anonymous', date: this.date });

            this.message = "";
            this.date = new Date().toString().slice(15, 24);
            
            // this.timestamp = new Date().getTime();

            // socket.on("typing", (data) => {
            //     this.typing = data;
            //   });
          
            //   socket.on("stopTyping", () => {
            //     this.typing = false;
            //   });
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