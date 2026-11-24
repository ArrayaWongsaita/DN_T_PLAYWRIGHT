export const dynamic = "force-dynamic";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return Response.json({ message: "ข้อมูลมาแล้ว" });
}
