import React, { useState, useRef } from 'react';
import ChatMessage from './components/ChatMessage'; 

function App() {
    const [messages, setMessages] = useState([
        { id: Date.now(), sender: 'ai', content: '你好！我是AI助手，很高兴为你服务。', finished: true }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [debugInfo, setDebugInfo] = useState({ received: [], displayed: [] });  
    const abortControllerRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const addMessage = (sender, content) => {
        const id = Date.now();
        setMessages(prevMessages => [...prevMessages, { id, sender, content, finished: sender === 'ai' ? false : true }]);
        scrollToBottom();
    };

    const updateMessages = (content, dataStr) => {
        setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.sender === 'ai' && !lastMessage.finished) {
                lastMessage.content = content;
                
                setDebugInfo(prev => ({
                    ...prev,
                    received: [...prev.received, { 
                        time: new Date().toISOString(), 
                        data: dataStr 
                    }],
                    displayed: [...prev.displayed, { 
                        time: new Date().toISOString(), 
                        content: content 
                    }]
                }));
            }
            return newMessages;
        });
        scrollToBottom();
    };

    const handleStream = async (response) => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let aiMessageContent = '';
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.substring(6);
                        try {
                            const data = JSON.parse(dataStr);
                            
                            if (data.content !== null) {
                                aiMessageContent += data.content;
                                updateMessages(aiMessageContent, dataStr);
                            }
                        } catch (e) {
                            console.error('解析响应数据时出错:', e);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('读取流数据时出错:', error);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        const userMessage = input;
        setInput('');
        addMessage('user', userMessage);

        // 获取除最新AI回复（如果未完成）之外的所有消息历史
        const messageHistory = messages.filter(msg => msg.finished).map(msg => ({
            sender: msg.sender,
            content: msg.content
        }));

        try {
            abortControllerRef.current = new AbortController();
            const response = await fetch('http://localhost:5002/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: messageHistory
                }),
                signal: abortControllerRef.current.signal
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            addMessage('ai', '');
            await handleStream(response);

            setMessages(prevMessages => {
                const newMessages = [...prevMessages];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.sender === 'ai' && !lastMessage.finished) {
                    lastMessage.finished = true;
                }
                return newMessages;
            });
        } catch (error) {
            if (error.name === 'AbortError') {
                addMessage('ai', '对话已中断。');
            } else {
                console.error('错误:', error);
                addMessage('ai', '发生错误，请稍后重试');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>AI 助手</h2>
            </div>
            <div className="chat-messages">
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        sender={message.sender}
                        content={message.content}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="输入你的问题..."
                    disabled={isLoading}
                />
                <button onClick={handleSend} disabled={isLoading}>
                    发送
                </button>
                {isLoading && (
                    <button onClick={handleCancel}>
                        中断
                    </button>
                )}
            </div>
            
            <div className="debug-window">
                <div className="debug-section">
                    <h3>接收到的数据：</h3>
                    <div className="debug-content">
                        {debugInfo.received.map((item, index) => (
                            <div key={index}>
                                <span>{item.time}: </span>
                                <pre>{item.data}</pre>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="debug-section">
                    <h3>显示的内容：</h3>
                    <div className="debug-content">
                        {debugInfo.displayed.map((item, index) => (
                            <div key={index}>
                                <span>{item.time}: </span>
                                <pre>{item.content}</pre>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;