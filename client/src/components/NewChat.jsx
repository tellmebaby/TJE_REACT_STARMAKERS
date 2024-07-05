import React, { useContext, useEffect, useState, useRef } from 'react';
import './NewChat.css';
import { getMessagesByUser, insertMessageToAdmin } from '../apis/floatingChat';
import { LoginContext } from '../contexts/LoginContextProvider';

const NewChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const { userInfo } = useContext(LoginContext);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (userInfo.userNo) {
            getMessagesByUser(userInfo.userNo)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
        }

        const handleClickOutside = (event) => {
            if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userInfo.userNo]);

    const toggleChat = () => setIsOpen(!isOpen);
    const handleInputChange = (event) => setInput(event.target.value);

    const sendMessage = async (event) => {
        event.preventDefault();
        if (!input.trim()) return;
    
        const messageData = {
            content: input,
            code: 'toAdmin'
        };
    
        try {
            const response = await insertMessageToAdmin(messageData, userInfo.userNo);
            console.log('Message sent:', response.data);
            const newMessages = [...messages, { content: input, code: 'toUser' }];
            setMessages(newMessages);
            setInput('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <div className={`chat-icon ${isOpen ? 'open' : ''}`} onClick={toggleChat} ref={chatContainerRef}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-headset" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1 a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"/>
            </svg>
            {isOpen && (
                <div className="chat-container" onClick={(e) => e.stopPropagation()}>
                    <div className="close-btn" onClick={() => setIsOpen(false)}>×</div>
                    <div className="chat-messages">
                        <div className='chat-messages-wrap'>
                            {messages.map((msg, index) => (
                                <div key={index} className={`chat-message ${msg.code === 'toAdmin' ? 'to-admin' : 'to-user'}`}>
                                    {msg.content}
                                </div>
                            ))}
                        </div>
                    </div>
                    <form className="chat-input" onSubmit={sendMessage}>
                        <input type="text" value={input} onChange={handleInputChange} placeholder="Type a message..." autoFocus />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default NewChat;