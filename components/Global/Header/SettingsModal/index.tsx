"use client";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { BsPeopleFill, BsPercent } from "react-icons/bs";
import useLocalStorage from "use-local-storage";
import { SubmitHandler, useForm } from "react-hook-form";

interface IProps {}

type Inputs = {
  beerPrice: string;
  totalPeople: string;
  tipValue: string;
  tip: boolean;
};

export default function SettingsModal({}: IProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", "0");
  const [totalPeople, setTotalPeople] = useLocalStorage("totalPeople", "1");
  const [tip, setTip] = useLocalStorage("tip", true);
  const [tipValue, setTipValue] = useLocalStorage("tipValue", "10");
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      beerPrice,
      tipValue,
      totalPeople,
      tip,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({
    tip: tipChecked,
    totalPeople,
    tipValue,
    beerPrice,
  }) => {
    setTip(tipChecked);
    setBeerPrice(beerPrice);
    setTotalPeople(totalPeople);
    setTipValue(tipValue);

    props.setOpenModal(undefined);
  };

  const props = { openModal, setOpenModal };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Button
        onClick={() => props.setOpenModal("form-elements")}
        color="warning"
        className="bg-transparent"
        size="sm"
      >
        Configurações
      </Button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          {loading ? (
            <Spinner aria-label="Warning spinner example" color="warning" />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="price" value="Valor da cerveja" />
                <TextInput
                  icon={FaDollarSign}
                  id="price"
                  required
                  type="number"
                  step="0.10"
                  defaultValue={beerPrice}
                  {...register("beerPrice")}
                />
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

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox
                    id="tip"
                    defaultChecked={tip}
                    {...register("tip")}
                  />
                  <Label htmlFor="tip">Calcular com a %?</Label>
                </div>
                <TextInput
                  rightIcon={BsPercent}
                  id="tipValue"
                  required
                  type="number"
                  defaultValue={tipValue}
                  min={1}
                  max={100}
                  {...register("tipValue")}
                />
              </div>

              <Button type="submit" color="warning">
                Salvar
              </Button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
