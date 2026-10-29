import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
let cachedToken: string | null = null;
let tokenExpiry = 0;

export function getSocketUrl(): string {
  if (typeof window === 'undefined') return 'http://localhost:3001';

  if (process.env.NEXT_PUBLIC_SOCKET_URL) {
    return process.env.NEXT_PUBLIC_SOCKET_URL;
  }

  // When running locally in browser, connect directly to NestJS backend on port 3001
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://${hostname}:3001`;
  }

  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.startsWith('http')) {
    try {
      const url = new URL(process.env.NEXT_PUBLIC_API_URL);
      return url.origin;
    } catch {
      // Fallback
    }
  }

  return 'https://europebridge.onrender.com';
}

export async function fetchSocketToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  // Cache token for 1 hour to avoid unnecessary HTTP requests
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
    const res = await fetch(`${API_URL}/help/socket-token`, {
      credentials: 'include',
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.token) {
        cachedToken = data.token;
        tokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
        return cachedToken;
      }
    }
  } catch (err) {
    console.warn('[ChatSocket] Could not fetch socket handshake token:', err);
  }
  return null;
}

export function getChatSocket(): Socket {
  if (!socket) {
    const url = getSocketUrl();
    socket = io(`${url}/chat`, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      auth: (cb) => {
        fetchSocketToken()
          .then((token) => cb(token ? { token } : {}))
          .catch(() => cb({}));
      },
    });

    socket.on('connect', () => {
      console.log('[ChatSocket] Connected to server successfully:', socket?.id);
    });

    socket.on('connect_error', (err) => {
      console.warn('[ChatSocket] Socket connection error:', err.message);
      // Invalidate cache on connect error so next retry attempts a fresh token
      cachedToken = null;
    });
  }

  // If socket disconnected, trigger reconnect
  if (socket && !socket.connected) {
    socket.connect();
  }

  return socket;
}

export function disconnectChatSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
    cachedToken = null;
  }
}
