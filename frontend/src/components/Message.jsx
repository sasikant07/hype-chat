import React from 'react'

const Message = () => {
  return (
    <div className="message-show">
        <div className="my-message">
            <div className="image-message">
                <div className="my-text">
                    <p className="message-text">How are you</p>
                </div>
            </div>
            <div className="time">
                28 Jan 2024
            </div>
        </div>
        <div className="fd-message">
        <div className="image-message-time">
            <img src="/images/e5e1b7a95f49f612418a0a803admin.jpg" alt="" />
            <div className="message-time">
                <div className="fd-text">
                    <p className="message-text">I am good, Thanks. How about you?</p>
                </div>
                <div className="time">
                    28 Jan 2024
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Message;