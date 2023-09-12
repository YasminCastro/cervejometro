"use client";

import { Button, Modal, Spinner } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import useLocalStorage from "use-local-storage";
import PersonsForm from "./PersonForm";
import { calculateProportionalBill } from "@/lib/calculateProportionalBill";
import calculateEqualBill from "@/lib/calculateEqualBill";

interface IProps {
  setOpenModal: Dispatch<SetStateAction<string | undefined>>;
  openModal: string | undefined;
}

export default function ProportionalBill({ setOpenModal, openModal }: IProps) {
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 10);
  const [totalPeople, setTotalPeople] = useLocalStorage("totalPeople", 1);
  const [tip, setTip] = useLocalStorage("tip", true);
  const [tipValue, setTipValue] = useLocalStorage("tipValue", 10);
  const [loading, setLoading] = useState(true);
  const [beer, setBeer] = useLocalStorage("beerCount", 0);
  const [beerCount, setbeerCount] = useState(0);
  const [individualBills, setIndividualBills] = useState<{
    [key: string]: number;
  }>({});
  const [inputs, setInputs] = useState([{ name: "", first: 0, last: 0 }]);

  useEffect(() => {
    const [beerCountPrice] = calculateEqualBill(
      beer,
      beerPrice,
      tip,
      tipValue,
      totalPeople
    );

    setbeerCount(beerCountPrice);
    setLoading(false);
  }, [beerPrice, totalPeople, beer, tip, tipValue]);

  const handleAddInput = () => {
    setInputs([...inputs, { name: "", first: 0, last: 0 }]);
  };

  const HandleCalc = () => {
    const individualBills = calculateProportionalBill(
      inputs,
      beer,
      beerPrice,
      tip,
      tipValue
    );
    setIndividualBills(individualBills);
  };

  return (
    <Modal
      show={openModal === "proportionalBill"}
      size="md"
      popup
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header>Dividir conta proporcionalmente</Modal.Header>
      <Modal.Body>
        {loading ? (
          <Spinner aria-label="Warning spinner example" color="warning" />
        ) : (
          <div className="space-y-6 ">
            <div>
              <p className="flex items-center">
                Total: {<FaDollarSign />} {beerCount}
              </p>
            </div>

            {inputs.map((input, index) => (
              <PersonsForm
                index={index}
                inputs={inputs}
                setInputs={setInputs}
                key={index}
              />
            ))}

            <div className="flex justify-around max-sm:flex-col max-sm:gap-2">
              <Button color="warning" onClick={handleAddInput}>
                Adicionar pessoa
              </Button>
              <Button color="warning" onClick={HandleCalc}>
                Calcular
              </Button>
            </div>

            <div>
              {Object.keys(individualBills).length > 0 && (
                <p className="text-lg font-bold">Dividido proporcionalmente:</p>
              )}

              {Object.entries(individualBills).map(([key, value]) => (
                <div key={key}>{`${key}: R$${value}`}</div>
              ))}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
