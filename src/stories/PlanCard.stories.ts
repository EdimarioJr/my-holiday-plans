import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { PlanCard } from "../components/PlanCard";

const meta = {
  title: "PlanCard",
  component: PlanCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    plan: { control: "object" },
  },
  args: { handleClickDeleteHoliday: fn(), handleClickEditHoliday: fn() },
} satisfies Meta<typeof PlanCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    plan: {
      id: "test",
      description: "Test description",
      title: "Test title",
      date: new Date(),
      location: "Test location",
      participant: "Test participant",
    },
  },
};

export const WithLongDescription: Story = {
  args: {
    plan: {
      id: "test",
      description:
        "With a long description With a long description With a long description With a long description With a long description With a long description With a long description",
      title: "Test title",
      date: new Date(),
      location: "Test location",
      participant: "Test participant",
    },
  },
};
