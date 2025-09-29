"use client";

import { IconArrowRight, IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState("");

  return (
    <footer className="w-full bg-orange-100 text-gray-800 py-8 sm:py-10 px-4 sm:px-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-16">
        {/* Logo, Brand, and Contact Info */}
        <div className="flex flex-col items-center md:items-start gap-3 flex-1 min-w-[140px] sm:min-w-[180px]">
          <Image src="/logo.png" alt="Company Logo" width={56} height={56} className="mb-2" />
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-1 mt-2">
            <h4 className="font-semibold text-orange-500 mb-1">Contact Us</h4>
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <IconMail size={30} className="text-white bg-orange-500 p-1 rounded-md" />
              <span className="text-xs sm:text-sm"><a href="mailto:support@bzzco.com" className="hover:text-orange-500 transition">support@bzzco.com</a></span>
            </div>
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <IconPhone size={30} className="text-white bg-orange-500 p-1 rounded-md" />
              <span className="text-xs sm:text-sm"><a href="tel:+1234567890" className="hover:text-orange-500 transition">+1 234 567 890</a></span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <IconMapPin size={30} className="text-white bg-orange-500 p-1 rounded-md" />
              <span className="text-xs sm:text-sm">Poortland 146, 1046BD Amsterdam</span>
            </div>
          </div>
        </div>
        {/* Company Links */}
        <div className="flex flex-col items-center md:items-start gap-3 flex-1 min-w-[120px] sm:min-w-[160px]">
          <h4 className="font-semibold mb-2 text-orange-500">Company</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Careers</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Blog</a></li>
          </ul>
        </div>
        {/* Support Links */}
        <div className="flex flex-col items-center md:items-start gap-3 flex-1 min-w-[120px] sm:min-w-[160px]">
          <h4 className="font-semibold mb-2 text-orange-500">Support</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-orange-500 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Returns</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Shipping</a></li>
          </ul>
        </div>
        {/* Legal Links */}
        <div className="flex flex-col items-center md:items-start gap-3 flex-1 min-w-[120px] sm:min-w-[160px]">
          <h4 className="font-semibold mb-2 text-orange-500">Legal</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-orange-500 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Terms of Service</a></li>
          </ul>
        </div>
        {/* Newsletter Subscription */}
        <div className="flex flex-col items-center md:items-end gap-3 flex-1 min-w-[180px]">
          <h4 className="font-semibold text-orange-500 mb-1">Subscribe to our Newsletter</h4>
          <form className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-xs" onSubmit={async (e) => {
            e.preventDefault();
            setNewsletterError("");
            setNewsletterSuccess("");
            setNewsletterLoading(true);
            try {
              const email = newsletterEmail;
              const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });
              const data = await res.json();
              if (res.ok) {
                setNewsletterSuccess("Subscribed successfully!");
                setNewsletterEmail("");
              } else {
                setNewsletterError(data.error || "Failed to subscribe.");
              }
            } catch {
              setNewsletterError("Failed to subscribe.");
            } finally {
              setNewsletterLoading(false);
            }
          }}>
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full px-3 py-2 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              disabled={newsletterLoading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm transition"
              disabled={newsletterLoading}
            >
              {newsletterLoading ? "..." : <IconArrowRight size={21} />}
            </button>
          </form>
          {newsletterSuccess && <span className="text-xs text-green-600 mt-1">{newsletterSuccess}</span>}
          {newsletterError && <span className="text-xs text-red-600 mt-1">{newsletterError}</span>}
          <span className="text-xs text-gray-500 mt-1">Get the latest updates and offers.</span>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-gray-500 border-t border-orange-200 pt-4">
        &copy; {new Date().getFullYear()} Bzz Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
