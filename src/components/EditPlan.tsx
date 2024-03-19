"use client";

import React, { useEffect, useState, useTransition } from "react";
import { PlanForm } from "./PlanForm";
import { IHolidayPlan } from "@/core/entities/HolidayPlan";
import { Dialog, DialogContent } from "./ui/dialog";
import { update } from "@/core/services/holidayPlansService";
import { toast } from "sonner";

export type EditPlanProps = {
  plan: IHolidayPlan;
  afterMainActionCallback: () => void;
};

export const EditPlan = ({ plan, afterMainActionCallback }: EditPlanProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    afterMainActionCallback();
  };

  const onSubmit = (value: Omit<IHolidayPlan, "id">) => {
    startTransition(async () => {
      const response = await update(plan.id, value);
      if (response.error) {
        toast(response.error);
        return;
      }

      toast("Holiday plan updated with success!");
      afterMainActionCallback();
    });
  };

  const onCancel = () => {
    handleCloseEditModal();
    afterMainActionCallback();
  };

  useEffect(() => handleOpenEditModal(), [plan]);

  return (
    <Dialog onOpenChange={handleCloseEditModal} open={isEditModalOpen}>
      <DialogContent>
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-bold">Edit holiday plan</h1>

          <PlanForm
            plan={plan}
            onSubmit={onSubmit}
            onCancel={onCancel}
            isLoading={pending}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
