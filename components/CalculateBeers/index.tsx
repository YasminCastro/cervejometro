"use client";

import { Badge } from "flowbite-react";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { FaDollarSign } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

interface IProps {}

export default function CalculateBeers({}: IProps) {
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [totalPeople, setTotalPeople] = useLocalStorage("totalPeople", 1);
  const [beer, setBeer] = useLocalStorage("beerTotal", 0);
  const [beerTotal, setBeerTotal] = useState(0);
  const [beerDivideTotal, setBeerDivideTotal] = useState(0);

  useEffect(() => {
    setBeerTotal(beer * beerPrice);
    setBeerDivideTotal((beer * beerPrice) / totalPeople);
  }, [beerPrice, totalPeople, beer]);

  return (
    <div className="flex flex-row gap-4">
      <Badge color="warning" icon={FaDollarSign} size="sm" className="px-3">
        R${beerTotal}
      </Badge>

      <Badge color="warning" icon={BsPeopleFill} size="sm" className="px-3">
        R${beerDivideTotal}
      </Badge>
    </div>
  );
}
