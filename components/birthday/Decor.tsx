/** Small SVG party props + a deterministic, pure-CSS floating layer (no hydration drift). */

export function Balloon({ color, ...p }: { color: string } & React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 40 70" aria-hidden {...p}>
            <path d="M20 2C9 2 3 11 3 21c0 11 9 21 17 24 8-3 17-13 17-24C37 11 31 2 20 2z" fill={color} />
            <path d="M12 12c2-4 6-6 9-6" stroke="#fff" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M17 45h6l-3 5z" fill={color} />
            <path d="M20 50c-4 6 4 10 0 18" stroke="#12306b" strokeOpacity=".5" strokeWidth="1.5" fill="none" />
        </svg>
    );
}

export function Star({ color = "#ffd23f", ...p }: { color?: string } & React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden {...p}>
            <path fill={color} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17l-6.1 3.6 1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
    );
}

export function Note({ color = "#2f7df6", ...p }: { color?: string } & React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden {...p}>
            <path fill={color} d="M9 3v11.3A3.5 3.5 0 1 0 11 17.5V8h8V3z" />
        </svg>
    );
}

export function Cloud(p: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 120 60" aria-hidden {...p}>
            <path fill="#fff" d="M30 56a22 22 0 0 1-2-44 28 28 0 0 1 52-4 24 24 0 0 1 14 48z" />
        </svg>
    );
}

export function Crown(p: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 80 56" aria-hidden {...p}>
            <path d="M6 48L2 12l20 16L40 4l18 24L78 12l-4 36z" fill="#ffd23f" stroke="#ff8a3d" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="40" cy="30" r="4.5" fill="#ff5a5f" />
            <circle cx="20" cy="36" r="3" fill="#2f7df6" />
            <circle cx="60" cy="36" r="3" fill="#7be0c3" />
        </svg>
    );
}

const COLORS = ["#ff5a5f", "#ffd23f", "#2f7df6", "#7be0c3", "#ff8a3d"];

/** Balloons / stars / notes drifting up. Compositor-only transforms. */
export function FloatingBits({ count = 10, className = "" }: { count?: number; className?: string }) {
    return (
        <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
            {Array.from({ length: count }, (_, i) => {
                const style = {
                    left: `${(i * 37 + 6) % 94}%`,
                    width: 22 + ((i * 7) % 22),
                    "--dur": `${11 + ((i * 3) % 8)}s`,
                    "--delay": `${-((i * 2.3) % 14)}s`,
                } as React.CSSProperties;
                const cls = `bit-float absolute bottom-[-12%] ${i >= 6 ? "max-md:hidden" : ""}`;
                const c = COLORS[i % COLORS.length];
                if (i % 3 === 0) return <Balloon key={i} color={c} className={cls} style={style} />;
                if (i % 3 === 1) return <Star key={i} color={c} className={cls} style={style} />;
                return <Note key={i} color={c} className={cls} style={style} />;
            })}
        </div>
    );
}

/** Slow drifting clouds. */
export function Clouds({ className = "" }: { className?: string }) {
    return (
        <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
            {[0, 1, 2, 3].map((i) => (
                <Cloud
                    key={i}
                    className="cloud-drift absolute opacity-90"
                    style={{
                        top: `${8 + i * 22}%`,
                        width: 110 + i * 30,
                        "--dur": `${55 + i * 18}s`,
                        "--delay": `${-i * 17}s`,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}

/** Twinkling star field for the night scenes. */
export function Twinkles({ count = 28 }: { count?: number }) {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: count }, (_, i) => (
                <span
                    key={i}
                    className="twinkle absolute rounded-full bg-white"
                    style={{
                        left: `${(i * 53 + 7) % 100}%`,
                        top: `${(i * 31 + 11) % 100}%`,
                        width: 2 + (i % 3),
                        height: 2 + (i % 3),
                        "--dur": `${2 + (i % 4)}s`,
                        "--delay": `${-(i % 5)}s`,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
