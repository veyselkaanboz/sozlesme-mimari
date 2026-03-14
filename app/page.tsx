"use client";

import { useState } from "react";
import ContractForm from "@/components/ContractForm";
import PromptViewer from "@/components/PromptViewer";
import { ContractFormData } from "@/lib/types";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/system-prompt";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [formData, setFormData] = useState<ContractFormData | null>(null);

  function handleGenerate(data: ContractFormData) {
    const fullPrompt = buildUserPrompt(data);
    setPrompt(fullPrompt);
    setFormData(data);
  }

  function handleReset() {
    setPrompt("");
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
        {!prompt ? (
          <>
            {/* Hero */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Profesyonel Sözleşme Taslağı Oluşturun
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
                Formu doldurun, hazır promptu kopyalayın ve Claude.ai&apos;ye yapıştırın — sözleşmeniz hazır.
              </p>
            </div>

            {/* How it works */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { step: "1", text: "Formu Doldurun" },
                { step: "2", text: "Promptu Kopyalayın" },
                { step: "3", text: "Claude.ai'ye Yapıştırın" },
                { step: "4", text: "Sözleşmenizi Alın" },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {s.step}
                  </span>
                  {s.text}
                  {s.step !== "4" && <span className="text-slate-300 ml-1">→</span>}
                </div>
              ))}
            </div>

            <ContractForm onSubmit={handleGenerate} loading={false} />
          </>
        ) : (
          <PromptViewer
            prompt={prompt}
            systemPrompt={SYSTEM_PROMPT}
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
