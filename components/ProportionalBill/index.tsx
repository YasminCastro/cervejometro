"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  Table,
  TextInput,
  Tooltip,
} from "flowbite-react";

import { SubmitHandler, useForm } from "react-hook-form";

import { FaDollarSign } from "react-icons/fa";
import { BsPercent } from "react-icons/bs";
import { PiBeerBottleDuotone } from "react-icons/pi";

import { useLocalStorageValues } from "@/lib/localStorageValues";
import PersonsForm from "./PersonForm";
import { BiInfoCircle } from "react-icons/bi";
import { calculateProportionalBill } from "@/lib/calculateProportionalBill";

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
    setProportionalPeople,
    proportionalPeople,
  } = useLocalStorageValues();

  const handleAddInput = () => {
    setProportionalPeople([
      ...proportionalPeople,
      { name: "", first: 0, last: 0 },
    ]);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), LOADING_TIMEOUT);
    return () => clearTimeout(timer);
  }, []);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      beerPrice,
      tipValue,
      tip,
      beer,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({
    beer,
    beerPrice,
    tip,
    tipValue,
  }) => {
    setBeer(parseInt(beer));
    setBeerPrice(parseFloat(beerPrice));
    setTipValue(parseFloat(tipValue));

    const [individualBills, beerCountPrice] = calculateProportionalBill(
      proportionalPeople,
      beer,
      beerPrice,
      tip,
      tipValue
    );
    setProportionalTab(individualBills);
    setBeerTab(beerCountPrice);
  };

  return (
    <Modal
      show={openModal === "proportionalBill"}
      size="xl"
      popup
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header>Dividir conta proporcionalmente</Modal.Header>
      {loading ? (
        <Modal.Body className="flex justify-center">
          <Spinner aria-label="Spinner" color="warning" size="lg" />
        </Modal.Body>
      ) : (
        <Modal.Body>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
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

            <div className="mt-2">
              <div className="flex items-center gap-2">
                <Label value="Pessoas" className="font-bold text-lg" />

                <Tooltip content="A Primeira é a primeira cerveja que a pessoa começou a beber. A Última é a ultima cerveja que a pessoa bebeu.">
                  <BiInfoCircle className="cursor-pointer" size={24} />
                </Tooltip>
              </div>
              {proportionalPeople.map((input, index) => (
                <PersonsForm
                  index={index}
                  proportionalPeople={proportionalPeople}
                  setProportionalPeople={setProportionalPeople}
                  key={index}
                />
              ))}
            </div>

            <div className="flex justify-around max-sm:flex-col max-sm:gap-2">
              <Button color="warning" onClick={handleAddInput}>
                Adicionar pessoa
              </Button>
              <Button color="warning" type="submit">
                Calcular
              </Button>
            </div>
          </form>
          {beerTab !== 0 && (
            <div className="mt-4">
              <p className="flex items-center">
                Total: {<FaDollarSign />} {beerTab}
              </p>
            </div>
          )}
          {proportionalTab && (
            <div>
              {Object.keys(proportionalTab).length > 0 && (
                <p className="text-lg font-bold">Dividido proporcionalmente:</p>
              )}
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Nome</Table.HeadCell>
                  <Table.HeadCell>Valor</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {Object.entries(proportionalTab).map(([key, value]) => (
                    <Table.Row>
                      <Table.Cell>{key}</Table.Cell>
                      <Table.Cell>{value}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}
        </Modal.Body>
      )}
    </Modal>
  );
}
