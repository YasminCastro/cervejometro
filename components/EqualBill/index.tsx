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
import { SubmitHandler, useForm } from "react-hook-form";
import { FaDollarSign } from "react-icons/fa";
import { BsPeopleFill, BsPercent } from "react-icons/bs";
import { PiBeerBottleDuotone } from "react-icons/pi";
import calculateEqualBill from "@/lib/calculateEqualBill";
import { useLocalStorageValues } from "@/lib/localStorageValues";
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
    const timer = setTimeout(() => setLoading(false), LOADING_TIMEOUT);
    return () => clearTimeout(timer);
  }, []);

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
    <Dialog
      open={openModal === "equalBill"}
      onOpenChange={(open) => {
        if (!open) setOpenModal(undefined);
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Dividir conta igualmente</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

            <div className="space-y-2">
              <Label htmlFor="totalPeople">Qtd. de pessoas</Label>
              <div className="relative">
                <BsPeopleFill className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="totalPeople"
                  required
                  type="number"
                  className="pl-8"
                  min={1}
                  {...register("totalPeople")}
                />
              </div>
            </div>

            <Button type="submit" variant="warning" className="w-full">
              Calcular
            </Button>
          </form>
        )}
        {beerTab !== 0 && !loading && (
          <div className="mt-4 space-y-2">
            <p className="flex items-center gap-2">
              Total: <FaDollarSign /> {beerTab}
            </p>
            <p className="flex items-center gap-2">
              Dividido por {totalPeople} pessoas: <FaDollarSign />
              {equallyTab}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

