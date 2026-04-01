import {createHash} from "node:crypto";
import {NextResponse} from "next/server";
import {createClient} from "next-sanity";
import {apiVersion, dataset, projectId} from "@/sanity/env";

const writeToken = process.env.SANITY_API_WRITE_TOKEN;

const writeClient = writeToken
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: writeToken,
    })
  : null;

function buildSubscriberId(email: string) {
  const digest = createHash("sha256").update(email).digest("hex").slice(0, 24);
  return `subscriber.${digest}`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  if (!writeClient) {
    return NextResponse.json(
      {
        message:
          "Falta configurar SANITY_API_WRITE_TOKEN para guardar suscripciones.",
      },
      {status: 500},
    );
  }

  try {
    const body = (await request.json()) as {email?: string};
    const email = body.email?.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {message: "Ingresa un correo valido."},
        {status: 400},
      );
    }

    const documentId = buildSubscriberId(email);
    const existingSubscriber = await writeClient.getDocument(documentId);

    if (existingSubscriber) {
      return NextResponse.json(
        {message: "Este correo ya estaba suscrito."},
        {status: 200},
      );
    }

    await writeClient.create({
      _id: documentId,
      _type: "subscriber",
      email,
      source: "website-home",
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {message: "Gracias. Ya quedaste suscrito a nuestras noticias."},
      {status: 201},
    );
  } catch {
    return NextResponse.json(
      {message: "No pudimos guardar tu suscripcion. Intenta de nuevo."},
      {status: 500},
    );
  }
}
