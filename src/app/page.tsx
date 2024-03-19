import { PlanList } from "@/components/PlanList";
import { list } from "@/core/services/holidayPlansService";

export default async function Home() {
  const plans = await list();

  return <PlanList plans={plans.data} />;
}
