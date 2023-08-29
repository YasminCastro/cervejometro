"use client";

import { Footer } from "flowbite-react";

export default function FooterDefault() {
  return (
    <Footer container className="border-t border-t-gray-400 bg-transparent ">
      <Footer.Copyright
        by="Yas Castro™"
        href="https://www.yascastro.com.br"
        year={2023}
      />
    </Footer>
  );
}
