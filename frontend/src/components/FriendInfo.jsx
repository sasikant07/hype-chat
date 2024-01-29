import React from "react";
import { BsChevronDown } from "react-icons/bs";

const FriendInfo = () => {
  return (
    <div className="friend-info">
        <input type="checkbox" id="gallery"/>
      <div className="image-name">
        <div className="image">
          <img src="/images/e5e1b7a95f49f612418a0a803admin.jpg" alt="" />
        </div>
        <div className="active-user">Active</div>
        <div className="name">
          <h4>Jose Cooper</h4>
        </div>
      </div>
      <div className="others">
        <div className="custom-chat">
          <h3>Customise Chat</h3>
          <BsChevronDown />
        </div>
        <div className="privacy">
          <h3>Privacy & Support</h3>
          <BsChevronDown />
        </div>
        <div className="media">
          <h3>Share Media</h3>
          <label htmlFor="gallery">
            <BsChevronDown />
          </label>
        </div>
      </div>
      <div className="gallery">
        <img src="/images/e5e1b7a95f49f612418a0a803admin.jpg" alt="" />
        <img src="/images/e5e1b7a95f49f612418a0a803admin.jpg" alt="" />
        <img src="/images/e5e1b7a95f49f612418a0a803admin.jpg" alt="" />
        <img src="/images/e5e1b7a95f49f612418a0a803admin.jpg" alt="" />
      </div>
    </div>
  );
};

export default FriendInfo;
