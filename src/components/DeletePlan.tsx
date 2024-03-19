"use client";
import { IHolidayPlan } from "@/core/entities/HolidayPlan";
import React, { useEffect, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { deletePlan } from "@/core/services/holidayPlansService";
import { toast } from "sonner";

export type DeletePlanProps = {
  id: IHolidayPlan["id"];
  title: IHolidayPlan["title"];
  afterMainActionCallback: () => void;
};

export const DeletePlan = ({
  id,
  title,
  afterMainActionCallback,
}: DeletePlanProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    afterMainActionCallback();
  };

  useEffect(() => {
    if (id) setIsDeleteModalOpen(true);
  }, [id]);

  const onDelete = async () => {
    startTransition(async () => {
      const response = await deletePlan(id);
      if (response.error) {
        toast(response.error);
        return;
      }

      toast("Holiday plan deleted with success!");
      afterMainActionCallback();
    });
  };

  const onCancel = () => {
    setIsDeleteModalOpen(false);
    afterMainActionCallback();
  };

  return (
    <Dialog onOpenChange={handleCloseDeleteModal} open={isDeleteModalOpen}>
      <DialogContent>
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-bold">Delete plan</h1>

          <p>
            Are you sure you want to delete {title} holiday plan? This action is
            irreversible
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onDelete} disabled={pending}>
            {pending ? (
              <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-black" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
