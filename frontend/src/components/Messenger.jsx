import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import RightSide from "./RightSide";
import {
  getFriends,
  messageSend,
  getMessage,
  imageMessageSend,
} from "../store/reducers/messengerReducer";

const Messenger = () => {
  const dispatch = useDispatch();
  const { friends, message } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);
  const scrollRef = useRef();
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const inputHandle = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const data = {
      senderName: myInfo.userName,
      receiverId: currentFriend._id,
      message: newMessage ? newMessage : "❤️",
    };

    dispatch(messageSend(data));
    setNewMessage("");
  };

  const emojiSend = (emo) => {
    setNewMessage(`${newMessage}` + emo);
  };

  const imageSend = (e) => {
    if (e.target.files.length !== 0) {
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

  return (
    <div className="messenger">
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
              <ActiveFriend />
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
          />
        ) : (
          "Please select a friend to chat"
        )}
      </div>
    </div>
  );
};

export default Messenger;
