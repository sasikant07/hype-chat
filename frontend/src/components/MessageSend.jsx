import React from "react";
import EmojiPicker from 'emoji-picker-react';
import { BiMessageAltEdit } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { RiGalleryLine } from "react-icons/ri";
import { AiFillGift } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";

const MessageSend = ({ newMessage, inputHandle, sendMessage, emojiSend, imageSend, theme }) => {

  return (
    <div className="message-send-section">
      <input type="checkbox" id="emoji" />
      <div className="file hover-attachment">
        <div className="add-attachment">Add Attachment</div>
        <BsPlusCircle />
      </div>
      <div className="file hover-image">
        <div className="add-image">Add Image</div>
        <input onChange={imageSend} type="file" id="pic" className="form-control" />
        <label htmlFor="pic">
          <RiGalleryLine />
        </label>
      </div>
      <div className="file">
        <BiMessageAltEdit />
      </div>
      <div className="file hover-gift">
        <div className="add-gift">Add Gift</div>
        <AiFillGift />
      </div>
      <div className="message-type">
        <input
          type="text"
          name="message"
          id="message"
          onChange={inputHandle}
          value={newMessage}
          className="form-control"
          placeholder="Aa"
        />
        <label htmlFor="emoji">🙂</label>
      </div>
      <div onClick={sendMessage} className="file">
        <IoMdSend />
      </div>
      <div className="emoji-section">
        <div className="emoji">
          <EmojiPicker theme={theme === "white" ? "light" : "dark"} onEmojiClick={(e) => emojiSend(e.emoji)}/>
        </div>
      </div>
    </div>
  );
};

export default MessageSend;
