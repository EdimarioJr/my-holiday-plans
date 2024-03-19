"use client";
import { EditPlan } from "@/components/EditPlan";
import { IHolidayPlan } from "@/core/entities/HolidayPlan";
import { useState } from "react";
import { DeletePlan } from "@/components/DeletePlan";
import { CreatePlan } from "@/components/CreatePlan";
import { PlanCard } from "./PlanCard";

import { Button } from "./ui/button";
import { downloadPlan } from "./PlanPDF";

export type PlanListProps = {
  plans: IHolidayPlan[];
};

export const PlanList = ({ plans = [] }: PlanListProps) => {
  const [selectedPlan, setSelectedPlan] = useState<IHolidayPlan | null>(null);
  const [selectedPlanToDelete, setSelectedPlanToDelete] =
    useState<IHolidayPlan | null>(null);

  const handleClickEditHoliday = (holidayPlan: IHolidayPlan) => {
    setSelectedPlan(holidayPlan);
  };

  const handleClickDeleteHoliday = (holidayPlan: IHolidayPlan) => {
    setSelectedPlanToDelete(holidayPlan);
  };

  return (
    <section className="w-full">
      <div className="w-full flex justify-center sm:justify-end py-5 gap-5">
        <Button onClick={() => downloadPlan({ plans })} className="font-bold">
          Print
        </Button>
        <CreatePlan />
      </div>
      <section className="w-full grid grid-cols-auto-fit-300 gap-5">
        {plans.map((plan) => {
          return (
            <PlanCard
              key={plan.id}
              plan={plan}
              handleClickDeleteHoliday={(plan) =>
                handleClickDeleteHoliday(plan)
              }
              handleClickEditHoliday={(plan) => handleClickEditHoliday(plan)}
            />
          );
        })}
      </section>

      {selectedPlan && (
        <EditPlan
          plan={selectedPlan}
          afterMainActionCallback={() => setSelectedPlan(null)}
        />
      )}

      {selectedPlanToDelete && (
        <DeletePlan
          id={selectedPlanToDelete.id}
          title={selectedPlanToDelete.title}
          afterMainActionCallback={() => setSelectedPlanToDelete(null)}
        />
      )}
    </section>
  );
};
