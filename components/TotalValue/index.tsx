"use client";

import { Badge } from "flowbite-react";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { FaDollarSign } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import calculateTip from "@/lib/calculateTip";

interface IProps {}

export default function TotalValue({}: IProps) {
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [totalPeople, setTotalPeople] = useLocalStorage("totalPeople", 1);
  const [beer, setBeer] = useLocalStorage("beerTotal", 0);
  const [tip, setTip] = useLocalStorage("tip", true);
  const [tipValue, setTipValue] = useLocalStorage("tipValue", 10);
  const [beerTotal, setBeerTotal] = useState(0);
  const [beerDivideTotal, setBeerDivideTotal] = useState(0);

  useEffect(() => {
    let beerTotal = beer * beerPrice;
    if (tip) {
      beerTotal = calculateTip(beerTotal, tipValue);
      console.log(beerTotal);
    }
    const beerDivideTotal = beerTotal / totalPeople;
    setBeerTotal(parseFloat(beerTotal.toFixed(2)));
    setBeerDivideTotal(parseFloat(beerDivideTotal.toFixed(2)));
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
