"use client";

import Link from "next/link";
import { LuRefreshCw } from "react-icons/lu";
import { FaBars } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import { useState } from "react";

export default function Header() {
  const [barState, setBarState] = useState(false);

  function handleBar() {
    setBarState((prev) => !prev);
  }

  return (
    <header className="w-full bg-[#4D96FF] text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo with accessible label */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-2" title="RandomDecision Home">
          <LuRefreshCw className="text-4xl" aria-hidden="true" />
          <span className="sr-only">RandomDecision Home</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className=" md:flex md:space-x-5" aria-label="Main navigation">
          <Link href="/" className="text-xl font-semibold p-3 rounded-xl hover:bg-[rgba(255,255,255,0.25)] transition-colors duration-300 hidden" title="Spin the Wheel">
            Spin Wheel
          </Link>
          <Link href="/coinflip" className="text-xl font-semibold p-2 sm:p-3 rounded-xl bg-[rgba(255,255,255,0.25)] transition-colors duration-300" title="Flip a Coin">
            Coin Flip
          </Link>
          <Link href="/cardspin" className="text-xl font-semibold p-3 rounded-xl hover:bg-[rgba(255,255,255,0.25)] transition-colors duration-300 hidden" title="Card Spinner">
            Card Spin
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="hidden"
          onClick={handleBar}
          aria-expanded={barState}
          aria-controls="mobile-menu"
          aria-label={barState ? "Close menu" : "Open menu"}
        >
          {barState ? (
            <LiaTimesSolid className="text-2xl cursor-pointer" />
          ) : (
            <FaBars className="text-xl cursor-pointer" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {barState && (
        <nav
          id="mobile-menu"
          className="md:hidden flex flex-col justify-center items-center pt-1 space-y-2"
          aria-label="Mobile navigation"
        >
          <Link href="/" className="text-xl font-semibold p-2 w-full text-center bg-[rgba(255,255,255,0.25)] " title="Spin the Wheel">
            Spin Wheel
          </Link>
          <Link href="/coinflip" className="text-xl font-semibold p-2 w-full text-center bg-[rgba(255,255,255,0.25)]" title="Flip a Coin">
            Coin Flip
          </Link>
          <Link href="/cardspin" className="text-xl font-semibold p-2 w-full text-center bg-[rgba(255,255,255,0.25)] " title="Card Spinner">
            Card Spin
          </Link>
        </nav>
      )}
    </header>
  );
}
