import React from 'react'
import Image from 'next/image';
import { Card } from './ui/card'


interface CardPremiumFloorProps {
  title: string;
  subtitle: string;
  offer: string;
  image: string;
  accent: string;
  blue: string;
}

const CardPremiumFloor = ({ title, subtitle, offer, image, accent, blue }: CardPremiumFloorProps) => {
    return (
        <div className="p-0 md:p-0 flex items-center justify-center">
            <Card className="relative overflow-hidden w-[800px] min-h-[24rem] bg-gradient-promo shadow-promo rounded-xl mb-20 flex items-stretch">
                <div className="relative flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        {/* Blue overlay */}
                        <div className="absolute top-0 left-0 h-full w-3/4 rounded-r-[999px] z-0" style={{ background: blue }} />
                        {/* Orange accent circle */}
                        <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full shadow-glow opacity-90" style={{ background: accent }} />

                        {/* Decorative dots */}
                        <div className="absolute top-1/2 left-8 md:left-16 flex gap-1">
                            <div className="w-2 h-2 bg-primary-foreground rounded-full opacity-60" />
                            <div className="w-2 h-2 bg-primary-foreground rounded-full opacity-40" />
                            <div className="w-2 h-2 bg-primary-foreground rounded-full opacity-20" />
                            <div className="w-2 h-2 bg-primary-foreground rounded-full opacity-10" />
                            <div className="w-2 h-2 bg-primary-foreground rounded-full opacity-5" />
                        </div>

                        {/* Main content */}
                        <div className="relative z-10 max-w-2xl">
                            <p className="text-primary-foreground/90 text-sm md:text-base font-medium mb-4 tracking-wide">
                                {subtitle}
                            </p>

                            <h1 className="text-primary-foreground text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                {typeof title === 'string' ? title.split("\n")[0] : ''}<br />
                                <span className="block">{typeof title === 'string' && title.split("\n")[1] ? title.split("\n")[1] : ''}</span>
                            </h1>

                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-primary-foreground text-xl md:text-2xl font-bold">
                                    {offer}
                                </span>
                            </div>

                            {/* Decorative line with dots */}
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-0.5 bg-primary-foreground/60" />
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Background pattern overlay */}

                        <div className="absolute top-0 right-0 w-3/5 h-full overflow-hidden">
                            {/* Background Image - always fills area */}
                            <Image
                                src={image}
                                alt="Card background"
                                className="object-cover object-center w-full h-full min-h-full min-w-full block"
                                style={{ display: 'block', height: '100%', width: '100%' }}
                                draggable={false}
                                width={800}
                                height={384}
                            />
                            {/* Black Overlay */}
                            <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
                        </div>

                </div>
            </Card>
        </div>
    )
}

export default CardPremiumFloor
