"use client";

import { Badge } from "flowbite-react";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { FaDollarSign } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

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
    console.log((beer * beerPrice) / people);
  }, [beerPrice, people, beer]);

  return (
    <div className="flex flex-row gap-4 mt-10">
      <Badge color="warning" icon={FaDollarSign} size="sm" className="px-3">
        R${beerTotal}
      </Badge>

      <Badge color="warning" icon={BsPeopleFill} size="sm" className="px-3">
        R${beerDivideTotal}
      </Badge>
    </div>
  );
}
