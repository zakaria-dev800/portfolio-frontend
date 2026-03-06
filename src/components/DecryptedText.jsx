import { useEffect, useState, useRef } from "react";

/**
 * Simple "decryption" text effect.
 * Props:
 *   - text: string to display
 *   - speed: number (ms between revealing characters)
 *   - revealDirection: "start" | "end"
 *   - sequential: boolean (ignored, always sequential for now)
 *   - className: applied to outer wrapper when characters are revealed
 *   - encryptedClassName: applied to characters not yet revealed
 *
 * Note: animateOn and sequential props are not fully supported yet;
 * the component always starts the animation on mount.  Feel free to
 * extend it to use an IntersectionObserver if you want "view" trigger.
 */

export default function DecryptedText({
    text = "",
    speed = 50,
    revealDirection = "start",
    sequential = true,
    animateOn = "mount",
    className = "",
    encryptedClassName = "",
}) {
    const [revealedIndex, setRevealedIndex] = useState(
        revealDirection === "end" ? text.length - 1 : 0
    );
    const intervalRef = useRef(null);

    useEffect(() => {
        // reset when text or direction changes
        setRevealedIndex(revealDirection === "end" ? text.length - 1 : 0);

        if (!text) return;

        clearInterval(intervalRef.current);
        let idx = revealDirection === "end" ? text.length - 1 : 0;

        intervalRef.current = setInterval(() => {
            setRevealedIndex((prev) => {
                if (revealDirection === "end") {
                    if (prev <= 0) {
                        clearInterval(intervalRef.current);
                        return prev;
                    }
                    return prev - 1;
                } else {
                    if (prev >= text.length - 1) {
                        clearInterval(intervalRef.current);
                        return prev;
                    }
                    return prev + 1;
                }
            });
        }, speed);

        return () => clearInterval(intervalRef.current);
    }, [text, speed, revealDirection]);

    const chars = text.split("");

    return (
        <span className={className}>
            {chars.map((ch, i) => {
                const isRevealed =
                    revealDirection === "end" ? i >= revealedIndex : i <= revealedIndex;
                return (
                    <span key={i} className={isRevealed ? "" : encryptedClassName}>
                        {isRevealed ? ch : "\u25A0" /* block character as placeholder */}
                    </span>
                );
            })}
        </span>
    );
}
