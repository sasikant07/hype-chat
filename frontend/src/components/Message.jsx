import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { HiOutlineCheckCircle } from "react-icons/hi";

const Message = ({ message, currentFriend, scrollRef, typingMessage }) => {
  const { myInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="message-show">
        {message && message.length > 0 ? (
          message.map((m, index) =>
            m.senderId === myInfo.id ? (
              <div ref={scrollRef} className="my-message" key={index}>
                <div className="image-message">
                  <div className="my-text">
                    <p className="message-text my">
                      {m.message.text === "" ? (
                        <img
                          src={`./images/${m.message.image}`}
                          alt="message-image"
                        />
                      ) : (
                        m.message.text
                      )}
                    </p>
                    {index === message.length - 1 &&
                    m?.senderId === myInfo.id ? (
                      m.status === "seen" ? (
                        <img
                          className="img"
                          src={`./images/${currentFriend.image}`}
                          alt=""
                        />
                      ) : m.status === "delivered" ? (
                        <span>
                          <RiCheckboxCircleFill />
                        </span>
                      ) : (
                        <span>
                          <HiOutlineCheckCircle />
                        </span>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="time">{moment(m.createdAt).format("llll")}</div>
              </div>
            ) : (
              <div ref={scrollRef} className="fd-message" key={index}>
                <div className="image-message-time">
                  <img src={`./images/${currentFriend.image}`} alt="" />
                  <div className="message-time">
                    <div className="fd-text">
                      <p className="message-text fd">
                        {m.message.text === "" ? (
                          <img
                            src={`./images/${m.message.image}`}
                            alt="message-image"
                          />
                        ) : (
                          m.message.text
                        )}
                      </p>
                    </div>
                    <div className="time">
                      {moment(m.createdAt).format("llll")}
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="friend-connect">
            <img src={`./images/${currentFriend.image}`} alt="" />
            <h3>{currentFriend.userName} connect you</h3>
            <span>
              {moment(currentFriend.createdAt).startOf("minutes").fromNow()}
            </span>
          </div>
        )}
      </div>
      {typingMessage &&
      typingMessage.msg &&
      typingMessage.senderId === currentFriend._id ? (
        <div className="typing-message">
          <div className="fd-message">
            <div className="image-message-time">
              {/* <img src={`./images/${currentFriend.image}`} alt="" /> */}
              <div className="message-time">
                <div className="fd-text">
                  <p className="message-text">
                    {currentFriend.userName} is typing...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Message;
