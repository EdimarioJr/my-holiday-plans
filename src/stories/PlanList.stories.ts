import type { Meta, StoryObj } from "@storybook/react";
import { PlanList } from "../components/PlanList";

const meta = {
  title: "PlanList",
  component: PlanList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    plans: { control: "array" },
  },
} satisfies Meta<typeof PlanList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    plans: [
      {
        id: "test",
        description: "Test description",
        title: "Test title",
        date: new Date(),
        location: "Test location",
        participant: "Test participant",
      },
      {
        id: "test",
        description: "Test description",
        title: "Test title",
        date: new Date(),
        location: "Test location",
        participant: "Test participant",
      },
      {
        id: "test",
        description: "Test description",
        title: "Test title",
        date: new Date(),
        location: "Test location",
        participant: "Test participant",
      },
      {
        id: "test",
        description: "Test description",
        title: "Test title",
        date: new Date(),
        location: "Test location",
        participant: "Test participant",
      },
      {
        id: "test",
        description: "Test description",
        title: "Test title",
        date: new Date(),
        location: "Test location",
        participant: "Test participant",
      },
    ],
  },
  parameters: {
    layout: "padded",
  },
};
