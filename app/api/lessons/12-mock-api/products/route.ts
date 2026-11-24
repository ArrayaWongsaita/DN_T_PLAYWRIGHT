export const dynamic = "force-dynamic";

export function GET() {
  return Response.json([
    { id: 1, name: "ชา" },
    { id: 2, name: "กาแฟ" },
  ]);
}
