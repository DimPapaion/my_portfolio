import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const upstream = process.env.MODEL_SERVER_URL; // e.g. https://flood-service.onrender.com
  if (!upstream) return NextResponse.json({ error: "MODEL_SERVER_URL missing" }, { status: 500 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });

  const fd = new FormData();
  fd.append("file", file, file.name);
  fd.append("overlay", "true");

  const r = await fetch(`${upstream}/segment`, { method: "POST", body: fd });
  if (!r.ok) {
    const t = await r.text();
    return new NextResponse(t, { status: r.status });
  }
  const buf = await r.arrayBuffer();
  return new NextResponse(buf, { status: 200, headers: { "Content-Type": "image/png" } });
}
