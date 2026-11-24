import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CheckoutSummary } from "@/components/CheckoutSummary";

export default async function CheckoutPage() {
  const session = (await cookies()).get("session");
  if (!session) redirect("/shop/login?next=/shop/checkout");
  return (
    <main>
      <h1>ชำระเงิน</h1>
      <CheckoutSummary />
    </main>
  );
}
