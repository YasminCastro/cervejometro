"use client";

import useLocalStorage from "use-local-storage";
import { useEffect, useState } from "react";
import CountBeers from "@/components/CountBeers";
import { Spinner } from "flowbite-react";

export default function Home() {
  const [beer, setBeer] = useLocalStorage("beerTotal", 0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [beer]);

  return (
    <div>
      {loading ? (
        <Spinner aria-label="Warning spinner example" color="warning" />
      ) : (
        <CountBeers beer={beer} setBeer={setBeer} />
      )}
    </div>
  );
}
