"use client";

import { useRef } from "react";
import { ContractFormData } from "@/lib/types";

interface Props {
  contract: string;
  formData: ContractFormData | null;
  onReset: () => void;
}

function formatContract(text: string): string {
  // Convert markdown-like bold to HTML
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^(Madde \d+[\.\d]*\s*[-–].*?)$/gm, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");
}

export default function ContractViewer({ contract, formData, onReset }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  function handlePrint() {
    window.print();
  }

  function handleCopy() {
    navigator.clipboard.writeText(contract);
  }

  const levelColor = {
    AGRESİF: "bg-red-100 text-red-800 border-red-200",
    DENGELİ: "bg-yellow-100 text-yellow-800 border-yellow-200",
    ESNEK: "bg-green-100 text-green-800 border-green-200",
  }[formData?.korumaSeviyesi ?? "DENGELİ"];

  // Split contract from KULLANICIYA NOT section
  const notIndex = contract.indexOf("KULLANICIYA NOT");
  const mainContract = notIndex > -1 ? contract.slice(0, notIndex) : contract;
  const userNote = notIndex > -1 ? contract.slice(notIndex) : "";

  return (
    <div>
      {/* Toolbar */}
      <div className="no-print mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Sözleşme Taslağı Hazır</h2>
          <p className="text-sm text-slate-500 mt-1">
            Bu taslak bilgi amaçlıdır. Kullanmadan önce bir hukuk danışmanına inceletin.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData && (
            <span className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border ${levelColor}`}>
              Koruma: {formData.korumaSeviyesi}
            </span>
          )}
          <button onClick={handleCopy} className="btn-secondary text-xs px-4 py-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Kopyala
          </button>
          <button onClick={handlePrint} className="btn-secondary text-xs px-4 py-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Yazdır / PDF
          </button>
          <button onClick={onReset} className="btn-secondary text-xs px-4 py-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            Yeni Sözleşme
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Contract */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="no-print px-6 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-slate-600">Sözleşme Metni</span>
            </div>
            <div className="p-8" ref={contentRef}>
              <div
                className="contract-content text-sm text-slate-800 whitespace-pre-wrap leading-relaxed"
              >
                {mainContract}
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4 no-print">
          {/* User Note */}
          {userNote && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Kullanıcıya Not
              </h3>
              <div className="text-xs text-amber-800 whitespace-pre-wrap leading-relaxed">
                {userNote.replace("KULLANICIYA NOT", "").replace("Kullanıcıya Not", "").trim()}
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Önemli Uyarı
            </h3>
            <p className="text-xs text-red-700 leading-relaxed">
              Bu sözleşme taslak niteliğindedir ve profesyonel hukuki danışmanlık yerine geçmez.
              Kullanmadan önce bir avukata veya hukuk müşavirine inceletin.
            </p>
          </div>

          {/* Summary */}
          {formData && (
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-800 mb-3 text-sm">Özet Bilgiler</h3>
              <dl className="space-y-2 text-xs">
                {[
                  ["Sözleşme Türü", formData.sozlesmeTuru],
                  ["Toplam Bedel", formData.toplamBedel ? `${formData.toplamBedel} ${formData.dovizCinsi}` : "-"],
                  ["Koruma Seviyesi", formData.korumaSeviyesi],
                  ["Garanti Süresi", formData.garantiSuresi || "-"],
                  ["Teminat Türü", formData.teminatTuru],
                  ["Yetkili Mahkeme", formData.yetkiliMahkeme || "-"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-2">
                    <dt className="text-slate-500 flex-shrink-0">{k}</dt>
                    <dd className="text-slate-800 font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
