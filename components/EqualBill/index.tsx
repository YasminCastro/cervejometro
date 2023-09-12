"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";

import { SubmitHandler, useForm } from "react-hook-form";

import { FaDollarSign } from "react-icons/fa";
import { BsPeopleFill, BsPercent } from "react-icons/bs";
import { PiBeerBottleDuotone } from "react-icons/pi";

import calculateEqualBill from "@/lib/calculateEqualBill";
import { useLocalStorageValues } from "@/lib/localStorageValues";

const LOADING_TIMEOUT = 2000;

interface IProps {
  setOpenModal: Dispatch<SetStateAction<string | undefined>>;
  openModal: string | undefined;
}

type Inputs = {
  totalPeople: any;
  beerPrice: any;
  tipValue: any;
  tip: any;
  beer: any;
};

export default function EqualBill({ setOpenModal, openModal }: IProps) {
  const [loading, setLoading] = useState(true);

  const {
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
  } = useLocalStorageValues();

  useEffect(() => {
    if (openModal === "equalBill") {
      const timer = setTimeout(() => setLoading(false), LOADING_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [openModal]);

  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      beerPrice,
      tipValue,
      totalPeople,
      tip,
      beer,
    },
  });

  useEffect(() => {
    setValue("beer", beer);
    setValue("beerPrice", beerPrice);
    setValue("totalPeople", totalPeople);
    setValue("tip", tip);
    setValue("tipValue", tipValue);
  }, [beer, beerPrice, totalPeople, tip, tipValue, setValue]);

  const onSubmit: SubmitHandler<Inputs> = ({
    totalPeople,
    beer,
    beerPrice,
    tip,
    tipValue,
  }) => {
    setTotalPeople(parseInt(totalPeople));
    setBeer(parseInt(beer));
    setBeerPrice(parseFloat(beerPrice));
    setTipValue(parseFloat(tipValue));

    const [beerCountPrice, beerDivideTotal] = calculateEqualBill(
      beer,
      beerPrice,
      tip,
      tipValue,
      totalPeople
    );
    setBeerTab(beerCountPrice);
    setEquallyTab(beerDivideTotal);
  };

  return (
    <Modal
      show={openModal === "equalBill"}
      size="xl"
      popup
      onClose={() => {
        setOpenModal(undefined);
        setLoading(true);
      }}
    >
      <Modal.Header>Dividir conta igualmente</Modal.Header>
      {loading ? (
        <Modal.Body className="flex justify-center">
          <Spinner aria-label="Spinner" color="warning" size="lg" />
        </Modal.Body>
      ) : (
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="price" value="Valor da cerveja" />
              <TextInput
                icon={FaDollarSign}
                id="price"
                required
                type="number"
                step="0.10"
                {...register("beerPrice")}
              />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="tip"
                  {...register("tip")}
                  onClick={() => {
                    setTip(!tip);
                  }}
                />
                <Label htmlFor="tip">Calcular %?</Label>
              </div>
              {tip && (
                <TextInput
                  rightIcon={BsPercent}
                  id="tipValue"
                  required
                  type="number"
                  min={1}
                  max={100}
                  {...register("tipValue")}
                />
              )}
            </div>

            <div>
              <Label htmlFor="beer" value="Qtd de cervejas" />
              <TextInput
                icon={PiBeerBottleDuotone}
                id="beer"
                required
                type="number"
                {...register("beer")}
              />
            </div>

            <div>
              <Label htmlFor="totalPeople" value="Qtd. de pessoas" />
              <TextInput
                icon={BsPeopleFill}
                id="totalPeople"
                required
                type="number"
                {...register("totalPeople")}
                min={1}
              />
            </div>

            <Button type="submit" color="warning">
              Calcular
            </Button>
          </form>
          {beerTab !== 0 && (
            <div className="mt-4">
              <p className="flex items-center">
                Total: {<FaDollarSign />} {beerTab}
              </p>
              <p className="flex items-center">
                Dividido por {totalPeople} pessoas: {<FaDollarSign />}
                {equallyTab}
              </p>
            </div>
          )}
        </Modal.Body>
      )}
    </Modal>
  );
}
