'use client';

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardPremiumFloor from "./CardPremiumFloor";

interface SliderCard {
  title: string;
  subtitle: string;
  offer: string;
  image: string;
  accent: string;
  blue: string;
}

const PremiumFloorSlider = () => {
  const [sliderData, setSliderData] = useState<SliderCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const res = await fetch("/api/slider");
        if (!res.ok) throw new Error("Failed to fetch slider data");
        const data = await res.json();
        setSliderData(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchSliderData();
  }, []);

  if (loading) {
    return <div className="w-full flex items-center justify-center py-8">Loading slider...</div>;
  }
  if (error) {
    return <div className="w-full flex items-center justify-center py-8 text-red-500">{error}</div>;
  }
  if (!sliderData.length) {
    return <div className="w-full text-center py-8">No slides available.</div>;
  }

  return (
    <div className="w-full flex items-center justify-center">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={32}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full max-w-5xl"
      >
        {sliderData.map((card: SliderCard, idx: number) => (
          <SwiperSlide key={idx}>
            <CardPremiumFloor
              title={card.title}
              subtitle={card.subtitle}
              offer={card.offer}
              image={card.image}
              accent={card.accent}
              blue={card.blue}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PremiumFloorSlider;
