import { NextRequest } from "next/server";

export const runtime = "edge";

type CursorSeed = {
    id: string;
    name: string;
    color: "red" | "blue";
    anchor: {
        x: [number, number];
        y: [number, number];
    };
    offset: number;
};

type CursorBroadcast = {
    type: "cursor:update";
    id: string;
    name: string;
    color: "red" | "blue";
    x: number;
    y: number;
    status: "selecting" | "commenting" | "idle";
    timestamp: number;
};

const seeds: CursorSeed[] = [
    {
        id: "nova",
        name: "Nova",
        color: "blue",
        anchor: {
            x: [0.08, 0.42],
            y: [0.38, 0.82],
        },
        offset: 0,
    },
    {
        id: "atlas",
        name: "Atlas",
        color: "red",
        anchor: {
            x: [0.55, 0.88],
            y: [0.1, 0.56],
        },
        offset: Math.PI / 1.4,
    },
];

const statuses: CursorBroadcast["status"][] = ["idle", "selecting", "commenting"];

function projectCursor(seed: CursorSeed, tick: number): CursorBroadcast {
    const oscillation = Math.sin(tick + seed.offset);
    const wave = Math.cos(tick / 1.6 + seed.offset * 0.8);

    const xSpan = seed.anchor.x[1] - seed.anchor.x[0];
    const ySpan = seed.anchor.y[1] - seed.anchor.y[0];

    const x = seed.anchor.x[0] + ((oscillation + 1) / 2) * xSpan;
    const y = seed.anchor.y[0] + ((wave + 1) / 2) * ySpan;

    const statusIndex = Math.abs(Math.floor((tick / 1.8 + seed.offset) % statuses.length));

    return {
        type: "cursor:update",
        id: seed.id,
        name: seed.name,
        color: seed.color,
        x,
        y,
        status: statuses[statusIndex],
        timestamp: Date.now(),
    };
}

export function GET(request: NextRequest) {
    if (request.headers.get("upgrade") !== "websocket") {
        return new Response("Expected websocket", { status: 400 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair) as unknown as [WebSocket, WebSocket];

    let tick = 0;

    const sendSnapshot = () => {
        tick += 0.22;
        const payload = seeds.map((seed) => projectCursor(seed, tick));
        server.send(
            JSON.stringify({
                type: "handoff:snapshot",
                payload,
            })
        );
    };

    const interval = setInterval(sendSnapshot, 900);

    server.accept();

    server.addEventListener("close", () => {
        clearInterval(interval);
    });

    server.addEventListener("error", () => {
        clearInterval(interval);
    });

    server.addEventListener("message", (event: MessageEvent) => {
        try {
            const message = JSON.parse(typeof event.data === "string" ? event.data : "{}");
            if (message?.type === "ping") {
                server.send(
                    JSON.stringify({
                        type: "pong",
                        timestamp: Date.now(),
                    })
                );
            }
        } catch (error) {
            console.error("Failed to parse incoming message", error);
        }
    });

    sendSnapshot();

    return new Response(null, {
        status: 101,
        webSocket: client,
    });
}
