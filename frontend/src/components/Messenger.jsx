import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import RightSide from "./RightSide";
import { getFriends } from "../store/reducers/messengerReducer";

const Messenger = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img
                    src={`/images/${myInfo.image}`}
                    alt=""
                  />
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
                    <div className="hover-friend" key={index}>
                      <Friends friend={fd} />
                    </div>
                  ))
                : "No Friends Found!"}
            </div>
          </div>
        </div>
        <RightSide />
      </div>
    </div>
  );
};

export default Messenger;
