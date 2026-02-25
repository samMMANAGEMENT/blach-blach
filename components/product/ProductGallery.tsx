"use client";

import { useState } from "react";
import Image from "next/image";
import { getGoogleDriveDirectLink, isGoogleDriveLink } from "@/lib/utils";

interface ProductGalleryProps {
    mainImage: string;
    gallery: string[];
    name: string;
}

export default function ProductGallery({ mainImage, gallery, name }: ProductGalleryProps) {
    const images = [mainImage, ...gallery];
    const [activeImage, setActiveImage] = useState(images[0]);

    return (
        <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="text-6xl font-display font-black text-zinc-700/20 uppercase transform -rotate-12">
                        BLACH BLACH
                    </span>
                </div>
                {activeImage && (
                    <div className="relative w-full h-full p-8 z-10">
                        <Image
                            src={getGoogleDriveDirectLink(activeImage)}
                            alt={name}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            unoptimized={isGoogleDriveLink(activeImage)}
                        />
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest italic z-20">
                    Premium
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`aspect-square relative bg-zinc-900 rounded-lg border overflow-hidden transition-all ${activeImage === img ? "border-primary ring-1 ring-primary" : "border-zinc-800 hover:border-primary/50"
                            }`}
                    >
                        {img && (
                            <div className={`w-full h-full relative p-2 ${activeImage === img ? "opacity-100" : "opacity-50"}`}>
                                <Image
                                    src={getGoogleDriveDirectLink(img)}
                                    alt={`${name} thumbnail ${idx + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="120px"
                                    unoptimized={isGoogleDriveLink(img)}
                                />
                            </div>
                        )}
                    </button>
                ))}
                {/* Placeholder for video toggle if images < 4 */}
                {images.length < 4 && (
                    <div className="aspect-square bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-zinc-600 text-3xl">play_circle</span>
                    </div>
                )}
            </div>
        </div>
    );
}
