import React, { useEffect, useState, useContext } from 'react';
import $ from 'jquery';
import { LoginContext } from '../contexts/LoginContextProvider';
import './FloatingChat.css';

const FloatingChat = () => {
    const { csrfToken } = useContext(LoginContext);
    const [messages, setMessages] = useState([]);
    const [open, setOpen] = useState(false);

    const toggleChat = () => {
        setOpen(!open);
    };

    const fetchMessages = () => {
        $.ajax({
            type: 'GET',
            url: '/message/getChatMessagesByUser',
            success: function(response) {
                setMessages(response);
            },
            error: function(xhr) {
                console.error('Error fetching messages:', xhr.responseText);
            }
        });
    };

    const sendMessage = (event) => {
        event.preventDefault();
        const message = $('#chatInput').val();

        $.ajax({
            type: 'POST',
            url: '/message/insertToAdmin',
            contentType: 'application/json',
            data: JSON.stringify({ content: message, code: 'toAdmin', _csrf: csrfToken }),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRF-TOKEN', csrfToken);
            },
            success: function(response) {
                console.log('Message sent successfully:', response);
                $('#chatInput').val('');
                fetchMessages();
            },
            error: function(xhr) {
                console.error('Error sending message:', xhr.responseText);
            }
        });
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="floating" id="chatButton">
            <button onClick={toggleChat}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-headset" viewBox="0 0 16 16">
                    <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"/>
                </svg>
            </button>
            {open && (
                <div className="chat-container">
                    <h5>채팅</h5>
                    <div className="chat-messages" style={{ height: '80%', overflowY: 'auto' }}>
                        {messages.map((msg, index) => (
                            <p key={index}>{msg.content}</p>
                        ))}
                    </div>
                    <div className="chat-input mt-2">
                        <form onSubmit={sendMessage}>
                            <input type="text" className="form-control" placeholder="입력하세요..." id="chatInput"/>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FloatingChat;