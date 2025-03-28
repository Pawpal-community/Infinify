"use client";

import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Link from "next/link";
import { MagnifyingGlassIcon as OutlineMagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Outline version
import {
  setNewMessage,
  setTotalUnreadMessages,
  sumChatUnreadMessages,
  setOneChat,
} from "@/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChatMessage } from "@/types";
import { socket } from "@/socket-io/socket";
import { useRouter } from "next/navigation";

import { Chats } from "@/types";

export interface receivedMessage {
  chat: {
    id: string;
    last_message_at: string;
  };
  message: ChatMessage;
  recipients: string[];
}

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userReducer?.user?.user.id);
  const chats = useAppSelector((state) => state.chatsReducer?.user_chats);


  // Manejar conexión/desconexión del socket
  useEffect(() => {
    if (!userId) return;

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [userId]);

  // Configurar listeners permanentes
  useEffect(() => {
    if (!userId) return;

    const onConnect = () => {
      console.log("Socket connected:", socket.id);
      socket.emit("user_online", userId);
      // Unirse a las salas con los chats actualizados
      chats?.forEach((chat) => {
        socket.emit("join_room", chat.chatInfo.id);
        console.log(`Joining room: ${chat.chatInfo.id}`);
      });
    };

    const onDisconnect = () => {
      console.log("Socket disconnected");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [userId, chats]);

  // Manejar mensajes entrantes
  useEffect(() => {
    const onReceiveMessage = (data: receivedMessage) => {
      console.log("Message received:", data);
      dispatch(setNewMessage(data.message));
      dispatch(setTotalUnreadMessages(1));
      dispatch(
        sumChatUnreadMessages({
          chatId: data.chat.id,
          numberToSum: 1,
        })
      );
    };

    socket.on("receive_message", onReceiveMessage);

    return () => {
      socket.off("receive_message", onReceiveMessage);
    };
  }, [dispatch]);

  useEffect(() => {
    const onNewChatNotification = async (data: Chats) => {
      console.log("New chat notification:", data);
        
        dispatch(setOneChat(data));
        socket.emit("join_room", data.chatInfo.id);
        console.log(`Joining new chat room: ${data.chatInfo.id}`);

        if(data.chat_participants[1].user_id !== userId){
          router.push(`/chats/${data.chatInfo.id}`);
        }

    };

    socket.on("new_chat_notification", onNewChatNotification);

    return () => {
      socket.off("new_chat_notification", onNewChatNotification);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId, chats,]);

  return (
    <header className="bg-spotify-dark-gray px-8 py-6 flex justify-between">
      <div className="flex justify-between gap-24 w-[180%] md:w-[10%]">
        <Link href={`/`}>
          <h2 className="text-2xl font-bold text-spotify-green">Infinify</h2>
        </Link>
        <Link href={`/search`} className="md:hidden">
            <OutlineMagnifyingGlassIcon className="h-10 w-12 text-spotify-white"/>
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
