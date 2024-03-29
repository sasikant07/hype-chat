import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BsThreeDots } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
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
  updateFriendMessage,
  messageClear,
  seenMessage,
  updateMessage,
  messegeSeen,
  messageDelivered,
  updateFriend,
  messageGetSuccessClear,
  seenAll,
  getTheme,
  themeSet,
  logoutClearMessage,
  newUserAdd,
  newUserAddClear,
} from "../store/reducers/messengerReducer";
import { userLogout } from "../store/reducers/authReducer";

const Messenger = () => {
  const dispatch = useDispatch();
  const {
    friends,
    message,
    messageSendSuccess,
    messageGetSuccess,
    theme,
    newUserAdded,
  } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);
  const scrollRef = useRef();
  const socket = useRef();
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [socketMessage, setSocketMessage] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  const [hide, setHide] = useState(false);
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

  const search = (e) => {
    const getFriendClass = document.getElementsByClassName("hover-friend");
    const friendnameClass = document.getElementsByClassName("friend-name");

    for (
      let i = 0;
      i < getFriendClass.length, i < friendnameClass.length;
      i++
    ) {
      let text = friendnameClass[i].innerText.toLowerCase();

      if (text.indexOf(e.target.value.toLowerCase()) > -1) {
        getFriendClass[i].style.display = "";
      } else {
        getFriendClass[i].style.display = "none";
      }
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    sendingSoundPlay();

    const data = {
      senderName: myInfo.userName,
      receiverId: currentFriend._id,
      message: newMessage ? newMessage : "❤️",
    };

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

      dispatch(imageMessageSend(formData));
    }
  };

  useEffect(() => {
    dispatch(getFriends());
    dispatch(newUserAddClear());
  }, [newUserAdded]);

  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0].fndInfo);
    }
  }, [friends]);

  useEffect(() => {
    dispatch(getMessage(currentFriend._id));
  }, [currentFriend?._id]);

  useEffect(() => {
    if (message.length > 0) {
      if (
        message[message.length - 1].senderId !== myInfo.id &&
        message[message.length - 1].status !== "seen"
      ) {
        dispatch(updateFriend({ id: currentFriend._id }));
        socket.current.emit("seen", {
          senderId: currentFriend._id,
          receiverId: myInfo.id,
        });
        dispatch(seenMessage({ _id: message[message.length - 1]._id }));
      }
    }
    dispatch(messageGetSuccessClear());
  }, [messageGetSuccess]);

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

    socket.current.on("msgSeenResponse", (msg) => {
      dispatch(messegeSeen({ msgInfo: msg }));
    });

    socket.current.on("msgDeliveredResponse", (msg) => {
      dispatch(messageDelivered({ msgInfo: msg }));
    });

    socket.current.on("seenSuccess", (data) => {
      dispatch(seenAll(data));
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
    socket.current.on("newUserAdd", (data) => {
      dispatch(
        newUserAdd({
          newUser: data,
        })
      );
    });
  }, []);

  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend._id &&
        socketMessage.receiverId === myInfo.id
      ) {
        dispatch(sendSocketMessage({ message: socketMessage }));
        dispatch(seenMessage(socketMessage));
        socket.current.emit("messageSeen", socketMessage);
        dispatch(
          updateFriendMessage({
            msgInfo: socketMessage,
            status: "seen",
          })
        );
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
      dispatch(updateMessage(socketMessage));
      socket.current.emit("deliveredMessage", socketMessage);
      dispatch(
        updateFriendMessage({
          msgInfo: socketMessage,
          status: "delivered",
        })
      );
    }
  }, [socketMessage]);

  useEffect(() => {
    if (messageSendSuccess) {
      socket.current.emit("sendMessage", message[message.length - 1]);
      dispatch(
        updateFriendMessage({
          msgInfo: message[message.length - 1],
        })
      );
      dispatch(messageClear());
    }
  }, [messageSendSuccess]);

  const logout = () => {
    dispatch(userLogout());
    dispatch(logoutClearMessage());
    socket.current.emit("logout", myInfo.id);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    let mode = theme ? theme : "white";
    dispatch(
      getTheme({
        theme: mode,
      })
    );
  }, []);

  return (
    <div className={theme === "dark" ? "messenger theme" : "messenger"}>
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
                <div onClick={() => setHide(!hide)} className="icon">
                  <BsThreeDots />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
                <div className={hide ? "theme-logout show" : "theme-logout"}>
                  <h3>Dark Mode</h3>
                  <div className="on">
                    <label htmlFor="dark">ON</label>
                    <input
                      onChange={(e) =>
                        dispatch(themeSet({ theme: e.target.value }))
                      }
                      value="dark"
                      type="radio"
                      name="theme"
                      id="dark"
                      checked={theme === "dark"}
                    />
                  </div>
                  <div className="off">
                    <label htmlFor="white">OFF</label>
                    <input
                      onChange={(e) =>
                        dispatch(themeSet({ theme: e.target.value }))
                      }
                      value="white"
                      type="radio"
                      name="theme"
                      id="white"
                      checked={theme === "white"}
                    />
                  </div>
                  <div onClick={logout} className="logout">
                    <RiLogoutCircleLine /> &nbsp;Logout
                  </div>
                </div>
              </div>
            </div>
            <div className="friend-search">
              <div className="search">
                <button>
                  <BiSearch />
                </button>
                <input
                  onChange={search}
                  type="text"
                  className="form-control"
                  placeholder="search"
                />
              </div>
            </div>
            {/* <div className="active-friends">
              {activeUsers && activeUsers.length > 0
                ? activeUsers.map((u) => (
                    <ActiveFriend
                      setCurrentFriend={setCurrentFriend}
                      user={u}
                    />
                  ))
                : ""}
            </div> */}
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentFriend(fd.fndInfo)}
                      className={
                        currentFriend._id === fd.fndInfo._id
                          ? `hover-friend active`
                          : `hover-friend`
                      }
                    >
                      <Friends
                        myId={myInfo.id}
                        friend={fd}
                        activeUsers={activeUsers}
                      />
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
            theme={theme}
          />
        ) : (
          "Please select a friend to chat"
        )}
      </div>
    </div>
  );
};

export default Messenger;
