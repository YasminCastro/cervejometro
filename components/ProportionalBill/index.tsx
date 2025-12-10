"use client";

import { useEffect, useState, useRef } from "react";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { FaDollarSign } from "react-icons/fa";
import { BsPercent } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi";
import { useLocalStorageValues } from "@/lib/localStorageValues";
import PersonsForm from "./PersonForm";
import { calculateProportionalBill } from "@/lib/calculateProportionalBill";
import AddBeers from "@/components/AddBeers";

type Inputs = {
  beerPrice: any;
  tipValue: any;
  tip: any;
};

export default function ProportionalBill() {
  const resultRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      { name: "", first: 1, last: beer, paid: false, stopped: false },
      ...proportionalPeople,
    ]);
  };

  const handleResetAll = () => {
    setProportionalPeople([]);
    setProportionalTab({});
    setBeer(0);
    setBeerPrice(10);
    setTip(true);
    setTipValue(10);
    setBeerTab(0);
    setValue("beerPrice", 10);
    setValue("tip", true);
    setValue("tipValue", 10);
  };

  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      beerPrice,
      tipValue,
      tip,
    },
  });

  useEffect(() => {
    setValue("beerPrice", beerPrice);
    setValue("tip", tip);
    setValue("tipValue", tipValue);
  }, [beerPrice, tip, tipValue, setValue]);

  // Garante que todas as pessoas tenham o campo stopped (migração para dados antigos)
  useEffect(() => {
    if (proportionalPeople.length > 0) {
      const needsUpdate = proportionalPeople.some(
        (person) => person.stopped === undefined
      );
      if (needsUpdate) {
        const updatedPeople = proportionalPeople.map((person) => ({
          ...person,
          stopped: person.stopped !== undefined ? person.stopped : false,
        }));
        setProportionalPeople(updatedPeople);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Atualiza automaticamente a última cerveja quando a quantidade de cervejas mudar
  // Apenas para pessoas que não pararam de beber
  useEffect(() => {
    // Salva a posição atual do scroll antes de fazer mudanças
    const scrollPosition = window.scrollY;
    const scrollX = window.scrollX;

    if (beer > 0 && proportionalPeople.length > 0) {
      const hasChanges = proportionalPeople.some(
        (person) => !person.stopped && person.last !== beer
      );

      if (hasChanges) {
        const updatedPeople = proportionalPeople.map((person) => {
          // Se a pessoa não parou de beber, atualiza a última cerveja
          if (!person.stopped) {
            return {
              ...person,
              last: beer,
            };
          }
          // Se parou de beber, mantém o valor atual
          return person;
        });
        setProportionalPeople(updatedPeople);

        // Restaura a posição do scroll para evitar scroll automático causado por re-render
        requestAnimationFrame(() => {
          window.scrollTo(scrollX, scrollPosition);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beer]); // Apenas quando beer mudar

  const onSubmit: SubmitHandler<Inputs> = ({ beerPrice, tip, tipValue }) => {
    // Cancela qualquer scroll pendente
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }

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

    // Scroll para o resultado apenas quando o botão Calcular for clicado
    scrollTimeoutRef.current = setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      scrollTimeoutRef.current = null;
    }, 150);
  };

  // Cancela qualquer scroll pendente quando beer muda e preserva posição
  useEffect(() => {
    // Cancela scrolls pendentes
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
    shouldScrollRef.current = false;

    // Preserva a posição do scroll quando beer muda (para evitar scroll automático)
    const scrollPosition = window.scrollY;
    const scrollX = window.scrollX;

    requestAnimationFrame(() => {
      // Verifica se houve mudança no scroll e restaura se necessário
      if (Math.abs(window.scrollY - scrollPosition) > 5) {
        window.scrollTo(scrollX, scrollPosition);
      }
    });
  }, [beer]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 ">
              <Label className="pb-2">Quantidade de cervejas</Label>
              <div className="flex justify-center">
                <AddBeers />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Valor da cerveja</Label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="relative flex-1 min-w-0">
                  <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="price"
                    required
                    type="number"
                    step="0.10"
                    className="pl-8 w-full"
                    {...register("beerPrice")}
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Checkbox
                    id="tip"
                    checked={tip}
                    onCheckedChange={(checked) => {
                      setTip(checked as boolean);
                    }}
                  />
                  <Label
                    htmlFor="tip"
                    className="cursor-pointer whitespace-nowrap"
                  >
                    Calcular %?
                  </Label>
                </div>
                <div className="relative w-full sm:w-32 shrink-0">
                  <Input
                    id="tipValue"
                    required={tip}
                    type="number"
                    min={1}
                    max={100}
                    className="pr-8 w-full"
                    disabled={!tip}
                    {...register("tipValue")}
                  />
                  <BsPercent className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="my-4">
              <div className="flex items-center gap-2 mb-4">
                <Label className="font-bold text-lg">Pessoas</Label>
                <BiInfoCircle
                  className="cursor-pointer"
                  size={24}
                  title="Informe o nome da pessoa, o número da primeira e da última cerveja que ela consumiu."
                />
              </div>

              <div className="flex justify-around max-sm:flex-col max-sm:gap-2 mb-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddInput}
                >
                  Adicionar pessoa
                </Button>
                <Button type="submit">Calcular</Button>
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleResetAll}
                  className="text-muted-foreground"
                >
                  Resetar tudo
                </Button>
              </div>

              {proportionalPeople.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhuma pessoa adicionada ainda.</p>
                  <p className="text-sm">
                    Clique em "Adicionar pessoa" para começar.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {proportionalPeople.map((input, index) => (
                    <PersonsForm
                      index={index}
                      proportionalPeople={proportionalPeople}
                      setProportionalPeople={setProportionalPeople}
                      key={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {Object.keys(proportionalTab).length > 0 && (
        <div
          ref={resultRef}
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Resultado</h2>
              <Button type="button" onClick={handleSubmit(onSubmit)}>
                Calcular
              </Button>
            </div>
          </div>
          <div className="p-6 pt-0 space-y-6">
            {/* Total Geral */}
            <div>
              <p className="flex items-center gap-2 text-lg">
                <span className="font-semibold">Total:</span>
                <FaDollarSign /> {beerTab.toFixed(2)}
              </p>
            </div>

            {/* Tabela de divisão proporcional */}
            <div>
              <p className="text-lg font-bold mb-4">
                Dividido proporcionalmente:
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Pagou</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...proportionalPeople]
                    .sort((a, b) => {
                      return a.name.localeCompare(b.name, "pt-BR", {
                        sensitivity: "base",
                      });
                    })
                    .map((person) => {
                      const value = (proportionalTab as any)[person.name];

                      return (
                        <TableRow key={person.name}>
                          <TableCell className="font-medium">
                            {person.name}
                          </TableCell>
                          <TableCell className="flex items-center gap-1">
                            <FaDollarSign /> {value?.toFixed(2) || "0.00"}
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
                                  stopped: checked as boolean,
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

              {/* Conta detalhada geral */}
              <div className="mt-6 space-y-3">
                <h3 className="text-lg font-bold">Total Detalhado</h3>

                {/* Tabela de itens da conta geral */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Qtde</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-right">Unidade</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{beer}</TableCell>
                      <TableCell>Cerveja</TableCell>
                      <TableCell className="text-right">
                        {beerPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {(beer * beerPrice).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Separador */}
                <div className="border-t my-2"></div>

                {/* Sub-total e Serviço */}
                {(() => {
                  const subtotal = beer * beerPrice;
                  const serviceValue = tip
                    ? parseFloat((subtotal * (tipValue / 100)).toFixed(2))
                    : 0;

                  const paidPeople = proportionalPeople.filter(
                    (person) => person.paid
                  );
                  const totalPaid = paidPeople.reduce((sum, person) => {
                    const personValue =
                      (proportionalTab as any)[person.name] || 0;
                    return sum + personValue;
                  }, 0);

                  const remainingTotal = beerTab - totalPaid;

                  return (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Sub-total:</span>
                          <span>{subtotal.toFixed(2)}</span>
                        </div>
                        {tip && (
                          <div className="flex justify-between">
                            <span>Serviço {tipValue}%:</span>
                            <span>{serviceValue.toFixed(2)}</span>
                          </div>
                        )}
                        {paidPeople
                          .sort((a, b) => {
                            return a.name.localeCompare(b.name, "pt-BR", {
                              sensitivity: "base",
                            });
                          })
                          .map((person) => {
                            const personValue =
                              (proportionalTab as any)[person.name] || 0;
                            return (
                              <div
                                key={person.name}
                                className="flex justify-between"
                              >
                                <span>{person.name}:</span>
                                <span>-{personValue.toFixed(2)}</span>
                              </div>
                            );
                          })}
                      </div>

                      {/* Separador */}
                      <div className="border-t my-2"></div>

                      {/* Total */}
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>TOTAL:</span>
                        <span>{remainingTotal.toFixed(2)}</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
