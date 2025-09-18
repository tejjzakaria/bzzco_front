"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export function SearchBarInput() {
  const router = useRouter();
  const placeholders = [
    "Search for products",
    "TvN Products",
    "Paint Products",
    "Cement",
    "Bathroom and Sanitary",
  ];

  const handleChange = () => {};
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const onSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/shop?search=${encodeURIComponent(value.trim())}`);
    }
  };
  return (
    <div className="flex flex-col justify-center  items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        onSearch={onSearch}
      />
    </div>
  );
}
