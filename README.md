# React Streaming Chat Box

[English](#english) | [中文](#chinese)

<a name="english"></a>
## English

A real-time streaming chat application built with React and Flask, featuring AI assistant conversations.

### Tech Stack

#### Frontend (React)
- **React 18**: Utilizing the latest React features including Hooks and functional components
- **Real-time Streaming**: Implementing streaming data processing with Fetch API and ReadableStream
- **Responsive Design**: Modern UI interface adapting to different screen sizes
- **Component Architecture**: Reusable components (like ChatMessage) for better code maintainability

#### Backend (Python Flask)
- **Flask**: Lightweight web framework providing RESTful API
- **CORS**: Cross-Origin Resource Sharing support
- **OpenAI API**: AI conversation integration with streaming response
- **Async Processing**: Stream response handling for long-running AI requests

### Core Files Overview

#### App.js
Main frontend application file with the following core functionalities:
- Message state management (useState hook)
- Real-time message stream processing
- User input handling
- Auto-scroll to latest messages
- Backend API communication
- Error handling and loading state management

#### server.py
Backend server file providing:
- RESTful API endpoint (/chat)
- CORS configuration
- AI conversation integration
- Message history management
- Stream response handling
- Static file serving

#### ChatMessage.js
Message display component responsible for:
- Single message rendering
- User and AI message differentiation
- Message status support (completed/incomplete)
- Custom styling and layout

### Features
- Real-time Streaming: Character-by-character message display for natural conversation flow
- History Management: Maintaining conversation context
- Error Handling: Graceful handling of network and API errors
- Responsive Design: Adaptation to various device screens
- Extensible: Easy integration of new features and AI models

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/YuiicKi/react_streaming_chat_box.git
cd react_streaming_chat_box
```

2. Install dependencies:
```bash
# Frontend dependencies
npm install

# Backend dependencies
pip install flask flask-cors openai
```

3. Configuration:
- Set your AI API key in `server.py`
- Ensure backend server runs on port 5002

4. Run the application:
```bash
# Start backend server
python server.py

# Start frontend development server
npm start
```

5. Access the application:
Open your browser and visit `http://localhost:3000`

### Contributing
Welcome to submit Issue and Pull Request!

### License
MIT License

---

<a name="chinese"></a>
## 中文

一个基于 React 和 Flask 的实时流式聊天应用，支持与 AI 助手进行对话。

### 技术栈

#### 前端 (React)
- **React 18**: 使用最新的 React 特性，包括 Hooks 和函数式组件
- **实时流式响应**: 使用 Fetch API 和 ReadableStream 实现流式数据处理
- **响应式设计**: 适配不同屏幕尺寸的现代化 UI 界面
- **组件化架构**: 使用可重用的组件（如 ChatMessage）提高代码复用性

#### 后端 (Python Flask)
- **Flask**: 轻量级 Web 框架，提供 RESTful API
- **CORS**: 支持跨域资源共享
- **OpenAI API**: 集成 AI 对话能力，支持流式响应
- **异步处理**: 使用流式响应处理长时间运行的 AI 请求

### 核心文件说明

#### App.js
主要的前端应用文件，包含以下核心功能：
- 消息状态管理（useState hook）
- 实时消息流处理
- 用户输入处理
- 自动滚动到最新消息
- 与后端 API 的通信
- 错误处理和加载状态管理

#### server.py
后端服务器文件，提供以下功能：
- RESTful API 端点（/chat）
- CORS 配置
- AI 对话集成
- 消息历史管理
- 流式响应处理
- 静态文件服务

#### ChatMessage.js
消息展示组件，负责：
- 单条消息的渲染
- 区分用户和 AI 消息
- 支持消息状态（完成/未完成）
- 自定义样式和布局

### 特点
- 实时流式响应：消息逐字显示，提供更自然的对话体验
- 历史记录：保持对话上下文
- 错误处理：优雅处理网络和 API 错误
- 响应式设计：适配各种设备屏幕
- 可扩展：易于添加新功能和集成其他 AI 模型

### 快速开始

1. 克隆仓库：
```bash
git clone https://github.com/YuiicKi/react_streaming_chat_box.git
cd react_streaming_chat_box
```

2. 安装依赖：
```bash
# 前端依赖
npm install

# 后端依赖
pip install flask flask-cors openai
```

3. 配置：
- 在 `server.py` 中设置您的 AI API 密钥
- 确保后端服务器运行在端口 5002

4. 运行应用：
```bash
# 启动后端服务器
python server.py

# 启动前端开发服务器
npm start
```

5. 访问应用：
打开浏览器访问 `http://localhost:3000`

### 贡献
欢迎提交 Issue 和 Pull Request！

### 许可
MIT License
