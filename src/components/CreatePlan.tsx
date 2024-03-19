"use client";
import React, { useState, useTransition } from "react";
import { PlanForm } from "./PlanForm";
import { IHolidayPlan } from "@/core/entities/HolidayPlan";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { create } from "@/core/services/holidayPlansService";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const CreatePlan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = async (value: IHolidayPlan) => {
    startTransition(async () => {
      const response = await create(value);
      if (response.error) {
        toast(response.error);
        return;
      }

      toast("Holiday plan created with success!");
      setIsModalOpen(false);
    });
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger className="font-bold" asChild>
        <Button>Create holiday plan</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-bold">Create holiday plan</h1>

          <PlanForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            isLoading={pending}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
