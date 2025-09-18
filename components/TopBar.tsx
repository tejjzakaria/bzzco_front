"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "./ui/resizable-navbar";
import React from 'react'

const TopBar = () => {
    const languages = [
        { value: "en", label: "En" },
        { value: "fr", label: "Fr" },
        { value: "es", label: "Esp" },
        { value: "ned", label: "Ned" },
    ];
    return (
        <div>
            <div className="flex flex-col items-center w-full px-[15vw] bg-orange-900">
                <div className="flex flex-row items-center justify-between py-2 w-full px-4">
                    <span className="text-white text-sm md:text-base">Welcome to Bzz Co!</span>
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-white mr-3 hover:text-orange-500 transition-all text-sm"><a href="/become-a-seller">Become a seller</a></div>

                        <select
                            className="text-sm bg-orange-900 text-white rounded px-1 py-1 border-1 focus:ring-2 focus:ring-orange-500"
                            defaultValue={languages[0].value}
                        >
                            {languages.map(lang => (
                                <option key={lang.value} value={lang.value} className="bg-orange-900 text-white">
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar
