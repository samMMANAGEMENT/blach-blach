'use client';

import React, { useState, useEffect } from 'react';

interface CounterProps {
    target: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
}

export default function Counter({ target, duration = 2000, prefix = '', suffix = '' }: CounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function: easeOutExpo
            const easeOutExpo = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

            const currentCount = Math.floor(easeOutExpo * target);
            setCount(currentCount);

            if (percentage < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [target, duration]);

    return (
        <span className="tabular-nums">
            {prefix}{count}{suffix}
        </span>
    );
}
