"use client";

import { Navbar } from "flowbite-react";

import { PiBeerBottleDuotone } from "react-icons/pi";
import FormModal from "../CalculateBeers/FormModal";

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
          <FormModal />
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
