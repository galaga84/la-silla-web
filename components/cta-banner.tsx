"use client";

import DotGrid from "@/components/react-bits/dot-grid";
import {FormEvent, useState} from "react";

type SubscribeState = {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
};

const initialState: SubscribeState = {
  status: "idle",
};

export function CtaBanner() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubscribeState>(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setState({
        status: "error",
        message: "Ingresa un correo v\u00e1lido para suscribirte.",
      });
      return;
    }

    setState({status: "submitting"});

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: normalizedEmail}),
      });

      const payload = (await response.json()) as {message?: string};

      if (!response.ok) {
        throw new Error(payload.message || "No pudimos registrar tu correo.");
      }

      setEmail("");
      setState({
        status: "success",
        message: payload.message || "Te suscribiste correctamente.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Ocurrió un problema al enviar el formulario.",
      });
    }
  }

  return (
    <section className="relative isolate -mb-16 min-h-[80svh] overflow-hidden border-t border-black/10 bg-white">
      <div className="absolute inset-0 z-0">
        <DotGrid
          className="pointer-events-none h-full w-full"
          dotSize={4}
          gap={35}
          baseColor="#ddd6d0ad"
          activeColor="#E8452C"
          proximity={140}
          shockRadius={220}
          shockStrength={4}
        />
      </div>

      <div className="container-site relative z-10 grid min-h-[80svh] gap-10 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
        <div>
          
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            {"Entérate de nuestras noticias, lanzamientos y movimiento editorial."}
          </h2>
          <p className="body-lg mt-5 max-w-2xl text-gray-600">
            {"Recibe novedades del sello directo en tu correo. Sin ruido, solo anuncios,"}{" "}
            {"agenda, catálogo y contenido relevante."}
          </p>
        </div>

        <div className="flex h-full flex-col justify-center">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="newsletter-email" className="text-sm font-medium text-gray-900">
              {"Correo electrónico"}
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 w-full rounded-none border border-black/12 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#E8452C]"
                disabled={state.status === "submitting"}
                required
              />

              <button
                type="submit"
                className="button-secondary shrink-0"
                disabled={state.status === "submitting"}
              >
                <span>{state.status === "submitting" ? "Enviando..." : "Suscribirme"}</span>
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            {"Al suscribirte aceptas recibir novedades de La Silla. Puedes darte de baja"}{" "}
            {"más adelante si lo necesitas."}
          </p>

          {state.message ? (
            <p
              className={`mt-4 text-sm ${
                state.status === "error" ? "text-[#B42318]" : "text-[#12715B]"
              }`}
            >
              {state.message}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
