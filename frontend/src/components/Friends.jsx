import React from "react";
import moment from "moment";

const Friends = (props) => {
  const { fndInfo, msgInfo } = props.friend;
  const { myId } = props;
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`/images/${fndInfo.image}`} alt="" />
        </div>
      </div>
      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>{fndInfo.userName}</h4>
          <div className="msg-time">
            {msgInfo && msgInfo.senderId === myId ? (
              <span>You: </span>
            ) : (
              <span>{fndInfo.userName + " "}</span>
            )}
            {msgInfo && msgInfo.message.text ? (
              <span>{msgInfo.message.text.slice(0, 10)}</span>
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
            <img src={`/images/${fndInfo.image}`} alt="" />
          </div>
        ) : (
          <div className="seen-unseen-icon">
            <div className="seen-icon"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
