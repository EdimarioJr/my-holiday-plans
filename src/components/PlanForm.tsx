"use client";

import { IHolidayPlan } from "@/core/entities/HolidayPlan";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/datePicker";
import { Button } from "./ui/button";
import { holidayPlanSchema } from "@/core/validators/holidayPlanValidators";

export type PlanFormProps = {
  plan?: IHolidayPlan;
  onSubmit: (data: IHolidayPlan) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export const PlanForm = ({
  plan,
  onSubmit,
  onCancel,
  isLoading,
}: PlanFormProps) => {
  const formMethods = useForm<IHolidayPlan>({
    resolver: zodResolver(holidayPlanSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      participant: "",
      location: "",
    },
  });

  useEffect(() => {
    if (plan) formMethods.reset(plan);
  }, [plan, formMethods]);

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={formMethods.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Date</FormLabel>
              <FormControl>
                <DatePicker value={field.value} setDate={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="participant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participant</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button type="submit" variant="destructive" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !formMethods.formState.isValid}
          >
            {isLoading ? (
              <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
