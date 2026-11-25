"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music } from "lucide-react";
import type { Player } from "@/lib/birthday-music";

export function MusicControl() {
    const player = useRef<Player | null>(null);
    const [on, setOn] = useState(false);
    const [hint, setHint] = useState(true);

    useEffect(() => {
        const t = window.setTimeout(() => setHint(false), 12000);
        return () => {
            clearTimeout(t);
            player.current?.dispose();
            player.current = null;
        };
    }, []);

    const toggle = useCallback(async () => {
        setHint(false);
        if (!player.current) {
            const { createPlayer } = await import("@/lib/birthday-music");
            player.current ??= createPlayer();
        }
        if (on) {
            player.current.pause();
            setOn(false);
        } else {
            try {
                await player.current.play();
                setOn(true);
            } catch {
                setOn(false);
            }
        }
    }, [on]);

    return (
        <div className="fixed right-4 bottom-4 z-50 flex items-center gap-3 md:right-8 md:bottom-8">
            <AnimatePresence>
                {hint && (
                    <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        className="rounded-full bg-sun px-4 py-2 font-display text-sm font-bold text-navy shadow-lg"
                    >
                        Press START for music!
                    </motion.span>
                )}
            </AnimatePresence>
            <motion.button
                type="button"
                onClick={toggle}
                aria-pressed={on}
                aria-label={on ? "Pause music" : "Play music"}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, rotate: -6 }}
                whileTap={{ scale: 0.92 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 14 }}
                className="relative flex size-14 items-center justify-center rounded-full border-4 border-white bg-royal text-white shadow-xl"
            >
                {on && (
                    <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border-4 border-sun"
                        animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                    />
                )}
                <Music className="size-6" aria-hidden />
                <motion.span
                    aria-hidden
                    className="absolute h-1 w-8 -rotate-45 rounded-full bg-white"
                    initial={false}
                    animate={{ opacity: on ? 0 : 1, scaleX: on ? 0 : 1 }}
                    transition={{ duration: 0.25 }}
                />
            </motion.button>
        </div>
    );
}
