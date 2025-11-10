// import { ref, onMounted, onUnmounted } from "vue";
// import { io, Socket } from "socket.io-client";
// import { useUser } from "@/composables/auth/user";
// import { useGetRoomChats } from '@/composables/modules/messages/fetchRoomMessages';
// import { useCustomToast } from '@/composables/core/useCustomToast'
// const { showToast } = useCustomToast();

// export const useWebSocket = () => {
//   const { token } = useUser();
//   const messages = ref<any[]>([]);
//   const { getRoomChats } = useGetRoomChats();
//   const newMessage = ref("");
//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   const isConnected = ref(false);
//   const socket = ref<Socket | null>(null);

//   const initializeSocket = () => {
//     socket.value = io(baseUrl, {
//       auth: {
//         token: token.value,
//       },
//       transports: ["websocket"],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     // Connection events
//     socket.value.on("connect", () => {
//       // console.log("Connected to WebSocket server");
//       showToast({
//         title: "Success",
//         message: "Connection was successful",
//         toastType: "success",
//         duration: 3000
//       });
//       isConnected.value = true;
//       fetchInitialMessages();
//     });

//     socket.value.on("disconnect", () => {
//       console.log("Disconnected from server");
//       showToast({
//         title: "Error",
//         message: "Disconnected from websocket.",
//         toastType: "error",
//         duration: 3000
//       });
//       isConnected.value = false;
//     });

//     socket.value.on("error", (error) => {
//       showToast({
//         title: "Error",
//         message: "Connection error:",
//         toastType: "error",
//         duration: 3000
//       });
//       isConnected.value = false;
//     });

//     // Message handling
//     // socket.value.on("message.new", (message: any) => {
//     //   console.log("New message received:", message);
//     //   if (message && !messages.value.some(msg => msg.id === message?.message?.id)) {
//     //     messages.value = [...messages.value, {
//     //       ...message,
//     //       status: 'received'
//     //     }];
//     //   }
//     // });
//     socket.value.on("message.new",  async (message: any) => {
//       console.log("New message receivedssssssss:", message.message);
//       await fetchInitialMessages();
//       if (message && !messages.value.some(msg => msg.id === message?.message?.id)) {
//         const newMessage = {
//           ...message.message, // Use only the message object
//           status: 'received' // Set the status here
//         };
//         messages.value = [...messages.value, newMessage];
//       }
//     });

//     socket.value.on("messages.update", (updatedMessages: any[]) => {
//       console.log("Messages updated:", updatedMessages);
//       messages.value = updatedMessages.map(msg => ({
//         ...msg,
//         status: 'received'
//       }));
//     });
//   };

//   const fetchInitialMessages = () => {
//     if (!socket.value?.connected) return;

//     socket.value.emit("messages.fetch", {}, (response: any) => {
//       if (response.status === "success") {
//         messages.value = response.data.map((msg: any) => ({
//           ...msg,
//           status: 'received'
//         }));
//       } else {
//         console.error("Failed to fetch messages:", response);
//       }
//     });
//   };

//   const sendMessage = async (payload: {
//     recipientId: string;
//     recipientType: string;
//     content: string;
//     room?: string;
//     messageType: string;
//   }) => {
//     if (!socket.value?.connected) {
//       console.error("Socket not connected");
//       return;
//     }

//     // Create temporary message
//     const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(7)}`;
//     const tempMessage = {
//       id: tempId,
//       ...payload,
//       status: 'sending',
//       timestamp: new Date().toISOString(),
//     };

//     // Add to messages immediately
//     messages.value = [...messages.value, tempMessage];

//     // Send message
//     return new Promise((resolve, reject) => {
//       socket.value?.emit("message.new", payload, (response: any) => {
//         if (response.status === "success") {
//           // Update temp message with actual message data
//           messages.value = messages.value.map(msg => 
//             msg.id === tempId 
//               ? { ...response.data, status: 'sent' }
//               : msg
//           );

//           // Update room chats if needed
//           if (payload.room) {
//             getRoomChats(response?.data?.room?.id);
//           }

//           // Emit custom event if needed
//           const { $emitter } = useNuxtApp();
//           $emitter.emit('messageSent', {
//             roomId: response?.data?.room?.id,
//             message: response?.data
//           });

//           resolve(response.data);
//         } else {
//           // Update temp message to show error
//           messages.value = messages.value.map(msg => 
//             msg.id === tempId 
//               ? { ...msg, status: 'error' }
//               : msg
//           );

//           console.error("Failed to send message:", response);
//           reject(new Error(response.message || 'Failed to send message'));
//         }
//       });
//     });
//   };

//   onMounted(() => {
//     initializeSocket();
//   });

//   onUnmounted(() => {
//     if (socket.value) {
//       socket.value.off("message.new");
//       socket.value.off("messages.update");
//       socket.value.disconnect();
//       socket.value = null;
//     }
//   });

//   return {
//     messages,
//     newMessage,
//     isConnected,
//     sendMessage,
//     socket: socket.value,
//   };
// };

import { ref, onMounted, onUnmounted } from "vue";
import { io, Socket } from "socket.io-client";
import { useUser } from "@/composables/auth/user";
import { useGetRoomChats } from '@/composables/modules/messages/fetchRoomMessages';
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

export const useWebSocket = () => {
  const { token } = useUser();
  // const messages = ref<any[]>([]);
  const messagesByRoom = ref<Record<string, any[]>>({});
  const activeRoomId = ref<string | null>(null);
  const { getRoomChats } = useGetRoomChats();
  const newMessage = ref("");
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const isConnected = ref(false);
  const socket = ref<Socket | null>(null);
  const messageStatus = ref<"idle" | "sending" | "sent" | "error">("idle");

  const currentRoomMessages = computed(() => {
    if (!activeRoomId.value) return [];
    return messagesByRoom.value[activeRoomId.value] || [];
  });

  const setActiveRoom = (roomId: string) => {
    activeRoomId.value = roomId;
    if (!messagesByRoom.value[roomId]) {
      messagesByRoom.value[roomId] = [];
    }
  };

  const initializeSocket = () => {
    socket.value = io(baseUrl, {
      auth: {
        token: token.value,
      },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection events
    socket.value.on("connect", () => {
      showToast({
        title: "Success",
        message: "Connection was successful",
        toastType: "success",
        duration: 3000
      });
      isConnected.value = true;

      if (activeRoomId.value) {
        fetchInitialMessages();
      }
    });

    socket.value.on("reconnect", () => {
      isConnected.value = true;
      if (activeRoomId.value) {
        fetchInitialMessages();
      }
    });

    socket.value.on("disconnect", () => {
      // showToast({
      //   title: "Error",
      //   message: "Disconnected from websocket.",
      //   toastType: "error",
      //   duration: 3000
      // });
      isConnected.value = false;
    });

    socket.value.on("error", (error) => {
      // console.error("Connection error:", error);
      // showToast({
      //   title: "Error",
      //   message: "Connection error:",
      //   toastType: "error",
      //   duration: 3000
      // });
      isConnected.value = false;
    });

    // Message handling
    // socket.value.on("message.new", (message: any) => {
    //   console.log("New message received:", message);
    //   if (message && !messages.value.some(msg => msg.id === message?.message?.id)) {
    //     messages.value = [...messages.value, {
    //       ...message,
    //       status: 'received'
    //     }];
    //   }
    // });
    socket.value.on("message.new", (message: any) => {
      console.log("New message received:", message.message);
      if (!message?.message) return;
      const roomId = message.message.room?.id || message.message.recipientId || null;
      if (!roomId) return;

      if (!messagesByRoom.value[roomId]) {
        messagesByRoom.value[roomId] = [];
      }

      if (!messagesByRoom.value[roomId].some(msg => msg.id === message.message.id)) {
        const updatedMessages = [...messagesByRoom.value[roomId], {
          ...message.message,
          status: 'received'
        }];

        messagesByRoom.value = {
          ...messagesByRoom.value,
          [roomId]: updatedMessages
        };

        if (activeRoomId.value === roomId) {
          getRoomChats(roomId);
        }
      }
    });

    socket.value.on("messages.update", (updatedMessages: any[]) => {
      console.log("Messages updated:", updatedMessages);

      const messageGroups: Record<string, any[]> = {};

      updatedMessages.forEach(msg => {
        const roomId = msg.room?.id || msg.recipientId;
        if (!roomId) return;

        if (!messageGroups[roomId]) {
          messageGroups[roomId] = [];
        }

        messageGroups[roomId].push({
          ...msg,
          status: 'received'
        });
      });

      messagesByRoom.value = { ...messagesByRoom.value, ...messageGroups };
    });
  };

  // const fetchInitialMessages = () => {
  //   if (!socket.value?.connected) return;

  //   socket.value.emit("messages.fetch", {}, (response: any) => {
  //     if (response.status === "success") {
  //       messages.value = response.data.map((msg: any) => ({
  //         ...msg,
  //         status: 'received'
  //       }));
  //     } else {
  //       console.error("Failed to fetch messages:", response);
  //     }
  //   });
  // };

  const fetchInitialMessages = async () => {
    if (activeRoomId.value) {
      try {
        await getRoomChats(activeRoomId.value);
      } catch (error) {
        console.error('Failed to fetch initial messages:', error);
      }
    }
  };

  const sendMessage = async (payload: {
  recipientId: string;
  recipientType: string;
  content: string;
  room?: string;
  messageType: string;
}) => {
  if (!socket.value?.connected) {
    console.error("Socket not connected");
    throw new Error("Socket not connected");
  }

  // Validate content
  if (!payload.content || payload.content.trim() === '') {
    console.error("Cannot send empty message");
    throw new Error("Cannot send empty message");
  }

  const roomId = payload.room || payload.recipientId;

  // Create optimistic UI update
  const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const tempMessage = {
    id: tempId,
    ...payload,
    status: 'sending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    senderId: useUser().user.value.id, // Add current user ID
  };

  // Initialize room messages if needed
  if (!messagesByRoom.value[roomId]) {
    messagesByRoom.value[roomId] = [];
  }

  // Add temp message to UI
  messagesByRoom.value = {
    ...messagesByRoom.value,
    [roomId]: [...messagesByRoom.value[roomId], tempMessage]
  };

  return new Promise((resolve, reject) => {
    // Set timeout for socket response
    const timeout = setTimeout(() => {
      // Update message status to error on timeout
      messagesByRoom.value = {
        ...messagesByRoom.value,
        [roomId]: messagesByRoom.value[roomId].map(msg =>
          msg.id === tempId
            ? { ...msg, status: 'error' }
            : msg
        )
      };
      reject(new Error('Message send timeout'));
    }, 30000); // 30 second timeout

    socket.value?.emit("message.new", payload, (response: any) => {
      clearTimeout(timeout);

      if (response.status === "success") {
        // Replace temp message with real message from server
        messagesByRoom.value = {
          ...messagesByRoom.value,
          [roomId]: messagesByRoom.value[roomId].map(msg =>
            msg.id === tempId
              ? { 
                  ...response.data, 
                  status: 'sent',
                  // Preserve the content to ensure file messages are properly formatted
                  content: payload.content
                }
              : msg
          )
        };

        // Fetch latest messages for the room
        if (payload.room) {
          getRoomChats(response?.data?.room?.id);
        }

        // Emit event for other components
        const { $emitter } = useNuxtApp();
        $emitter.emit('messageSent', {
          roomId: response?.data?.room?.id,
          message: response?.data
        });

        resolve(response.data);
      } else {
        // Update message status to error
        messagesByRoom.value = {
          ...messagesByRoom.value,
          [roomId]: messagesByRoom.value[roomId].map(msg =>
            msg.id === tempId
              ? { ...msg, status: 'error' }
              : msg
          )
        };

        console.error("Failed to send message:", response);
        reject(new Error(response.message || 'Failed to send message'));
      }
    });
  });
};


// Also add this helper function to retry failed messages
const retryMessage = async (messageId: string, roomId: string) => {
  const message = messagesByRoom.value[roomId]?.find(msg => msg.id === messageId);
  
  if (!message || message.status !== 'error') {
    console.error('Message not found or not in error state');
    return;
  }

  // Update status to sending
  messagesByRoom.value = {
    ...messagesByRoom.value,
    [roomId]: messagesByRoom.value[roomId].map(msg =>
      msg.id === messageId
        ? { ...msg, status: 'sending' }
        : msg
    )
  };

  // Retry sending
  try {
    await sendMessage({
      recipientId: message.recipientId,
      recipientType: message.recipientType,
      content: message.content,
      room: message.room,
      messageType: message.messageType
    });
  } catch (error) {
    console.error('Failed to retry message:', error);
    throw error;
  }
};

  // const sendMessage = async (payload: {
  //   recipientId: string;
  //   recipientType: string;
  //   content: string;
  //   room?: string;
  //   messageType: string;
  // }) => {
  //   if (!socket.value?.connected) {
  //     console.error("Socket not connected");
  //     return;
  //   }
  //   const roomId = payload.room || payload.recipientId;

  //   const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  //   const tempMessage = {
  //     id: tempId,
  //     ...payload,
  //     status: 'sending',
  //     timestamp: new Date().toISOString(),
  //   };

  //   if (!messagesByRoom.value[roomId]) {
  //     messagesByRoom.value[roomId] = [];
  //   }

  //   messagesByRoom.value = {
  //     ...messagesByRoom.value,
  //     [roomId]: [...messagesByRoom.value[roomId], tempMessage]
  //   };

  //   return new Promise((resolve, reject) => {
  //     socket.value?.emit("message.new", payload, (response: any) => {
  //       if (response.status === "success") {
  //         messagesByRoom.value = {
  //           ...messagesByRoom.value,
  //           [roomId]: messagesByRoom.value[roomId].map(msg =>
  //             msg.id === tempId
  //               ? { ...response.data, status: 'sent' }
  //               : msg
  //           )
  //         };

  //         if (payload.room) {
  //           getRoomChats(response?.data?.room?.id);
  //         }

  //         const { $emitter } = useNuxtApp();
  //         $emitter.emit('messageSent', {
  //           roomId: response?.data?.room?.id,
  //           message: response?.data
  //         });

  //         resolve(response.data);
  //       } else {
  //         messagesByRoom.value = {
  //           ...messagesByRoom.value,
  //           [roomId]: messagesByRoom.value[roomId].map(msg =>
  //             msg.id === tempId
  //               ? { ...msg, status: 'error' }
  //               : msg
  //           )
  //         };

  //         console.error("Failed to send message:", response);
  //         reject(new Error(response.message || 'Failed to send message'));
  //       }
  //     });
  //   });
  // };

  const markMessageAsRead = (roomId: string, recipientId: string) => {
    if (!socket.value?.connected) {
      console.error("Socket not connected");
      return;
    }

    const payload = { roomId, recipientId };

    socket.value.emit("message.read.all", payload, (response: any) => {
      if (response.status === "success" || response.success === "true") {
        // console.log(`msg read in ${roomId}`);
        // console.log(payload)
      } else {
        console.error("Failed to mark message as read:", response);
      }
    });
  };

  onMounted(() => {
    initializeSocket();
  });

  onUnmounted(() => {
    if (socket.value) {
      socket.value.off("message.new");
      socket.value.off("messages.update");
      socket.value.disconnect();
      socket.value = null;
    }
  });

  return {
    newMessage,
    isConnected,
    retryMessage, // Add this
    sendMessage,
    socket: socket.value,
    messagesByRoom,
    currentRoomMessages,
    setActiveRoom,
    activeRoomId,
    messageStatus,
    markMessageAsRead
  };
};