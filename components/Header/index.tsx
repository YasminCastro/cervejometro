"use client";

import { Navbar } from "flowbite-react";

import { PiBeerBottleDuotone } from "react-icons/pi";

export default function HeaderDefault() {
  return (
    <Navbar fluid rounded className="w-full bg-transparent flex p-7">
      <Navbar.Brand href="https://flowbite-react.com" className="text-white">
        <PiBeerBottleDuotone size={30} className="text-amber-300" />
        <span className=" whitespace-nowrap text-xl font-semibold">
          Cervejometro
        </span>
      </Navbar.Brand>
      {/* <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link active href="#">
          <p>Home</p>
        </Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
