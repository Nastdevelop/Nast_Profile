"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isSuccess = status === "success";

  useEffect(() => {
    if (!isSuccess) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setStatus("idle");
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isSuccess]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Pesan gagal dikirim. Coba lagi ya.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Pesan gagal dikirim. Coba lagi ya."
      );
      setStatus("error");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-zinc-300">
            Nama
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-xl bg-zinc-950/60 border border-zinc-800 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            placeholder="Nama kamu"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-zinc-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl bg-zinc-950/60 border border-zinc-800 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            placeholder="email@kamu.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-sm text-zinc-300">
            Subjek
          </label>
          <input
            id="subject"
            name="subject"
            className="w-full rounded-xl bg-zinc-950/60 border border-zinc-800 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            placeholder="Subjek pesan"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-zinc-300">
            Pesan
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full rounded-xl bg-zinc-950/60 border border-zinc-800 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            placeholder="Tulis pesan kamu..."
          />
        </div>

        {status === "error" && errorMsg && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 inline-flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-600/25 hover:shadow-cyan-500/40"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : (
            "Kirim"
          )}
        </button>
      </form>

      {isSuccess && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setStatus("idle")}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
        >
          <div
            className="relative w-full max-w-sm rounded-2xl border border-emerald-500/30 bg-zinc-900 p-6 shadow-2xl shadow-emerald-500/10 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setStatus("idle")}
              aria-label="Tutup"
              className="absolute top-3 right-3 p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col items-center text-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30">
                <CheckCircle2 className="h-7 w-7 text-emerald-400" />
              </div>
              <h3
                id="contact-success-title"
                className="text-lg font-semibold text-zinc-100"
              >
                Pesan Berhasil Dikirim!
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Terima kasih sudah menghubungi. Pesan kamu akan segera dibalas
                lewat email.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
