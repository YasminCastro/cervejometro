"use client";

import React, { createContext, useContext, useMemo } from "react";
import useLocalStorage from "use-local-storage";

interface IValue {
  beerPrice: number;
  setBeerPrice: any;
  tip: boolean;
  setTip: any;
  tipValue: number;
  setTipValue: any;
  beer: number;
  setBeer: any;
  beerTab: number;
  setBeerTab: any;
  proportionalTab: any;
  setProportionalTab: any;
  proportionalPeople: any[];
  setProportionalPeople: any;
}

const LocalStorageContext = createContext({} as IValue);

export const LocalStorageProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 10);
  const [tip, setTip] = useLocalStorage("tip", true);
  const [tipValue, setTipValue] = useLocalStorage("tipValue", 10);
  const [beer, setBeer] = useLocalStorage("beerCount", 0);
  const [proportionalTab, setProportionalTab] = useLocalStorage<any>(
    "proportionalTab",
    {}
  );
  const [beerTab, setBeerTab] = useLocalStorage("beerTab", 0);
  const [proportionalPeople, setProportionalPeople] = useLocalStorage(
    "proportionalPeople",
    []
  );

  const value = useMemo(
    () => ({
      beerPrice,
      setBeerPrice,
      tip,
      setTip,
      tipValue,
      setTipValue,
      beer,
      setBeer,
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
      tip,
      setTip,
      tipValue,
      setTipValue,
      beer,
      setBeer,
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
