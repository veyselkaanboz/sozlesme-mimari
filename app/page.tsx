"use client";

import { useState } from "react";
import ContractForm from "@/components/ContractForm";
import ContractViewer from "@/components/ContractViewer";
import { ContractFormData } from "@/lib/types";

export default function Home() {
  const [contract, setContract] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<ContractFormData | null>(null);

  async function handleGenerate(data: ContractFormData) {
    setLoading(true);
    setError("");
    setFormData(data);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: data }),
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error || "Bir hata oluştu.");
      } else {
        setContract(json.contract);
      }
    } catch {
      setError("Sunucuya bağlanılamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setContract("");
    setError("");
    setFormData(null);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900">Sözleşme Mimarı</h1>
              <p className="text-xs text-slate-500">Otomatik Sözleşme Üreticisi v2.0</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="hidden sm:inline">Türk Hukuku</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="hidden sm:inline">TBK · TTK · HMK · KVKK</span>
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Aktif
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {!contract ? (
          <>
            {/* Hero */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Profesyonel Sözleşme Taslağı Oluşturun
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
                Teknik satınalma, hizmet, montaj veya bakım-onarım sözleşmelerinizi;
                Türk hukuk mevzuatına tam uyumlu ve alıcı odaklı olarak hazırlayın.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["TBK Uyumlu", "KVKK Uyumlu", "TTK Uyumlu", "Alıcı Odaklı", "3 Koruma Seviyesi"].map((b) => (
                <span key={b}
                  className="text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100 rounded-full px-3 py-1">
                  {b}
                </span>
              ))}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <ContractForm onSubmit={handleGenerate} loading={loading} />
          </>
        ) : (
          <ContractViewer
            contract={contract}
            formData={formData}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 mt-16 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-slate-400">
          <p>Sözleşme Mimarı v2.0 — Üretilen taslaklar bilgi amaçlıdır. Profesyonel hukuki danışmanlık yerine geçmez.</p>
        </div>
      </footer>
    </div>
  );
}
