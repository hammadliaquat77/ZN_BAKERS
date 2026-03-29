'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import image1 from "@/public/jonas-jacobsson-RFHFV7lVQBY-unsplash.jpg"
import image2 from "@/public/patrick-fore-NnTQBkBkU9g-unsplash.jpg"
import image3 from "@/public/rakesh-sitnoor-wvQk48s--zw-unsplash.jpg"



const slides = [
    {
        title: "Baked with",
        highlight: "Love & Craft",
        desc: "Premium cakes, breads, and desserts handcrafted fresh every day.",
        img: image1,
    },
    {
        title: "Fresh &",
        highlight: "Delicious",
        desc: "Experience the taste of freshly baked artisan bakery items.",
        img: image2,
    },
    {
        title: "Sweet",
        highlight: "Moments",
        desc: "Celebrate every moment with our special desserts.",
        img: image3,
    }
]

export default function Hero() {
    const [current, setCurrent] = useState(0)

    // Auto Slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5C3317] to-[#3D1F0E] flex items-center px-[5%] relative overflow-hidden">

            {/* LEFT CONTENT */}
            <div className="w-full md:w-1/2 z-10 pt-[80px]">
                <div className="max-w-[550px]">

                    <div className="inline-block border border-[#C9A84C] text-[#C9A84C] text-[0.7rem] font-semibold tracking-[3px] uppercase px-4 py-1.5 mb-6">
                        Artisan Bakery Since 2010
                    </div>

                    <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-black text-white leading-[1.1] mb-5">
                        {slides[current].title}
                        <em className="italic text-[#C9A84C] block">
                            {slides[current].highlight}
                        </em>
                    </h1>

                    <p className="text-lg text-white/70 leading-[1.7] mb-8">
                        {slides[current].desc}
                    </p>

                    <div className="flex gap-4 flex-wrap">
                        <Link href="/menu" className="bg-[#C9A84C] text-[#2C1810] px-8 py-3 text-sm font-bold tracking-[2px] uppercase hover:bg-yellow-400 transition">
                            Explore Menu
                        </Link>
                        <Link href="/cart" className="border border-white/40 px-8 py-3 text-sm text-white hover:border-[#C9A84C] hover:text-[#C9A84C] transition">
                            Order Now
                        </Link>
                    </div>

                </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="hidden md:flex w-1/2 justify-center items-center relative">
        
                <Image
                    src={slides[current].img}
                    alt="cake"
                    className="w-[500px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-700"
                    width={500}
                    height={500}
                />
            </div>

            {/* SLIDER DOTS */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${current === index ? 'bg-[#C9A84C] scale-125' : 'bg-white/40'
                            }`}
                    />
                ))}
            </div>

        </section>
    )
}