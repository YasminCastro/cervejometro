"use client";

import { useEffect, useState } from "react";
import FormModal from "./FormModal";
import useLocalStorage from "use-local-storage";

interface IProps {
  beer: number;
}

export default function CalculateBeers({ beer }: IProps) {
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [people, setPeople] = useLocalStorage("people", 1);
  const [beerTotal, setBeerTotal] = useState(0);
  const [beerDivideTotal, setBeerDivideTotal] = useState(0);

  useEffect(() => {
    setBeerTotal(beer * beerPrice);
    setBeerDivideTotal((beer * beerPrice) / people);
  }, [beerPrice, people, beer]);

  return (
    <div className="flex max-w-md flex-col gap-4">
      <p>Total:R${beerTotal}</p>
      <p>Total dividido:R${beerDivideTotal}</p>

      <FormModal />
    </div>
  );
}
