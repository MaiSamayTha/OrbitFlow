"use client";
import Button from "@/components/Button";
import designExample1Image from "@/assets/images/design-example-1.png";
import designExample2Image from "@/assets/images/design-example-2.png";
import Image from "next/image";
import Pointer from "@/components/Pointer";
import { motion, useAnimate, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import cursorYouImage from "@/assets/images/cursor-you.svg";
import type { SpringOptions } from "framer-motion";

type HandoffStatus = "idle" | "selecting" | "commenting";

type CursorSeed = {
    id: "nova" | "atlas";
    label: string;
    name: string;
    color: "red" | "blue";
    anchor: {
        x: [number, number];
        y: [number, number];
    };
    offset: number;
};

type HandoffCursor = {
    id: CursorSeed["id"];
    label: string;
    name: string;
    color: CursorSeed["color"];
    status: HandoffStatus;
    x: number;
    y: number;
    timestamp: number;
};

const chartDimensions = {
    width: 320,
    height: 160,
};

const numberSpring: SpringOptions = {
    damping: 18,
    stiffness: 150,
    mass: 0.7,
};
const handoffStatuses: HandoffStatus[] = ["idle", "selecting", "commenting"];

const handoffSeeds: CursorSeed[] = [
    {
        id: "nova",
        label: "nova",
        name: "Nova",
        color: "blue",
        anchor: {
            x: [0.1, 0.38],
            y: [0.42, 0.82],
        },
        offset: 0,
    },
    {
        id: "atlas",
        label: "atlas",
        name: "Atlas",
        color: "red",
        anchor: {
            x: [0.58, 0.9],
            y: [0.16, 0.58],
        },
        offset: Math.PI / 1.6,
    },
];

const pointerOffsets: Record<CursorSeed["id"], { x: [number, number]; y: [number, number] }> = {
    nova: {
        x: [-80, 110],
        y: [-70, 40],
    },
    atlas: {
        x: [-60, 140],
        y: [-50, 70],
    },
};

const cursorNarratives: Record<
    CursorSeed["id"],
    Record<HandoffStatus, { headline: string; detail: string }>
> = {
    nova: {
        idle: {
            headline: "Nova reviews tokens in real time",
            detail: "Validates the hero CTA stays on-brand across responsive breakpoints.",
        },
        selecting: {
            headline: "Nova rebinds the hero CTA tokens",
            detail: "Pins gradient and radius tokens to the updated design system manifest.",
        },
        commenting: {
            headline: "Nova leaves async copy feedback",
            detail: "Flags the hero microcopy so engineering pulls the latest voice guidance.",
        },
    },
    atlas: {
        idle: {
            headline: "Atlas shadows the motion track",
            detail: "Monitors how playback aligns with the product marketing narrative.",
        },
        selecting: {
            headline: "Atlas scripts the motion timeline",
            detail: "Threads cue points so engineers can mirror the orchestrated flow.",
        },
        commenting: {
            headline: "Atlas annotates the integration hook",
            detail: "Calls out the API handoff to sync with the integrations squad.",
        },
    },
};

const statusBadges: Record<HandoffStatus, { label: string; tint: string }> = {
    idle: { label: "shadowing", tint: "bg-white/30" },
    selecting: { label: "selecting", tint: "bg-brand-400/70" },
    commenting: { label: "commenting", tint: "bg-accent-400/70" },
};

const defaultNarrative = {
    headline: "Live handoff stays in sync",
    detail: "OrbitFlow mirrors every cursor so context crosses the finish line instantly.",
};
function useAnimatedNumber(target: number, config: SpringOptions = numberSpring) {
    const spring = useSpring(target, config);
    const [value, setValue] = useState(target);

    useEffect(() => {
        spring.set(target);
    }, [spring, target]);

    useEffect(() => {
        const unsubscribe = spring.on("change", (latest) => {
            setValue(latest);
        });

        return () => {
            unsubscribe();
        };
    }, [spring]);

    return value;
}

function projectChart(points: number[]) {
    if (points.length === 0) {
        return {
            path: "",
            area: "",
            coordinates: [] as Array<{ x: number; y: number; value: number }>,
        };
    }

    const coordinates = points.map((point, index) => {
        const x =
            points.length === 1
                ? chartDimensions.width
                : (index / (points.length - 1)) * chartDimensions.width;
        const clamped = Math.max(0, Math.min(100, point));
        const y = chartDimensions.height - (clamped / 100) * chartDimensions.height;

        return {
            x,
            y,
            value: clamped,
        };
    });

    const path = coordinates
        .map(({ x, y }, index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
        .join(" ");

    const area = `${path} L ${chartDimensions.width} ${chartDimensions.height} L 0 ${chartDimensions.height} Z`;

    return {
        path,
        area,
        coordinates,
    };
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function synthesizeCursor(seed: CursorSeed, tick: number): HandoffCursor {
    const oscillation = Math.sin(tick + seed.offset);
    const wave = Math.cos(tick / 1.5 + seed.offset * 0.85);

    const xSpan = seed.anchor.x[1] - seed.anchor.x[0];
    const ySpan = seed.anchor.y[1] - seed.anchor.y[0];

    const x = clamp(seed.anchor.x[0] + ((oscillation + 1) / 2) * xSpan, 0, 1);
    const y = clamp(seed.anchor.y[0] + ((wave + 1) / 2) * ySpan, 0, 1);

    const rawIndex = Math.floor((tick / 1.8 + seed.offset) % handoffStatuses.length);
    const normalizedIndex = (rawIndex + handoffStatuses.length) % handoffStatuses.length;
    const status = handoffStatuses[normalizedIndex] ?? "idle";

    return {
        id: seed.id,
        label: seed.label,
        name: seed.name,
        color: seed.color,
        status,
        x,
        y,
        timestamp: Date.now(),
    };
}
export default function Hero() {
    const [leftDesignScope, leftDesignAnimate] = useAnimate();
    const [rightDesignScope, rightDesignAnimate] = useAnimate();

    const [teamSize, setTeamSize] = useState(12);
    const [sprintLength, setSprintLength] = useState(2);
    const [cursorFrames, setCursorFrames] = useState<HandoffCursor[]>(() =>
        handoffSeeds.map((seed) => synthesizeCursor(seed, seed.offset))
    );
    const fallbackTimerRef = useRef<number | null>(null);
    const heartbeatRef = useRef<number | null>(null);
    const reconnectRef = useRef<number | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    const metrics = useMemo(() => {
        const manualOpsHours = teamSize * sprintLength * 5.8;
        const automationRate = 0.38 + teamSize * 0.018;
        const savedHours = Math.round(manualOpsHours * automationRate);

        const velocityLift = Math.round(
            12 + savedHours / Math.max(1, teamSize * sprintLength * 0.45)
        );

        const qualityScore = Math.min(
            97,
            Math.max(72, Math.round(74 + savedHours / 4.5 - sprintLength * 1.6))
        );

        const roiMultiple = Math.min(
            4.3,
            Number((1.45 + savedHours / 150 + velocityLift / 95).toFixed(2))
        );

        const adoptionTrajectory = Array.from({ length: 6 }, (_, index) => {
            const adoptionBase = 42 + sprintLength * 1.9;
            const acceleration = savedHours / Math.max(6, teamSize) / 1.5;
            const momentum = velocityLift / 2.5;
            const signal =
                adoptionBase + index * momentum + Math.sin(index * 1.1) * acceleration;

            return Number(Math.min(100, Math.max(32, signal)).toFixed(1));
        });

        const impactSummary =
            teamSize >= 18
                ? "Enterprise prototype crews collapse review cycles into a shared flight deck."
                : teamSize <= 6
                  ? "Boutique teams trade late-night handoffs for async clarity and sharper rituals."
                  : "Cross-functional pods get a unified cockpit from discovery to launch.";

        return {
            savedHours,
            velocityLift,
            qualityScore,
            roiMultiple,
            adoptionTrajectory,
            impactSummary,
        };
    }, [sprintLength, teamSize]);

    const savedHoursAnimated = useAnimatedNumber(metrics.savedHours);
    const velocityLiftAnimated = useAnimatedNumber(metrics.velocityLift);
    const roiAnimated = useAnimatedNumber(metrics.roiMultiple);
    const qualityScoreAnimated = useAnimatedNumber(metrics.qualityScore);

    const chartProjection = useMemo(
        () => projectChart(metrics.adoptionTrajectory),
        [metrics.adoptionTrajectory]
    );

    const finalChartPoint = chartProjection.coordinates.at(-1);
    useEffect(() => {
        let active = true;
        if (typeof window === "undefined") {
            return;
        }

        let fallbackTick = 0;

        const stopFallback = () => {
            if (fallbackTimerRef.current !== null) {
                window.clearInterval(fallbackTimerRef.current);
                fallbackTimerRef.current = null;
            }
        };

        const startFallback = () => {
            if (fallbackTimerRef.current !== null) {
                return;
            }

            fallbackTimerRef.current = window.setInterval(() => {
                fallbackTick += 0.25;
                setCursorFrames(handoffSeeds.map((seed) => synthesizeCursor(seed, fallbackTick)));
            }, 900);
            setCursorFrames(handoffSeeds.map((seed) => synthesizeCursor(seed, fallbackTick)));
        };

        const applyPayload = (payload: unknown) => {
            if (!Array.isArray(payload)) {
                return;
            }

            stopFallback();

            const mapped = payload
                .map((item) => {
                    if (typeof item !== "object" || item === null) {
                        return null;
                    }

                    const candidate = item as Record<string, unknown>;
                    if (candidate.id !== "nova" && candidate.id !== "atlas") {
                        return null;
                    }

                    const seed = handoffSeeds.find((entry) => entry.id === candidate.id) ?? handoffSeeds[0];
                    const statusCandidate = candidate.status as HandoffStatus | undefined;
                    const status = handoffStatuses.includes(statusCandidate ?? "idle")
                        ? (statusCandidate as HandoffStatus)
                        : "idle";

                    return {
                        id: seed.id,
                        label: seed.label,
                        name: typeof candidate.name === "string" ? candidate.name : seed.name,
                        color: seed.color,
                        status,
                        x: clamp(Number(candidate.x) || 0, 0, 1),
                        y: clamp(Number(candidate.y) || 0, 0, 1),
                        timestamp:
                            typeof candidate.timestamp === "number" ? candidate.timestamp : Date.now(),
                    } as HandoffCursor;
                })
                .filter(Boolean) as HandoffCursor[];

            if (mapped.length) {
                setCursorFrames(mapped);
            }
        };

        const connect = () => {
            if (!active) {
                return;
            }

            try {
                const protocol = window.location.protocol === "https:" ? "wss" : "ws";
                const socket = new WebSocket(`${protocol}://${window.location.host}/api/handoff`);
                wsRef.current = socket;

                socket.addEventListener("open", () => {
                    if (heartbeatRef.current) {
                        window.clearInterval(heartbeatRef.current);
                    }

                    heartbeatRef.current = window.setInterval(() => {
                        if (socket.readyState === WebSocket.OPEN) {
                            socket.send(JSON.stringify({ type: "ping" }));
                        }
                    }, 8000);
                });
                socket.addEventListener("message", (event) => {
                    try {
                        const parsed = JSON.parse(event.data);
                        if (parsed?.type === "handoff:snapshot") {
                            applyPayload(parsed.payload);
                        }
                    } catch (error) {
                        console.error("Failed to parse handoff stream", error);
                    }
                });


                const scheduleReconnect = () => {
                    if (!active) {
                        return;
                    }

                    if (heartbeatRef.current) {
                        window.clearInterval(heartbeatRef.current);
                        heartbeatRef.current = null;
                    }

                    if (reconnectRef.current) {
                        window.clearTimeout(reconnectRef.current);
                    }

                    startFallback();

                    reconnectRef.current = window.setTimeout(() => {
                        connect();
                    }, 2000);
                };

                socket.addEventListener("close", scheduleReconnect);
                socket.addEventListener("error", scheduleReconnect);
            } catch {
                startFallback();
            }
        };

        startFallback();
        connect();

        return () => {
            active = false;
            stopFallback();
            if (heartbeatRef.current) {
                window.clearInterval(heartbeatRef.current);
                heartbeatRef.current = null;
            }
            if (reconnectRef.current) {
                window.clearTimeout(reconnectRef.current);
                reconnectRef.current = null;
            }
            wsRef.current?.close();
        };
    }, []);

    useEffect(() => {
        leftDesignAnimate([
            [leftDesignScope.current, { opacity: [0, 1] }, { duration: 0.5 }],
            [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
        ]);

        rightDesignAnimate([
            [rightDesignScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.2 }],
            [rightDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
        ]);
    }, [leftDesignAnimate, leftDesignScope, rightDesignAnimate, rightDesignScope]);

    const pointerFrames = useMemo(() => {
        return cursorFrames.map((frame) => {
            const ranges = pointerOffsets[frame.id];
            const x = ranges.x[0] + frame.x * (ranges.x[1] - ranges.x[0]);
            const y = ranges.y[0] + frame.y * (ranges.y[1] - ranges.y[0]);

            return {
                ...frame,
                positionClass: frame.id === "nova" ? "absolute left-40 top-96" : "absolute right-72 top-0",
                x,
                y,
            };
        });
    }, [cursorFrames]);

    const latestCursor = useMemo(() => {
        return pointerFrames.reduce<(typeof pointerFrames)[number] | undefined>((latest, frame) => {
            if (!latest || frame.timestamp > latest.timestamp) {
                return frame;
            }
            return latest;
        }, undefined);
    }, [pointerFrames]);

    const latestNarrative = latestCursor
        ? cursorNarratives[latestCursor.id][latestCursor.status]
        : defaultNarrative;
    const latestBadge = latestCursor ? statusBadges[latestCursor.status] : statusBadges.idle;
    return (
        <section
            className="relative overflow-x-clip pb-24 pt-20 md:pt-28"
            style={{
                cursor: `url(${cursorYouImage.src}),auto`,
            }}
        >
            <div className="container relative">
                <motion.div
                    ref={leftDesignScope}
                    initial={{ opacity: 0, y: 80, x: -120 }}
                    drag
                    className="absolute -left-36 top-16 hidden lg:block"
                >
                    <Image src={designExample1Image} alt="OrbitFlow dashboard mockup" draggable="false" />
                </motion.div>
                <motion.div
                    ref={rightDesignScope}
                    initial={{ opacity: 0, x: 160, y: 120 }}
                    drag
                    className="absolute -right-64 -top-10 hidden lg:block"
                >
                    <Image src={designExample2Image} alt="Team collaboration preview" draggable="false" />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 hidden lg:block">
                    {pointerFrames.map((cursor) => (
                        <motion.div
                            key={cursor.id}
                            className={`${cursor.positionClass} flex flex-col items-start gap-2`}
                            initial={{ opacity: 0, x: cursor.x, y: cursor.y }}
                            animate={{ opacity: 1, x: cursor.x, y: cursor.y }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: cursor.status === "idle" ? 0.32 : 0.6,
                                    scale: cursor.status === "selecting" ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className={`absolute -left-8 -top-8 size-16 rounded-full blur-2xl ${
                                    cursor.color === "blue" ? "bg-brand-400/35" : "bg-accent-400/35"
                                }`}
                            />
                            <Pointer name={cursor.label} color={cursor.color} />
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="rounded-full border border-white/10 bg-black/75 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/60 backdrop-blur"
                            >
                                {cursor.name} {statusBadges[cursor.status].label}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 shadow-glass backdrop-blur">
                        <span className="inline-flex h-2 w-2 rounded-full bg-accent-400" />
                        OrbitFlow oversubscribed pre-Series A
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                            $9.1M raised
                        </span>
                    </div>
                </div>
                <h1 className="mt-8 text-center font-display text-5xl font-semibold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
                    Orchestrate your design operations with an autonomous co-pilot
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-white/65 md:text-xl">
                    OrbitFlow syncs strategy, collaboration, and delivery into a single canvas so your product
                    team can ship purposeful experiences days faster without the busywork.
                </p>
                <form className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm shadow-card backdrop-blur lg:flex-row lg:items-center">
                    <div className="flex-1 rounded-xl border border-white/0 bg-black/20 px-4 py-3 text-base text-white/80 focus-within:border-brand-400/60">
                        <label htmlFor="hero-email" className="sr-only">
                            Work email
                        </label>
                        <input
                            id="hero-email"
                            type="email"
                            placeholder="Work email"
                            className="w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
                        />
                    </div>
                    <Button type="submit" className="w-full justify-center lg:w-auto">
                        Join the beta
                    </Button>
                </form>
                <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-80px" }}
                        className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card backdrop-blur md:p-8"
                    >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <span className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/60">
                                Design Ops Simulator
                            </span>
                            <span className="text-xs text-white/50">
                                Real-time scenario modeling
                            </span>
                        </div>
                        <h3 className="mt-6 text-2xl font-semibold text-white">
                            Tune your crew&apos;s operating model
                        </h3>
                        <p className="mt-3 text-sm text-white/60">
                            Dial in team size and sprint cadence to watch OrbitFlow redistribute focus and
                            generate new capacity instantly.
                        </p>
                        <div className="mt-8 space-y-8">
                            <div>
                                <div className="flex items-center justify-between text-sm text-white/70">
                                    <span>Team size</span>
                                    <span>{teamSize} teammates</span>
                                </div>
                                <input
                                    type="range"
                                    min={3}
                                    max={30}
                                    value={teamSize}
                                    onChange={(event) => setTeamSize(Number(event.target.value))}
                                    className="mt-3 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400/60"
                                />
                                <div className="mt-2 flex justify-between text-[11px] uppercase tracking-[0.3em] text-white/30">
                                    <span>3</span>
                                    <span>30</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-sm text-white/70">
                                    <span>Sprint length</span>
                                    <span>
                                        {sprintLength} week{sprintLength > 1 ? "s" : ""}
                                    </span>
                                </div>
                                <div className="mt-4 grid grid-cols-4 gap-2">
                                    {[1, 2, 3, 4].map((option) => {
                                        const isActive = option === sprintLength;

                                        return (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => setSprintLength(option)}
                                                className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                                                    isActive
                                                        ? "border-brand-400/80 bg-brand-500/20 text-white shadow-[0_0_20px_rgba(102,126,234,0.4)]"
                                                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
                                                }`}
                                            >
                                                {option} wk
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-accent-400/50 bg-accent-500/10 px-5 py-4 text-sm text-white/70">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-accent-300 shadow-[0_0_12px_rgba(96,165,250,0.7)]" />
                                    <span>
                                        OrbitFlow hands back {" "}
                                        <span className="font-semibold text-white">
                                            {Math.max(8, Math.round(savedHoursAnimated / sprintLength))} focus
                                        </span>{" "}
                                        hours per sprint for deep work ceremonies.
                                    </span>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/70">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`inline-flex h-2 w-2 rounded-full ${latestBadge.tint}`}
                                    />
                                    <div>
                                        <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Live handoff</p>
                                        <p className="mt-1 text-sm text-white/70">{latestNarrative.headline}</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm text-white/50">{latestNarrative.detail}</p>
                            </div>
                        </div>
                        <div className="mt-auto pt-8">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Operating narrative</p>
                            <p className="mt-3 text-sm text-white/60">{metrics.impactSummary}</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 36 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        viewport={{ once: true, margin: "-80px" }}
                        className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6 shadow-card backdrop-blur xl:p-8"
                    >
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                                    Projected impact
                                </p>
                                <p className="mt-2 text-lg font-medium text-white">
                                    Autonomy unlocked in your next sprint cycle
                                </p>
                            </div>
                            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-[13px] text-white/70">
                                <span>{teamSize} teammates</span>
                                <span className="h-1 w-1 rounded-full bg-white/30" />
                                <span>{sprintLength}-week sprint</span>
                            </div>
                        </div>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 pb-6 pt-7">
                                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Hours returned</p>
                                <p className="text-3xl font-semibold text-white">{Math.round(savedHoursAnimated)}h</p>
                                <p className="text-sm text-white/60">
                                    Reclaimed from handoffs, QA loops, and standing status syncs.
                                </p>
                            </div>
                            <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 pb-6 pt-7">
                                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Velocity lift</p>
                                <p className="text-3xl font-semibold text-white">
                                    +{velocityLiftAnimated.toFixed(1)}%
                                </p>
                                <p className="text-sm text-white/60">
                                    Tickets close faster as async briefs replace ad-hoc reviews.
                                </p>
                            </div>
                            <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 pb-6 pt-7">
                                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Quarterly ROI</p>
                                <p className="text-3xl font-semibold text-white">
                                    {roiAnimated.toFixed(2)}x
                                </p>
                                <p className="text-sm text-white/60">
                                    Relative gain vs. current design ops tooling and orchestration spend.
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40">
                            <span className="inline-flex h-2 w-2 rounded-full bg-brand-400" />
                            <span>Quality alignment index {Math.round(qualityScoreAnimated)}</span>
                        </div>
                        <div className="relative mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
                                <span>Sprint adoption arc</span>
                                <span>Autonomy signal</span>
                            </div>
                            <div className="mt-6 overflow-hidden">
                                <svg
                                    viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
                                    className="h-40 w-full"
                                    role="img"
                                    aria-label="Velocity trend across six sprints"
                                >
                                    <defs>
                                        <linearGradient id="simulatorArea" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="rgba(99,102,241,0.45)" />
                                            <stop offset="100%" stopColor="rgba(14,165,233,0.12)" />
                                        </linearGradient>
                                    </defs>
                                    <motion.path
                                        d={chartProjection.area}
                                        fill="url(#simulatorArea)"
                                        initial={false}
                                        animate={{ d: chartProjection.area }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    />
                                    <motion.path
                                        d={chartProjection.path}
                                        fill="transparent"
                                        stroke="rgba(191,219,254,0.9)"
                                        strokeWidth={2.5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={false}
                                        animate={{ d: chartProjection.path }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    />
                                    {chartProjection.coordinates.map((point, index) => (
                                        <motion.circle
                                            key={`${index}-${point.value.toFixed(1)}`}
                                            cx={point.x}
                                            cy={point.y}
                                            r={index === chartProjection.coordinates.length - 1 ? 5 : 4}
                                            fill="rgba(255,255,255,0.85)"
                                            initial={false}
                                            animate={{ cy: point.y }}
                                            transition={{
                                                duration: 0.6,
                                                ease: "easeOut",
                                                delay: index * 0.05,
                                            }}
                                        />
                                    ))}
                                </svg>
                            </div>
                            <div className="absolute inset-x-6 bottom-4 flex justify-between text-[11px] uppercase tracking-[0.25em] text-white/30">
                                {metrics.adoptionTrajectory.map((_, index) => (
                                    <span key={`label-${index}`}>S{index + 1}</span>
                                ))}
                            </div>
                            {finalChartPoint && (
                                <motion.div
                                    key={`${finalChartPoint.value}-${teamSize}-${sprintLength}`}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="absolute rounded-xl border border-white/20 bg-black/70 px-3 py-2 text-xs text-white/70 backdrop-blur"
                                    style={{
                                        left: `calc(${Math.min(
                                            82,
                                            Math.max(18, (finalChartPoint.x / chartDimensions.width) * 100)
                                        )}% - 40px)`,
                                        top: `calc(${Math.max(
                                            12,
                                            (finalChartPoint.y / chartDimensions.height) * 100
                                        )}% - 48px)`,
                                    }}
                                >
                                    <span className="font-medium text-white">
                                        {finalChartPoint.value.toFixed(0)}
                                    </span>{" "}
                                    alignment score
                                </motion.div>
                            )}
                        </div>
                        <p className="mt-6 text-sm text-white/60">
                            Teams lean on OrbitFlow to auto-generate briefs, resolve token drift, and surface
                            live adoption analytics, so human energy centers on narrative and craft instead of
                            orchestration logistics.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}





