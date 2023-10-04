"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Alert,
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
import { BiInfoCircle, BiLastPage } from "react-icons/bi";

import { useLocalStorageValues } from "@/lib/localStorageValues";
import PersonsForm from "./PersonForm";
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
  const [showAlert, setShowAlert] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

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
      { name: "", first: 1, last: beer, paid: false },
    ]);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), LOADING_TIMEOUT);
    return () => clearTimeout(timer);
  }, []);

  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      beerPrice,
      tipValue,
      tip,
      beer,
    },
  });

  useEffect(() => {
    setValue("beer", beer);
    setValue("beerPrice", beerPrice);
    setValue("tip", tip);
    setValue("tipValue", tipValue);
  }, [beer, beerPrice, tip, tipValue, setValue]);

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

  const onSetLast = () => {
    let newProportionalPeople = proportionalPeople.map((person) => ({
      ...person,
      last: beer,
    }));

    setProportionalPeople(newProportionalPeople);
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
          {showAlert && (
            <Alert color="info" onDismiss={() => setShowAlert(false)}>
              <p>
                Por favor, clique no botão <b>Calcular</b> para salvar as
                informações inseridas.
              </p>
            </Alert>
          )}

          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
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

            <div className="my-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label value="Pessoas" className="font-bold text-lg" />
                  <Tooltip content="Informe o nome da pessoa, o número da primeira e da última cerveja que ela consumiu.">
                    <BiInfoCircle className="cursor-pointer" size={24} />
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1">
                  <Tooltip content="Clique para atualizar a última cerveja de todos para a mais recente na contagem.">
                    <BiLastPage
                      className="cursor-pointer"
                      onClick={onSetLast}
                      size={24}
                    />
                  </Tooltip>

                  <Button
                    color="warning"
                    onClick={() => {
                      setProportionalPeople([]);
                      setProportionalTab(0);
                    }}
                    size="xs"
                  >
                    Resetar
                  </Button>
                </div>
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

            <div className="flex justify-around max-sm:flex-col max-sm:gap-2 ">
              <Button color="warning" onClick={handleAddInput}>
                Adicionar pessoa
              </Button>
              <Button color="warning" type="submit">
                Calcular
              </Button>
            </div>
          </form>

          {Object.keys(proportionalTab).length > 0 && (
            <div>
              <div className="mt-4">
                <p className="flex items-center">
                  Total: {<FaDollarSign />} {beerTab}
                </p>
              </div>
              {Object.keys(proportionalTab).length > 0 && (
                <p className="text-lg font-bold">Dividido proporcionalmente:</p>
              )}
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Nome</Table.HeadCell>
                  <Table.HeadCell>Valor</Table.HeadCell>
                  <Table.HeadCell
                    className="cursor-pointer"
                    onClick={() => {
                      setSortOrder((prevOrder) =>
                        prevOrder === "asc" ? "desc" : "asc"
                      );
                    }}
                  >
                    Pagou
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {
                    // Primeiro, ordenamos o array proportionalPeople com base no campo 'paid'
                    [...proportionalPeople]
                      .sort((a, b) => {
                        const comparison = b.paid - a.paid;
                        return sortOrder === "asc" ? comparison : -comparison;
                      })
                      .map((person) => {
                        //@ts-ignore
                        const value = proportionalTab[person.name];

                        return (
                          <Table.Row key={person.name}>
                            <Table.Cell>{person.name}</Table.Cell>
                            <Table.Cell className="flex items-center">
                              {<FaDollarSign />} {value}
                            </Table.Cell>
                            <Table.Cell>
                              <Checkbox
                                className="checked:bg-amber-500"
                                defaultChecked={person.paid || false}
                                onClick={() => {
                                  const index = proportionalPeople.findIndex(
                                    (p) => p.name === person.name
                                  );

                                  const updatedPeople = [...proportionalPeople];
                                  updatedPeople[index] = {
                                    ...updatedPeople[index],
                                    paid: !updatedPeople[index].paid,
                                  };

                                  setProportionalPeople(updatedPeople);
                                }}
                              />
                            </Table.Cell>
                          </Table.Row>
                        );
                      })
                  }
                </Table.Body>
              </Table>
            </div>
          )}
        </Modal.Body>
      )}
    </Modal>
  );
}
