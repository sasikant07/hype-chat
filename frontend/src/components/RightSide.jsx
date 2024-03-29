import React from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import Message from "./Message";
import MessageSend from "./MessageSend";
import FriendInfo from "./FriendInfo";

const RightSide = (props) => {
  const {
    currentFriend,
    inputHandle,
    newMessage,
    sendMessage,
    message,
    scrollRef,
    emojiSend,
    imageSend,
    activeUsers,
    typingMessage,
    theme,
  } = props;

  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src={`/images/${currentFriend.image}`} alt="" />
                    {activeUsers &&
                    activeUsers.length > 0 &&
                    activeUsers.some((u) => u.userId === currentFriend._id) ? (
                      <div className="active-icon"></div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="name">
                    <h3>{currentFriend.userName}</h3>
                  </div>
                </div>
                <div className="icons">
                  <div className="icon">
                    <IoCall />
                  </div>
                  <div className="icon">
                    <BsCameraVideoFill />
                  </div>
                  <div className="icon">
                    <label htmlFor="dot">
                      <HiDotsCircleHorizontal />
                    </label>
                  </div>
                </div>
              </div>
              <Message
                currentFriend={currentFriend}
                message={message}
                scrollRef={scrollRef}
                typingMessage={typingMessage}
              />
              <MessageSend
                newMessage={newMessage}
                inputHandle={inputHandle}
                sendMessage={sendMessage}
                emojiSend={emojiSend}
                imageSend={imageSend}
                theme={theme}
              />
            </div>
          </div>
          <div className="col-4">
            <FriendInfo
              currentFriend={currentFriend}
              activeUsers={activeUsers}
              message={message}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
