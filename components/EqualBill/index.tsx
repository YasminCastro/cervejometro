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
import localStorageValue from "@/lib/localStorageValue";

const LOADING_TIMEOUT = 2000;

interface IProps {
  setOpenModal: Dispatch<SetStateAction<string | undefined>>;
  openModal: string | undefined;
}

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
  } = localStorageValue();

  type Inputs = {
    totalPeople: any;
    beerPrice: any;
    tipValue: any;
    tip: any;
    beer: any;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, LOADING_TIMEOUT);
  }, []);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      beerPrice,
      tipValue,
      totalPeople,
      tip,
      beer,
    },
  });

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
      onClose={() => setOpenModal(undefined)}
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
                defaultValue={beerPrice}
                {...register("beerPrice")}
              />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="tip"
                  defaultChecked={tip}
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
                  defaultValue={tipValue}
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
                defaultValue={beer}
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
                defaultValue={totalPeople}
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
