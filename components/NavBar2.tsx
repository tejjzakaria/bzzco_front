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
import { useState } from "react";
import Select from "react-select";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input_2";
import { SearchBarInput } from "./SearchBar";
import { ShoppingBagIcon, User2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import TopBar from "./TopBar";

export function NavBar() {
    const languages = [
        { value: "en", label: "Eng" },
        { value: "fr", label: "Fr" },
        { value: "es", label: "Esp" },
        { value: "ned", label: "Ned" },
    ];
    const navItems1 = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Shop",
            link: "/shop",
        },
        {
            name: "About",
            link: "/about",
        },
        {
            name: "Contact",
            link: "/contact",
        },
    ];

    // Comprehensive list of placeholders for the search bar
    const searchPlaceholders = [
        "Products",
        "Merchants",
        "Cement",
        "Tiles",
        "Wood",
        "Marble",
        "Paint",
        "Grout",
        "Adhesives",
        "Waterproofing",
        "Insulation",
        "Doors",
        "Windows",
        "Hardware",
        "Tools",
        "Lighting",
        "Plumbing",
        "Electrical",
        "Sand",
        "Bricks",
        "Steel",
        "Glass",
        "Accessories",
        "Kitchen",
        "Bathroom",
        "Livingroom",
        "Bedroom",
        "Office",
        "Commercial",
        "Residential",
        "Eco",
        "Luxury",
        "Budget",
        "Trending",
        "Discounts",
        "Clearance",
        "Popular",
        "Recommended",
        "Exclusive",
        "New",
        "Premium",
        "Outdoor",
        "Home",
        "Shop",
        "Brand",
        "Seller",
        "Deals",
        "Supplies",
        "Building",
        "Flooring",
        "Category",
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Sticky/fixed navbar for always visible navigation
    const { setIsOpen, items } = useCart();
    const cartCount = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
    return (
        <div>
            <TopBar />
            <div className="sticky top-0 left-0 w-full z-50 bg-white dark:bg-zinc-900 shadow-md">
                <Navbar>
                    {/* Desktop Navigation */}
                    <NavBody>
                        <div className="w-full">
                            <div className="w-full flex flex-col items-center justify-center py-4 min-h-[60px] relative">
                                <div className="flex flex-row items-center w-full max-w-7xl gap-8 relative">
                                    {/* Logo first (left) */}
                                    <div className="flex-shrink-0 flex items-center justify-start min-w-[120px]">
                                        <NavbarLogo />
                                    </div>
                                    {/* Nav links (center) */}
                                    <div className="flex-1 flex items-center justify-center">
                                        <nav className="flex items-center">
                                            <ul className="flex flex-row gap-3 py-2 px-0 mb-3 w-full justify-center">
                                                {navItems1.map((item, idx) => (
                                                    <li key={`desktop-link-${idx}`}>
                                                        <a
                                                            href={item.link}
                                                            className={`text-neutral-700 dark:text-neutral-200 font-medium px-4 py-2 rounded-sm transition-colors
                                                            ${pathname === item.link ? 'bg-black text-white dark:bg-zinc-800' : ''}
                                                            hover:text-white hover:bg-black dark:hover:bg-zinc-800`
                                                            }
                                                        >
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    </div>
                                    {/* Cart/User buttons (right) */}
                                    <div className="flex items-center justify-end min-w-[180px] gap-1">
                                        <div className="flex-1 flex w-[8vw] items-center justify-center mr-2">
                                            <PlaceholdersAndVanishInput
                                                placeholders={searchPlaceholders}
                                                onChange={() => { }}
                                                onSubmit={() => { }}
                                            />
                                        </div>

                                        <button className="relative p-2 border-0 border-orange-500 rounded-lg mr-1 hover:bg-orange-100 cursor-pointer transition-all">
                                            <a href="/login"><User2Icon size='22' color="#f37321" /></a>
                                        </button>
                                        <button
                                            className="relative p-2 border-0 border-orange-500 rounded-lg mr-1 hover:bg-orange-100 cursor-pointer transition-all"
                                            onClick={() => setIsOpen(true)}
                                            aria-label="Open cart"
                                        >
                                            <ShoppingBagIcon size='22' color="#f37321" />
                                            {cartCount > 0 && (
                                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </button>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </NavBody>

                    {/* Mobile Navigation */}
                    <MobileNav>
                        <MobileNavHeader>
                            <NavbarLogo />
                            <MobileNavToggle
                                isOpen={isMobileMenuOpen}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            />
                        </MobileNavHeader>

                        <MobileNavMenu
                            isOpen={isMobileMenuOpen}
                            onClose={() => setIsMobileMenuOpen(false)}
                        >
                            {navItems1.map((item, idx) => (
                                <a
                                    key={`mobile-link-${idx}`}
                                    href={item.link}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="relative text-neutral-600 dark:text-neutral-300"
                                >
                                    <span className="block">{item.name}</span>
                                </a>
                            ))}
                            <div className="flex w-full flex-col gap-4">
                                <NavbarButton
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Login
                                </NavbarButton>
                                <NavbarButton
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Book a call
                                </NavbarButton>
                            </div>
                        </MobileNavMenu>
                    </MobileNav>

                </Navbar>
            </div>

        </div>


    );
}

const DummyContent = () => {
    return (
        <div className="container mx-auto p-8 pt-24">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Check the navbar at the top of the container
            </h1>
            <p className="mb-10 text-center text-sm text-zinc-500">
                For demo purpose we have kept the position as{" "}
                <span className="font-medium">Sticky</span>. Keep in mind that this
                component is <span className="font-medium">fixed</span> and will not
                move when scrolling.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {[
                    {
                        id: 1,
                        title: "The",
                        width: "md:col-span-1",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 2,
                        title: "First",
                        width: "md:col-span-2",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 3,
                        title: "Rule",
                        width: "md:col-span-1",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 4,
                        title: "Of",
                        width: "md:col-span-3",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 5,
                        title: "F",
                        width: "md:col-span-1",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 6,
                        title: "Club",
                        width: "md:col-span-2",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 7,
                        title: "Is",
                        width: "md:col-span-2",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 8,
                        title: "You",
                        width: "md:col-span-1",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 9,
                        title: "Do NOT TALK about",
                        width: "md:col-span-2",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 10,
                        title: "F Club",
                        width: "md:col-span-1",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                ].map((box) => (
                    <div
                        key={box.id}
                        className={`${box.width} ${box.height} ${box.bg} flex items-center justify-center rounded-lg p-4 shadow-sm`}
                    >
                        <h2 className="text-xl font-medium">{box.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};
