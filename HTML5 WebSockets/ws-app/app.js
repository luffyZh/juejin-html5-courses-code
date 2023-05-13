const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("有新用户连接上来了");

  // 模拟其他用户发送消息
  setInterval(() => {
    const messages = ["你好啊~", "你在干嘛呢?", "有人吗？", "大家好", "我来了"];
    const message = messages[Math.floor(Math.random() * messages.length)];

    console.log(`模拟其他用户发言：${message}`);

    // 广播消息给所有连接到服务器的客户端
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }, ~~(Math.random() * 6) + 5000);

  // 监听客户端发送的消息
  ws.on("message", (msg) => {
    console.log(`收到一条新消息：${msg}`);

    // 广播消息给所有连接到服务器的客户端
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  // 监听客户端断开连接事件
  ws.on("close", () => {
    console.log("有用户离开了");
  });
});