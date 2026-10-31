import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
let cachedToken: string | null = null;
let tokenExpiry = 0;

export function getSocketUrl(): string {
  if (typeof window === 'undefined') return 'http://localhost:3001';

  if (process.env.NEXT_PUBLIC_SOCKET_URL) {
    return process.env.NEXT_PUBLIC_SOCKET_URL;
  }

  const hostname = window.location.hostname;
  const isLocal =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname === '[::1]' ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.localhost') ||
    /^192\.168\.\d+\.\d+$/.test(hostname) ||
    /^10\.\d+\.\d+\.\d+$/.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+$/.test(hostname);

  if (isLocal) {
    const host = hostname.includes(':') ? `[${hostname.replace(/[[\]]/g, '')}]` : hostname;
    return `http://${host}:3001`;
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
  cachedToken = null;
  tokenExpiry = 0;
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
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
      timeout: 10000,
      auth: (cb) => {
        fetchSocketToken()
          .then((token) => {
            if (!token) {
              // Unauthenticated state: disconnect cleanly and do not spam server
              if (socket) {
                socket.disconnect();
              }
              return;
            }
            cb({ token });
          })
          .catch(() => {
            if (socket) socket.disconnect();
          });
      },
    });

    socket.on('connect', () => {
      console.log('[ChatSocket] Connected to server successfully:', socket?.id);
    });

    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        // Server rejected connection (invalid or expired token)
        cachedToken = null;
        tokenExpiry = 0;
      }
    });

    socket.on('connect_error', (err) => {
      // Don't spam warnings if socket was intentionally disconnected due to unauthenticated state
      if (socket?.connected || cachedToken) {
        console.warn('[ChatSocket] Socket connection error:', err.message);
      }
      // If error indicates unauthorized or forbidden, clear cached token
      if (err.message?.toLowerCase().includes('unauthor') || err.message?.toLowerCase().includes('forbidden')) {
        cachedToken = null;
        tokenExpiry = 0;
        socket?.disconnect();
      }
    });
  }

  // Only trigger manual connect if socket is disconnected and not currently attempting connection
  if (socket && !socket.connected && !socket.active) {
    socket.connect();
  }

  return socket;
}

export function disconnectChatSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
    cachedToken = null;
    tokenExpiry = 0;
  }
}
