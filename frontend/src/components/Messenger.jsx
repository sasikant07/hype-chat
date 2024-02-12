import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import RightSide from "./RightSide";
import toast from "react-hot-toast";
import useSound from "use-sound";
import notificationSound from "../audio/message.mp3";
import sendingSound from "../audio/ding.mp3";

import {
  getFriends,
  messageSend,
  getMessage,
  imageMessageSend,
  sendSocketMessage,
} from "../store/reducers/messengerReducer";

const Messenger = () => {
  const dispatch = useDispatch();
  const { friends, message } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);
  const scrollRef = useRef();
  const socket = useRef();
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [socketMessage, setSocketMessage] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  const [notificationSoundPlay] = useSound(notificationSound);
  const [sendingSoundPlay] = useSound(sendingSound);

  const inputHandle = (e) => {
    setNewMessage(e.target.value);
    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      msg: e.target.value,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    sendingSoundPlay();

    const data = {
      senderName: myInfo.userName,
      receiverId: currentFriend._id,
      message: newMessage ? newMessage : "❤️",
    };
    socket.current.emit("sendMessage", {
      senderId: myInfo.id,
      senderName: myInfo.userName,
      receiverId: currentFriend._id,
      time: new Date(),
      message: {
        text: newMessage ? newMessage : "❤️",
        image: "",
      },
    });
    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      msg: "",
    });
    dispatch(messageSend(data));
    setNewMessage("");
  };

  const emojiSend = (emo) => {
    setNewMessage(`${newMessage}` + emo);
    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      msg: emo,
    });
  };

  const imageSend = (e) => {
    if (e.target.files.length !== 0) {
      sendingSoundPlay();
      const imageName = e.target.files[0].name;
      const newImageName = Date.now() + imageName;

      const formData = new FormData();
      formData.append("senderName", myInfo.userName);
      formData.append("receiverId", currentFriend._id);
      formData.append("image", e.target.files[0]);
      formData.append("imageName", newImageName);

      socket.current.emit("sendMessage", {
        senderId: myInfo.id,
        senderName: myInfo.userName,
        receiverId: currentFriend._id,
        time: new Date(),
        message: {
          text: "",
          image: newImageName,
        },
      });

      dispatch(imageMessageSend(formData));
    }
  };

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0]);
    }
  }, [friends]);

  useEffect(() => {
    dispatch(getMessage(currentFriend._id));
  }, [currentFriend?._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    socket.current = io("ws://localhost:8000");

    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
    });

    socket.current.on("typingMessageGet", (data) => {
      setTypingMessage(data);
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, []);

  useEffect(() => {
    socket.current.on("getUser", (users) => {
      const filterUser = users.filter((u) => u.userId !== myInfo.id);
      setActiveUsers(filterUser);
    });
  }, []);

  useEffect(() => {
    //
  }, []);

  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend._id &&
        socketMessage.receiverId === myInfo.id
      ) {
        dispatch(sendSocketMessage({ message: socketMessage }));
      }
    }
    setSocketMessage("");
  }, [socketMessage]);

  useEffect(() => {
    if (
      socketMessage &&
      socketMessage.senderId !== currentFriend._id &&
      socketMessage.receiverId === myInfo.id
    ) {
      notificationSoundPlay();
      toast(`${socketMessage.senderName} \n ${socketMessage.message.text}`, {
        duration: 10000,
        position: "bottom-right",
      });
    }
  }, [socketMessage]);

  return (
    <div className="messenger">
      {/* <Toaster 
        position={"bottom-right"}
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "18px"
          }
        }}
      /> */}
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`/images/${myInfo.image}`} alt="" />
                </div>
                <div className="name">
                  <h3>{myInfo.userName}</h3>
                </div>
              </div>
              <div className="icons">
                <div className="icon">
                  <BsThreeDots />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>
            <div className="friend-search">
              <div className="search">
                <button>
                  <BiSearch />
                </button>
                <input
                  type="text"
                  className="form-control"
                  placeholder="search"
                />
              </div>
            </div>
            <div className="active-friends">
              {activeUsers && activeUsers.length > 0
                ? activeUsers.map((u) => (
                    <ActiveFriend
                      setCurrentFriend={setCurrentFriend}
                      user={u}
                    />
                  ))
                : ""}
            </div>
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentFriend(fd)}
                      className={
                        currentFriend._id === fd._id
                          ? `hover-friend active`
                          : `hover-friend`
                      }
                    >
                      <Friends friend={fd} />
                    </div>
                  ))
                : "No Friends Found!"}
            </div>
          </div>
        </div>
        {currentFriend ? (
          <RightSide
            currentFriend={currentFriend}
            newMessage={newMessage}
            inputHandle={inputHandle}
            sendMessage={sendMessage}
            message={message}
            scrollRef={scrollRef}
            emojiSend={emojiSend}
            imageSend={imageSend}
            activeUsers={activeUsers}
            typingMessage={typingMessage}
          />
        ) : (
          "Please select a friend to chat"
        )}
      </div>
    </div>
  );
};

export default Messenger;
