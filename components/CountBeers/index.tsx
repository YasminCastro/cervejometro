"use client";

import { Button } from "flowbite-react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface IProps {
  beer: number;
  setBeer: any;
}

export default function CountBeers({ beer, setBeer }: IProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-4xl bold">{beer}</p>

      <Button.Group>
        <Button
          color="warning"
          size="xl"
          onClick={() => {
            setBeer(beer + 1);
          }}
        >
          <FaPlus />
        </Button>
        <Button
          color="warning"
          size="xl"
          onClick={() => {
            setBeer(beer - 1);
          }}
        >
          <FaMinus />
        </Button>
      </Button.Group>
      <Button
        color="warning"
        size="sm"
        onClick={() => {
          setBeer(0);
        }}
      >
        Resetar
      </Button>
    </div>
  );
}
