import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";

const Messenger = () => {
  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img
                    src="/images/e5e1b7a95f49f612418a0a803admin.jpg"
                    alt=""
                  />
                </div>
                <div className="name">
                  <h3>John Doe</h3>
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
                <div className="hover-friend active">
                    <Friends />
                </div>
                <div className="hover-friend">
                    <Friends />
                </div>
                <div className="hover-friend">
                    <Friends />
                </div>
                <div className="hover-friend">
                    <Friends />
                </div>
                <div className="hover-friend">
                    <Friends />
                </div>
                <div className="hover-friend">
                    <Friends />
                </div>
                <div className="hover-friend">
                    <Friends />
                </div>
                <div className="hover-friend">
                    <Friends />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
