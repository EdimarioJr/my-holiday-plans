"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../../prisma/initDb";
import { HolidayPlan, IHolidayPlan } from "../entities/HolidayPlan";
import { ApiResponse } from "../entities/ApiResponse";
import { getErrorMessage } from "./getErrorMessage";
import { ApiError } from "../entities";
import { validateHolidayPlan } from "../validators/holidayPlanValidators";

type DbHolidayPlan = Omit<IHolidayPlan, "participant"> & {
  participant: string | null;
};

const dbHolidayPlayToEntity = (plan: DbHolidayPlan): IHolidayPlan => {
  return new HolidayPlan({
    ...plan,
    participant: plan.participant ?? "",
  }).toObject();
};

export const create = async (
  plan: IHolidayPlan
): Promise<ApiResponse<IHolidayPlan | null>> => {
  try {
    const parsed = validateHolidayPlan(plan);
    if (!parsed.success)
      throw new ApiError(
        "Error creating the Holiday Plan: Some fields are wrong or missing."
      );

    const response = await prisma.holidayPlan.create({ data: plan });
    revalidatePath("/");
    return { data: dbHolidayPlayToEntity(response) };
  } catch (err) {
    return { data: null, error: getErrorMessage(err) };
  }
};

export const update = async (
  id: string,
  plan: Partial<IHolidayPlan>
): Promise<ApiResponse<IHolidayPlan | null>> => {
  try {
    if (!id)
      throw new ApiError(
        "Error: The identification of the holiday plan is missing!"
      );

    const response = await prisma.holidayPlan.update({
      where: { id },
      data: plan,
    });
    revalidatePath("/");
    return { data: dbHolidayPlayToEntity(response) };
  } catch (err) {
    return { data: null, error: getErrorMessage(err) };
  }
};

export const list = async (): Promise<ApiResponse<IHolidayPlan[]>> => {
  try {
    const response = await prisma.holidayPlan.findMany();

    const holidayPlans = response.map((plan) => dbHolidayPlayToEntity(plan));
    return { data: holidayPlans };
  } catch (err) {
    return { data: [], error: getErrorMessage(err) };
  }
};

export const deletePlan = async (id: string): Promise<ApiResponse<null>> => {
  try {
    if (!id)
      throw new ApiError(
        "Error: The identification of the holiday plan is missing!"
      );
    await prisma.holidayPlan.delete({ where: { id } });
    revalidatePath("/");
    return { data: null };
  } catch (err) {
    return { data: null, error: getErrorMessage(err) };
  }
};
