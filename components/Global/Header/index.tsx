"use client";

import { Navbar } from "flowbite-react";

import { PiBeerBottleDuotone } from "react-icons/pi";
import SettingsModal from "./SettingsModal";
import ProportionalBill from "./ProportionalBill";
import EqualBill from "./EqualBill";

export default function HeaderDefault() {
  return (
    <Navbar fluid rounded className="w-full bg-transparent  p-7">
      <Navbar.Brand className="text-white">
        <PiBeerBottleDuotone size={30} className="text-amber-300" />
        <span className=" whitespace-nowrap text-xl font-semibold">
          Cervejometro
        </span>
      </Navbar.Brand>
      <Navbar.Toggle className="hover:bg-transparent" />
      <Navbar.Collapse>
        <Navbar.Link className="hover:bg-transparent">
          <EqualBill />
        </Navbar.Link>
        <Navbar.Link className="hover:bg-transparent">
          <ProportionalBill />
        </Navbar.Link>
        <Navbar.Link className="hover:bg-transparent">
          <SettingsModal />
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
