"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaDollarSign } from "react-icons/fa";
import { BsPercent } from "react-icons/bs";
import { PiBeerBottleDuotone } from "react-icons/pi";
import { BiInfoCircle, BiLastPage } from "react-icons/bi";
import { useLocalStorageValues } from "@/lib/localStorageValues";
import PersonsForm from "./PersonForm";
import { calculateProportionalBill } from "@/lib/calculateProportionalBill";
import { Loader2 } from "lucide-react";

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

export default function ProportionalBill({ setOpenModal, openModal }: IProps) {
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
    <Dialog
      open={openModal === "proportionalBill"}
      onOpenChange={(open) => {
        if (!open) setOpenModal(undefined);
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dividir conta proporcionalmente</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          </div>
        ) : (
          <>
            {showAlert && (
              <Alert className="relative pr-8">
                <BiInfoCircle className="h-4 w-4" />
                <AlertDescription>
                  Por favor, clique no botão <b>Calcular</b> para salvar as
                  informações inseridas.
                </AlertDescription>
                <button
                  type="button"
                  className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={() => setShowAlert(false)}
                >
                  <span className="sr-only">Close</span>×
                </button>
              </Alert>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="price">Valor da cerveja</Label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="price"
                    required
                    type="number"
                    step="0.10"
                    className="pl-8"
                    {...register("beerPrice")}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="tip"
                    checked={tip}
                    onCheckedChange={(checked) => {
                      setTip(checked as boolean);
                    }}
                  />
                  <Label htmlFor="tip" className="cursor-pointer">
                    Calcular %?
                  </Label>
                </div>
                {tip && (
                  <div className="relative w-32">
                    <Input
                      id="tipValue"
                      required
                      type="number"
                      min={1}
                      max={100}
                      className="pr-8"
                      {...register("tipValue")}
                    />
                    <BsPercent className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="beer">Qtd de cervejas</Label>
                <div className="relative">
                  <PiBeerBottleDuotone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="beer"
                    required
                    type="number"
                    className="pl-8"
                    {...register("beer")}
                  />
                </div>
              </div>

              <div className="my-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-bold text-lg">Pessoas</Label>
                    <BiInfoCircle
                      className="cursor-pointer"
                      size={24}
                      title="Informe o nome da pessoa, o número da primeira e da última cerveja que ela consumiu."
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={onSetLast}
                      title="Clique para atualizar a última cerveja de todos para a mais recente na contagem."
                    >
                      <BiLastPage className="h-5 w-5" />
                    </Button>

                    <Button
                      type="button"
                      onClick={() => {
                        setProportionalPeople([]);
                        setProportionalTab(0);
                      }}
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

              <div className="flex justify-around max-sm:flex-col max-sm:gap-2">
                <Button type="button" onClick={handleAddInput}>
                  Adicionar pessoa
                </Button>
                <Button type="submit">Calcular</Button>
              </div>
            </form>

            {Object.keys(proportionalTab).length > 0 && (
              <div className="mt-4 space-y-4">
                <div>
                  <p className="flex items-center gap-2">
                    Total: <FaDollarSign /> {beerTab}
                  </p>
                </div>
                {Object.keys(proportionalTab).length > 0 && (
                  <p className="text-lg font-bold">
                    Dividido proporcionalmente:
                  </p>
                )}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => {
                          setSortOrder((prevOrder) =>
                            prevOrder === "asc" ? "desc" : "asc"
                          );
                        }}
                      >
                        Pagou
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...proportionalPeople]
                      .sort((a, b) => {
                        const comparison = Number(b.paid) - Number(a.paid);
                        return sortOrder === "asc" ? comparison : -comparison;
                      })
                      .map((person) => {
                        const value = (proportionalTab as any)[person.name];

                        return (
                          <TableRow key={person.name}>
                            <TableCell>{person.name}</TableCell>
                            <TableCell className="flex items-center gap-1">
                              <FaDollarSign /> {value}
                            </TableCell>
                            <TableCell>
                              <Checkbox
                                checked={person.paid || false}
                                onCheckedChange={(checked) => {
                                  const index = proportionalPeople.findIndex(
                                    (p) => p.name === person.name
                                  );

                                  const updatedPeople = [...proportionalPeople];
                                  updatedPeople[index] = {
                                    ...updatedPeople[index],
                                    paid: checked as boolean,
                                  };

                                  setProportionalPeople(updatedPeople);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
