"use client";

import { Button } from "flowbite-react";
import { FaMinus, FaPlus } from "react-icons/fa";
import useLocalStorage from "use-local-storage";

interface IProps {}

export default function CountBeers({}: IProps) {
  const [beer, setBeer] = useLocalStorage("beerTotal", 0);
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [people, setPeople] = useLocalStorage("people", 1);

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
          setBeerPrice(0);
          setPeople(1);
        }}
      >
        Resetar
      </Button>
    </div>
  );
}
