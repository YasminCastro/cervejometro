"use client";

import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import useLocalStorage from "use-local-storage";
import calculateEqualBill from "@/lib/calculateEqualBill";
import { BsPeopleFill } from "react-icons/bs";
import { SubmitHandler, useForm } from "react-hook-form";

interface IProps {
  setOpenModal: Dispatch<SetStateAction<string | undefined>>;
  openModal: string | undefined;
}

export default function EqualBill({ setOpenModal, openModal }: IProps) {
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [totalPeople, setTotalPeople] = useLocalStorage("totalPeople", 1);
  const [tip, setTip] = useLocalStorage("tip", true);
  const [tipValue, setTipValue] = useLocalStorage("tipValue", 10);
  const [loading, setLoading] = useState(true);
  const [beer, setBeer] = useLocalStorage("beerTotal", 0);
  const [beerTotal, setBeerTotal] = useState(0);
  const [beerDivideTotal, setBeerDivideTotal] = useState(0);

  type Inputs = {
    totalPeople: any;
  };

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

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      totalPeople,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({ totalPeople }) => {
    setTotalPeople(parseInt(totalPeople));
  };

  return (
    <Modal
      show={openModal === "equalBill"}
      size="md"
      popup
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header>Dividir conta igualmente</Modal.Header>
      <Modal.Body>
        {loading ? (
          <Spinner aria-label="Warning spinner example" color="warning" />
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                defaultValue={totalPeople}
                {...register("totalPeople")}
                min={1}
              />
            </div>
            <Button type="submit" color="warning">
              Calcular
            </Button>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}
