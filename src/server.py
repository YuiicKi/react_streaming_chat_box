from flask import Flask, request, Response
from flask_cors import CORS
from openai import OpenAI
import json
import time

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "max_age": 3600,
        "supports_credentials": False
    }
})

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://api.deepseek.com"
)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def serve_static(path):
    return app.send_static_file(path)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    message_history = data.get('history', [])
    print("用户消息:", user_message)
    print("历史消息:", message_history)

    try:
        # 构建消息历史
        messages = [{"role": "system", "content": "你是一个有帮助的助手"}]
        for msg in message_history:
            messages.append({
                "role": "user" if msg['sender'] == 'user' else "assistant",
                "content": msg['content']
            })
        messages.append({"role": "user", "content": user_message})

        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=messages,
            stream=True
        )

        def generate():
            for chunk in response:
                if hasattr(chunk.choices[0].delta, 'content') and chunk.choices[0].delta.content is not None:
                    content = chunk.choices[0].delta.content
                    data = json.dumps({'content': content, 'error': None})
                    yield f"data: {data}\n\n"
        return Response(generate(), mimetype='text/event-stream')
    except Exception as e:
        error_msg = str(e)
        data = json.dumps({'content': None, 'error': error_msg})
        return Response(f"data: {data}\n\n", mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(port=5002)