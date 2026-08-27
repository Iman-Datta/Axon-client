import { useEffect, useRef } from "react";

export const useBoardWebSocket = (projectSlug, accessToken, setTickets) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!projectSlug || !accessToken) return;

    // 1. Grab env variable or fallback
    const rawUrl = import.meta.env.VITE_WS_URL || "wss://axonapi.imandatta.com";

    // 2. Clean up any accidental double protocols or extra slashes
    const cleanBaseUrl = rawUrl.replace(/^wss?:\/\//, "").replace(/\/+$/, "");

    // 3. Dynamically pick wss: on HTTPS sites, fallback to ws: for local http dev
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${cleanBaseUrl}/ws/board/${projectSlug}/?token=${accessToken}`;

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log(`Connected to WebSocket board for ${projectSlug}`);
    };

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.type === "board.updated" && payload.data?.tickets) {
          const incomingTickets = payload.data.tickets;

          setTickets((prevTickets) => {
            const ticketMap = new Map(incomingTickets.map((t) => [t.id, t]));

            const nextTickets = prevTickets.map((ticket) => {
              if (ticketMap.has(ticket.id)) {
                const updatedInfo = ticketMap.get(ticket.id);
                return {
                  ...ticket,
                  kanban_column: updatedInfo.kanban_column,
                  order: updatedInfo.order,
                };
              }
              return ticket;
            });

            return nextTickets.sort((a, b) => (a.order || 0) - (b.order || 0));
          });
        }
      } catch (err) {
        console.error("Error processing WebSocket message:", err);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [projectSlug, accessToken, setTickets]);
};

export default useBoardWebSocket;
