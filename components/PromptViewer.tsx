"use client";

import { useState } from "react";
import { ContractFormData } from "@/lib/types";

interface Props {
  prompt: string;
  systemPrompt: string;
  formData: ContractFormData | null;
  onReset: () => void;
}

const CLAUDE_AI_URL = "https://claude.ai/new";

function copyToClipboard(text: string): boolean {
  try {
    // Modern API
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
      return true;
    }
  } catch {
    // ignore
  }
  return fallbackCopy(text);
}

function fallbackCopy(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
    return true;
  } catch {
    return false;
  } finally {
    document.body.removeChild(ta);
  }
}

export default function PromptViewer({ prompt, systemPrompt, formData, onReset }: Props) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSystem, setCopiedSystem] = useState(false);
  const [activeTab, setActiveTab] = useState<"prompt" | "system">("prompt");

  function copyPrompt() {
    copyToClipboard(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  }

  function copySystem() {
    copyToClipboard(systemPrompt);
    setCopiedSystem(true);
    setTimeout(() => setCopiedSystem(false), 2500);
  }

  const levelColor = {
    "AGRESİF": "bg-red-100 text-red-800 border-red-200",
    "DENGELİ": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "ESNEK": "bg-green-100 text-green-800 border-green-200",
  }[formData?.korumaSeviyesi ?? "DENGELİ"];

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Prompt Hazır!</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Aşağıdaki adımları takip ederek sözleşmenizi oluşturun.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {formData && (
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${levelColor}`}>
              {formData.korumaSeviyesi}
            </span>
          )}
          <button onClick={onReset} className="btn-secondary text-xs px-4 py-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Yeni Form
          </button>
        </div>
      </div>

      {/* Steps Banner */}
      <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 mb-6">
        <p className="text-sm font-semibold text-brand-800 mb-3">📋 Nasıl Kullanılır?</p>
        <ol className="space-y-2 text-sm text-brand-700">
          <li className="flex items-start gap-2">
            <span className="font-bold shrink-0">1.</span>
            <span>
              <strong>System Prompt&apos;u kopyalayın</strong> → claude.ai'de yeni sohbet açın →
              <em> (isteğe bağlı, daha iyi sonuç için)</em> model ayarlarından sistem talimatı olarak yapıştırın.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold shrink-0">2.</span>
            <span><strong>Sözleşme Promptunu kopyalayın</strong> → Claude.ai mesaj kutusuna yapıştırın → Gönderin.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold shrink-0">3.</span>
            <span>Claude.ai sözleşme taslağını üretecek. Çıktıyı kopyalayıp Word&apos;e aktarabilirsiniz.</span>
          </li>
        </ol>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 mb-4 bg-slate-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => setActiveTab("prompt")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "prompt" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          📄 Sözleşme Promptu
        </button>
        <button
          onClick={() => setActiveTab("system")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "system" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          ⚙️ System Prompt
        </button>
      </div>

      {/* Prompt Box */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">
              {activeTab === "prompt" ? "Sözleşme Bilgi Promptu" : "Master System Prompt"}
            </span>
            <span className="text-xs text-slate-400 bg-slate-200 rounded px-2 py-0.5">
              {activeTab === "prompt"
                ? `${prompt.length.toLocaleString()} karakter`
                : `${systemPrompt.length.toLocaleString()} karakter`}
            </span>
          </div>
          <button
            onClick={activeTab === "prompt" ? copyPrompt : copySystem}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              (activeTab === "prompt" ? copiedPrompt : copiedSystem)
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-brand-600 text-white hover:bg-brand-700"
            }`}
          >
            {(activeTab === "prompt" ? copiedPrompt : copiedSystem) ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Kopyalandı!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Kopyala
              </>
            )}
          </button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          <pre className="text-xs text-slate-700 whitespace-pre-wrap font-mono leading-relaxed">
            {activeTab === "prompt" ? prompt : systemPrompt}
          </pre>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
        <button
          onClick={activeTab === "prompt" ? copyPrompt : copySystem}
          className="btn-primary w-full sm:w-auto justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {activeTab === "prompt" ? "Sözleşme Promptunu Kopyala" : "System Promptu Kopyala"}
        </button>
        <a
          href={CLAUDE_AI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full sm:w-auto justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Claude.ai&apos;yi Aç
        </a>
      </div>

      {/* Summary */}
      {formData && (
        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Form Özeti</h3>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-xs">
            {[
              ["Alıcı", formData.aliciUnvan],
              ["Tedarikçi", formData.tedarikciunvan],
              ["Tür", formData.sozlesmeTuru],
              ["Bedel", formData.toplamBedel ? `${formData.toplamBedel} ${formData.dovizCinsi}` : "-"],
              ["Koruma", formData.korumaSeviyesi],
              ["Garanti", formData.garantiSuresi || "-"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-slate-400">{k}</dt>
                <dd className="font-medium text-slate-800 truncate">{v || "-"}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
