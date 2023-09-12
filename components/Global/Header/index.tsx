"use client";

import { Navbar } from "flowbite-react";

import { PiBeerBottleDuotone } from "react-icons/pi";

export default function HeaderDefault() {
  return (
    <Navbar fluid rounded className="w-full bg-transparent p-7">
      <Navbar.Brand className="text-white gap-2">
        <PiBeerBottleDuotone size={30} className="text-amber-300" />
        <span className=" whitespace-nowrap text-xl font-semibold">
          Cervejometro
        </span>
      </Navbar.Brand>
    </Navbar>
  );
}
