// ChatMessage.js
import React from 'react';

const ChatMessage = ({ sender, content }) => {
    return (
        <div className={`message ${sender}`}>
            <div className="message-content">
                {content}
            </div>
        </div>
    );
};

export default ChatMessage;