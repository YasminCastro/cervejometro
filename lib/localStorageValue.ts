import useLocalStorage from "use-local-storage";

const localStorageValue = () => {
  console.log("GETTING LOCAL STORAGE");
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 10);
  const [totalPeople, setTotalPeople] = useLocalStorage("totalPeople", 1);
  const [tip, setTip] = useLocalStorage("tip", true);
  const [tipValue, setTipValue] = useLocalStorage("tipValue", 10);
  const [beer, setBeer] = useLocalStorage("beerCount", 0);
  const [equallyTab, setEquallyTab] = useLocalStorage("equallyTab", 0);
  const [beerTab, setBeerTab] = useLocalStorage("beerTab", 0);

  return {
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
  };
};

export default localStorageValue;
