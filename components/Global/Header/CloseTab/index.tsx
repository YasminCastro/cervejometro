"use client";

import { Button, Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import useLocalStorage from "use-local-storage";
import PersonsForm from "./PersonForm";
import { calculateProportionalBill } from "@/lib/calculateProportionalBill";
import calculateEqualBill from "@/lib/calculateEqualBill";

interface IProps {}

export default function CloseTab({}: IProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [totalPeople, setTotalPeople] = useLocalStorage("totalPeople", 1);
  const [tip, setTip] = useLocalStorage("tip", true);
  const [tipValue, setTipValue] = useLocalStorage("tipValue", 10);
  const [loading, setLoading] = useState(true);
  const [beer, setBeer] = useLocalStorage("beerTotal", 0);
  const [beerTotal, setBeerTotal] = useState(0);
  const [beerDivideTotal, setBeerDivideTotal] = useState(0);
  const [individualBills, setIndividualBills] = useState<{
    [key: string]: number;
  }>({});
  const [inputs, setInputs] = useState<any[]>([]);

  const props = { openModal, setOpenModal };

  useEffect(() => {
    const [beerTotalPrice, beerDivideTotal] = calculateEqualBill(
      beer,
      beerPrice,
      tip,
      tipValue,
      totalPeople
    );

    setBeerTotal(beerTotalPrice);
    setBeerDivideTotal(beerDivideTotal);
    setLoading(false);
  }, [beerPrice, totalPeople, beer, tip, tipValue]);

  const handleAddInput = () => {
    setInputs([...inputs, { name: "", first: 0, last: 0, total: 0 }]);
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
    <>
      <Button
        onClick={() => props.setOpenModal("form-elements")}
        color="warning"
        className="bg-transparent"
        size="sm"
      >
        Fechar Conta
      </Button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Conta</Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner aria-label="Warning spinner example" color="warning" />
          ) : (
            <div className="space-y-6 ">
              <div>
                <p className="flex items-center">
                  Total: {<FaDollarSign />} {beerTotal}
                </p>
              </div>

              <div>
                <p className="flex items-center">
                  Dividido por {totalPeople} pessoas: {<FaDollarSign />}
                  {beerDivideTotal}
                </p>
              </div>

              <hr></hr>

              {inputs.map((input, index) => (
                <PersonsForm
                  index={index}
                  inputs={inputs}
                  setInputs={setInputs}
                  beer={beer}
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
                  <p className="text-lg font-bold">
                    Dividido proporcionalmente:
                  </p>
                )}

                {Object.entries(individualBills).map(([key, value]) => (
                  <div key={key}>{`${key}: R$${value}`}</div>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
