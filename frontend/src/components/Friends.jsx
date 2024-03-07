import React from "react";
import moment from "moment";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { HiOutlineCheckCircle } from "react-icons/hi";

const Friends = (props) => {
  const { fndInfo, msgInfo } = props.friend;
  const { myId, activeUsers } = props;
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`/images/${fndInfo.image}`} alt="" />
          {activeUsers &&
          activeUsers.length > 0 &&
          activeUsers.some((u) => u.userId === fndInfo._id) ? (
            <div className="active-icon"></div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="friend-name-seen">
        <div className="friend-name">
          <h4 className={msgInfo?.senderId !== myId && msgInfo?.status !== undefined && msgInfo?.status !== "seen fd-name" ? "unseen-message fd-name" : "fd-name"}>{fndInfo.userName}</h4>
          <div className="msg-time">
            {msgInfo && msgInfo.senderId === myId ? (
              <span>You: </span>
            ) : (
              <span className={msgInfo?.senderId !== myId && msgInfo?.status !== undefined && msgInfo?.status !== "seen" ? "unseen-message" : ""}>{fndInfo.userName + " "}</span>
            )}
            {msgInfo && msgInfo.message.text ? (
              <span className={msgInfo?.senderId !== myId && msgInfo?.status !== undefined && msgInfo?.status !== "seen" ? "unseen-message" : ""}>{msgInfo.message.text.slice(0, 10)}</span>
            ) : msgInfo && msgInfo.message.image ? (
              <span>Sent a image</span>
            ) : (
              <span>connected</span>
            )}
            <span>
              {msgInfo
                ? moment(msgInfo.createdAt).startOf("minutes").fromNow()
                : moment(fndInfo.createdAt).startOf("minutes").fromNow()}
            </span>
          </div>
        </div>
        {myId === msgInfo?.senderId ? (
          <div className="seen-unseen-icon">
            {msgInfo?.status === "seen" ? (
              <img src={`/images/${fndInfo.image}`} alt="" />
            ) : msgInfo.status === "delivered" ? (
              <div className="delivered">
                <RiCheckboxCircleFill />
              </div>
            ) : (
              <div className="unseen">
                <HiOutlineCheckCircle />
              </div>
            )}
          </div>
        ) : (
          <div className="seen-unseen-icon">
            {msgInfo?.status !== undefined && msgInfo?.status !== "seen" ? (
              <div className="seen-icon"></div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
