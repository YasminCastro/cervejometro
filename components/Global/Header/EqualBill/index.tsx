"use client";

import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import useLocalStorage from "use-local-storage";
import calculateEqualBill from "@/lib/calculateEqualBill";
import { BsPeopleFill } from "react-icons/bs";

interface IProps {}

export default function EqualBill({}: IProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [totalPeople, setTotalPeople] = useLocalStorage("totalPeople", 1);
  const [tip, setTip] = useLocalStorage("tip", true);
  const [tipValue, setTipValue] = useLocalStorage("tipValue", 10);
  const [loading, setLoading] = useState(true);
  const [beer, setBeer] = useLocalStorage("beerTotal", 0);
  const [beerTotal, setBeerTotal] = useState(0);
  const [beerDivideTotal, setBeerDivideTotal] = useState(0);

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

  return (
    <>
      <Button
        onClick={() => props.setOpenModal("form-elements")}
        color="warning"
        className="bg-transparent"
        size="sm"
      >
        Dividir igualmente
      </Button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Dividir da conta igualmente</Modal.Header>
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

              <div>
                <Label htmlFor="totalPeople" value="Qtd. de pessoas" />
                <TextInput
                  icon={BsPeopleFill}
                  id="totalPeople"
                  required
                  type="number"
                  onChange={(event) =>
                    setTotalPeople(parseInt(event.target.value))
                  }
                  defaultValue={totalPeople}
                  min={1}
                />
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
