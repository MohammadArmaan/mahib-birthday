/** Server-rendered per-character split. GSAP targets `[data-char]`. */
export function Chars({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span aria-label={text}>
      {text.split(" ").map((word, w) => (
        <span
          key={w}
          aria-hidden
          className="inline-block overflow-hidden whitespace-nowrap pb-[0.12em] align-bottom"
        >
          {[...word].map((c, i) => (
            <span key={i} data-char className={`inline-block will-change-transform ${className}`}>
              {c}
            </span>
          ))}
          {w < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
