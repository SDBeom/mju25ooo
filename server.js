// WebSocket 서버
const server = Bun.serve({
  port: 3000,
  fetch(req, server) {
    // WebSocket 업그레이드 요청 처리
    if (server.upgrade(req)) {
      return; // WebSocket 연결로 업그레이드됨
    }
    
    // 일반 HTTP 요청 처리
    return new Response("WebSocket Server is running", {
      headers: { "Content-Type": "text/plain" },
    });
  },
  websocket: {
    // 클라이언트 연결 시
    open(ws) {
      console.log(`[WebSocket] Client connected: ${ws.remoteAddress}`);
      ws.send(JSON.stringify({ 
        type: 'connected', 
        message: 'WebSocket 연결이 성공했습니다!' 
      }));
    },
    
    // 메시지 수신 시
    message(ws, message) {
      try {
        const data = JSON.parse(message);
        console.log(`[WebSocket] Received:`, data);
        
        // 에코 응답
        ws.send(JSON.stringify({
          type: 'echo',
          original: data,
          timestamp: new Date().toISOString()
        }));
        
        // 브로드캐스트 (모든 클라이언트에게 전송)
        server.publish('broadcast', JSON.stringify({
          type: 'broadcast',
          data: data,
          timestamp: new Date().toISOString()
        }));
      } catch (error) {
        console.error('[WebSocket] Error parsing message:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: '메시지 파싱 오류'
        }));
      }
    },
    
    // 연결 종료 시
    close(ws) {
      console.log(`[WebSocket] Client disconnected: ${ws.remoteAddress}`);
    },
    
    // 에러 발생 시
    error(ws, error) {
      console.error(`[WebSocket] Error:`, error);
    }
  }
});

console.log(`🚀 WebSocket 서버가 시작되었습니다!`);
console.log(`📍 포트: ${server.port}`);
console.log(`🌐 WebSocket URL: ws://localhost:${server.port}`);
console.log(`📡 HTTP URL: http://localhost:${server.port}`);

