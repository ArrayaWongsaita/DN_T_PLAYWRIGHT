export async function POST(request: Request) {
  const { username, password } = (await request.json()) as { username?: string; password?: string };
  if (username === "demo" && password === "1234") {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json", "Set-Cookie": "session=demo; Path=/; SameSite=Lax" },
    });
  }
  return Response.json({ ok: false }, { status: 401 });
}
