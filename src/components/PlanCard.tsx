"use client";
"use client";
import { DeleteIcon, EditIcon } from "@/assets";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { IHolidayPlan } from "@/core/entities";

const dateFormatter = new Intl.DateTimeFormat("en-US", { timeZone: "UTC" });

export type PlanCardProps = {
  plan: IHolidayPlan;
  handleClickEditHoliday: (plan: IHolidayPlan) => void;
  handleClickDeleteHoliday: (plan: IHolidayPlan) => void;
};

export const PlanCard = ({
  plan,
  handleClickDeleteHoliday,
  handleClickEditHoliday,
}: PlanCardProps) => {
  const { title, participant, date, description, location } = plan;
  return (
    <Card className="w-full h-[15rem] overflow-auto bg-gradient-to-r from-blue-800 to-indigo-900 border-none ">
      <CardHeader className="flex flex-row justify-between  w-full">
        <div className="flex flex-col gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {participant} - {dateFormatter.format(date)}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            className="p-1 rounded"
            onClick={() => handleClickEditHoliday(plan)}
          >
            <EditIcon />
          </Button>
          <Button
            variant="destructive"
            className="p-1 rounded"
            onClick={() => handleClickDeleteHoliday(plan)}
          >
            <DeleteIcon />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-4">{description}</p>
        <p className="line-clamp-4">{location}</p>
      </CardContent>
    </Card>
  );
};
