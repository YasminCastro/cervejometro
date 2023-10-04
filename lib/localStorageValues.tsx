"use client";

import React, { createContext, useContext, useMemo } from "react";
import useLocalStorage from "use-local-storage";

interface IValue {
  beerPrice: number;
  setBeerPrice: any;
  totalPeople: number;
  setTotalPeople: any;
  tip: boolean;
  setTip: any;
  tipValue: number;
  setTipValue: any;
  beer: number;
  setBeer: any;
  equallyTab: number;
  setEquallyTab: any;
  beerTab: number;
  setBeerTab: any;
  proportionalTab: number;
  setProportionalTab: any;
  proportionalPeople: any[];
  setProportionalPeople: any;
}

const LocalStorageContext = createContext({} as IValue);

export const LocalStorageProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 10);
  const [totalPeople, setTotalPeople] = useLocalStorage("totalPeople", 1);
  const [tip, setTip] = useLocalStorage("tip", true);
  const [tipValue, setTipValue] = useLocalStorage("tipValue", 10);
  const [beer, setBeer] = useLocalStorage("beerCount", 0);
  const [equallyTab, setEquallyTab] = useLocalStorage("equallyTab", 0);
  const [proportionalTab, setProportionalTab] = useLocalStorage(
    "proportionalTab",
    0
  );
  const [beerTab, setBeerTab] = useLocalStorage("beerTab", 0);
  const [proportionalPeople, setProportionalPeople] = useLocalStorage(
    "proportionalPeople",
    [{ name: "", first: 0, last: 0, paid: false }]
  );

  const value = useMemo(
    () => ({
      beerPrice,
      setBeerPrice,
      totalPeople,
      setTotalPeople,
      tip,
      setTip,
      tipValue,
      setTipValue,
      beer,
      setBeer,
      equallyTab,
      setEquallyTab,
      beerTab,
      setBeerTab,
      proportionalTab,
      setProportionalTab,
      proportionalPeople,
      setProportionalPeople,
    }),
    [
      beerPrice,
      setBeerPrice,
      totalPeople,
      setTotalPeople,
      tip,
      setTip,
      tipValue,
      setTipValue,
      beer,
      setBeer,
      equallyTab,
      setEquallyTab,
      beerTab,
      setBeerTab,
      proportionalTab,
      setProportionalTab,
      proportionalPeople,
      setProportionalPeople,
    ]
  );
  return (
    <LocalStorageContext.Provider value={value}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorageValues = (): IValue =>
  useContext(LocalStorageContext);
