"use client";

import { useState } from "react";
import { ContractFormData, ProtectionLevel } from "@/lib/types";

interface Props {
  onSubmit: (data: ContractFormData) => void;
  loading: boolean;
}

const PROTECTION_LEVELS: { value: ProtectionLevel; label: string; desc: string; color: string }[] = [
  {
    value: "AGRESİF",
    label: "Agresif",
    desc: "Günlük %0,5 ceza · %15–20 teminat · 36 ay garanti · Tek ihlalde fesih",
    color: "border-red-400 bg-red-50 text-red-800",
  },
  {
    value: "DENGELİ",
    label: "Dengeli",
    desc: "Günlük %0,2 ceza · %10 teminat · 24 ay garanti · 2 uyarıdan sonra fesih",
    color: "border-yellow-400 bg-yellow-50 text-yellow-800",
  },
  {
    value: "ESNEK",
    label: "Esnek",
    desc: "Haftalık %0,5 ceza · %5 teminat · 12 ay garanti · 3 uyarı + 30 gün süre",
    color: "border-green-400 bg-green-50 text-green-800",
  },
];

const CONTRACT_TYPES = [
  "Mal Alımı",
  "Hizmet",
  "Teknik Montaj",
  "Bakım-Onarım",
  "Karma",
];

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const STEPS: { id: Step; label: string; icon: string }[] = [
  { id: 1, label: "Taraflar", icon: "👥" },
  { id: 2, label: "Konu & Bedel", icon: "📋" },
  { id: 3, label: "Teslimat", icon: "🚚" },
  { id: 4, label: "Süre & Teminat", icon: "🛡️" },
  { id: 5, label: "Cezai Şart", icon: "⚖️" },
  { id: 6, label: "Ek & Sektörel", icon: "🔧" },
];

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  type?: "text" | "textarea" | "select";
  required?: boolean;
  hint?: string;
  options?: string[];
}) {
  return (
    <div>
      <label className="label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className="input-field resize-none"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field"
        />
      )}
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

const initialFormData: ContractFormData = {
  aliciUnvan: "", aliciVergiDairesi: "", aliciYetkili: "", aliciAdres: "", aliciKep: "",
  tedarikciunvan: "", tedarikciVergiDairesi: "", tedarikciYetkili: "", tedarikciAdres: "", tedarikciKep: "",
  sozlesmeTuru: "Mal Alımı", konuTanimi: "", teknikSartname: "", miktar: "",
  toplamBedel: "", dovizCinsi: "TRY", kdvDurumu: "Hariç", odemeVadesi: "", odemeYontemi: "",
  fiyatRevizyon: "Sabit", gecOdemeFaizi: "Yasal faiz",
  teslimYeri: "", teslimSekli: "Tek seferde", teslimSuresi: "",
  nakliyeSorumlulugu: "", muayeneKabul: "Geçici kabul + Kesin kabul", kabulSuresi: "", retIadeKosullari: "",
  sozlesmeBaslangic: "İmza tarihinde", sozlesmeSuresi: "", otomatikYenileme: "Yok",
  olaganFesih: "30 gün önceden yazılı bildirimle", hakliNedenFesih: "",
  teminatTuru: "Banka teminat mektubu", teminatOrani: "", teminatIade: "",
  garantiSuresi: "", garantiKapsami: "Malzeme hatası ve işçilik", garantiDisi: "Kullanıcı hatası, doğal afet",
  sigortaYukumlulugu: "",
  korumaSeviyesi: "DENGELİ", gecikCezasiOrani: "", kaliteIhlaICezasi: "", cezaiSartUstSinir: "",
  uyusmazlikCozum: "Arabuluculuk → Mahkeme", yetkiliMahkeme: "",
  gizlilik: "Evet - 5 yıl", rekabetYasagi: "Hayır", fikrIMulkiyet: "Hayır",
  kvkkUyumu: "Evet", altYuklenici: "Yazılı onay şartıyla", devirTemlik: "Yazılı onayla mümkün",
  mucbirSebebOrnekleri: "Doğal afet, salgın, savaş, yasal değişiklik",
  mucbirSebebBildirim: "5 takvim günü",
  sektor: "", zorunluBelgeler: "", teknikStandartlar: "", egitimDevreye: "", yedekParcaGarantisi: "",
};

export default function ContractForm({ onSubmit, loading }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<ContractFormData>(initialFormData);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Step Navigator */}
      <div className="flex items-center gap-1 sm:gap-2 mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(s.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              step === s.id
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:border-brand-300 hover:text-brand-600"
            }`}
          >
            <span>{s.icon}</span>
            <span className="hidden sm:inline">{s.label}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>
        ))}
      </div>

      {/* Step 1: Taraflar */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="section-card">
            <h3 className="section-title">
              <span className="text-lg">🏢</span> Alıcı Bilgileri
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Tam Ticari Unvanı" name="aliciUnvan" value={form.aliciUnvan} onChange={handleChange}
                placeholder="Örn: ABC Sanayi ve Ticaret A.Ş." required />
              <Field label="Vergi Dairesi / Numarası" name="aliciVergiDairesi" value={form.aliciVergiDairesi} onChange={handleChange}
                placeholder="Örn: Bağcılar VD / 1234567890" />
              <Field label="Yetkili Kişi" name="aliciYetkili" value={form.aliciYetkili} onChange={handleChange}
                placeholder="Ad Soyad, Unvan, İmza Yetkisi" />
              <Field label="KEP Adresi" name="aliciKep" value={form.aliciKep} onChange={handleChange}
                placeholder="abc@hs01.kep.tr (varsa)" />
              <div className="sm:col-span-2">
                <Field label="Tebligat Adresi" name="aliciAdres" value={form.aliciAdres} onChange={handleChange}
                  placeholder="Tam adres" type="textarea" />
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title">
              <span className="text-lg">🏭</span> Tedarikçi Bilgileri
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Tam Ticari Unvanı" name="tedarikciunvan" value={form.tedarikciunvan} onChange={handleChange}
                placeholder="Örn: XYZ Makine Ltd. Şti." required />
              <Field label="Vergi Dairesi / Numarası" name="tedarikciVergiDairesi" value={form.tedarikciVergiDairesi} onChange={handleChange}
                placeholder="Örn: Ümraniye VD / 9876543210" />
              <Field label="Yetkili Kişi" name="tedarikciYetkili" value={form.tedarikciYetkili} onChange={handleChange}
                placeholder="Ad Soyad, Unvan, İmza Yetkisi" />
              <Field label="KEP Adresi" name="tedarikciKep" value={form.tedarikciKep} onChange={handleChange}
                placeholder="xyz@hs01.kep.tr (varsa)" />
              <div className="sm:col-span-2">
                <Field label="Tebligat Adresi" name="tedarikciAdres" value={form.tedarikciAdres} onChange={handleChange}
                  placeholder="Tam adres" type="textarea" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Konu & Bedel */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="section-card">
            <h3 className="section-title">
              <span className="text-lg">📋</span> Sözleşmenin Konusu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Sözleşme Türü <span className="text-red-500">*</span></label>
                <select name="sozlesmeTuru" value={form.sozlesmeTuru} onChange={handleChange} className="input-field">
                  {CONTRACT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <Field label="Miktar / Hacim" name="miktar" value={form.miktar} onChange={handleChange}
                placeholder="Örn: 500 adet, 2 lot" />
              <div className="sm:col-span-2">
                <Field label="Konu Tanımı" name="konuTanimi" value={form.konuTanimi} onChange={handleChange}
                  placeholder="Ne alınıyor? Hangi spesifikasyonlarda?" type="textarea" required />
              </div>
              <div className="sm:col-span-2">
                <Field label="Teknik Şartname Eki" name="teknikSartname" value={form.teknikSartname} onChange={handleChange}
                  placeholder="Örn: Ek-1 olarak eklenmiştir, bağlayıcıdır" />
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title">
              <span className="text-lg">💰</span> Bedel ve Ödeme Koşulları
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Toplam Bedel" name="toplamBedel" value={form.toplamBedel} onChange={handleChange}
                placeholder="Rakam ve yazıyla, Örn: 500.000,00" required />
              <div>
                <label className="label">Döviz Cinsi</label>
                <select name="dovizCinsi" value={form.dovizCinsi} onChange={handleChange} className="input-field">
                  {["TRY", "USD", "EUR", "GBP"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">KDV Durumu</label>
                <select name="kdvDurumu" value={form.kdvDurumu} onChange={handleChange} className="input-field">
                  {["Hariç", "Dahil", "İstisna kapsamı"].map((k) => <option key={k}>{k}</option>)}
                </select>
              </div>
              <Field label="Ödeme Vadesi" name="odemeVadesi" value={form.odemeVadesi} onChange={handleChange}
                placeholder="Örn: Kesin kabul + 30 gün" />
              <Field label="Ödeme Yöntemi" name="odemeYontemi" value={form.odemeYontemi} onChange={handleChange}
                placeholder="Örn: Havale/EFT" />
              <div>
                <label className="label">Fiyat Revizyon</label>
                <select name="fiyatRevizyon" value={form.fiyatRevizyon} onChange={handleChange} className="input-field">
                  {["Sabit", "Yıllık TÜFE endeksi", "Döviz kuru sabitleme"].map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
              <Field label="Geç Ödeme Faizi" name="gecOdemeFaizi" value={form.gecOdemeFaizi} onChange={handleChange}
                placeholder="Örn: Yasal faiz oranında" />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Teslimat */}
      {step === 3 && (
        <div className="section-card">
          <h3 className="section-title">
            <span className="text-lg">🚚</span> Teslimat ve Kabul Koşulları
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field label="Teslim Yeri" name="teslimYeri" value={form.teslimYeri} onChange={handleChange}
                placeholder="Depo, fabrika, şantiye tam adresi" required />
            </div>
            <div>
              <label className="label">Teslim Şekli</label>
              <select name="teslimSekli" value={form.teslimSekli} onChange={handleChange} className="input-field">
                {["Tek seferde", "Kısmi teslimat", "Periyodik"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <Field label="Teslim Süresi" name="teslimSuresi" value={form.teslimSuresi} onChange={handleChange}
              placeholder="Örn: Siparişten itibaren 45 takvim günü" required />
            <Field label="Nakliye Sorumluluğu" name="nakliyeSorumlulugu" value={form.nakliyeSorumlulugu} onChange={handleChange}
              placeholder="Örn: Tedarikçi / DDP / CIF" />
            <div>
              <label className="label">Muayene/Kabul Prosedürü</label>
              <select name="muayeneKabul" value={form.muayeneKabul} onChange={handleChange} className="input-field">
                {["Geçici kabul + Kesin kabul", "Tek aşamalı", "Numune onayı"].map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <Field label="Kabul Süresi" name="kabulSuresi" value={form.kabulSuresi} onChange={handleChange}
              placeholder="Örn: Teslimden itibaren 10 iş günü" />
            <div className="sm:col-span-2">
              <Field label="Ret / İade Koşulları" name="retIadeKosullari" value={form.retIadeKosullari} onChange={handleChange}
                placeholder="Hatalı ürün iade süreci, değiştirme/tamir hakkı" type="textarea" />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Süre & Teminat */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="section-card">
            <h3 className="section-title">
              <span className="text-lg">📅</span> Sözleşme Süresi ve Fesih
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Başlangıç Tarihi" name="sozlesmeBaslangic" value={form.sozlesmeBaslangic} onChange={handleChange}
                placeholder="gg.aa.yyyy veya imza tarihinde" />
              <Field label="Sözleşme Süresi" name="sozlesmeSuresi" value={form.sozlesmeSuresi} onChange={handleChange}
                placeholder="Örn: 12 ay / 2 yıl / Belirsiz" required />
              <Field label="Otomatik Yenileme" name="otomatikYenileme" value={form.otomatikYenileme} onChange={handleChange}
                placeholder="Örn: Yok / Her yıl 1 yıl uzar" />
              <Field label="Olağan Fesih Bildirimi" name="olaganFesih" value={form.olaganFesih} onChange={handleChange}
                placeholder="Örn: 30 gün önceden yazılı bildirimle" />
              <div className="sm:col-span-2">
                <Field label="Haklı Nedenle Fesih Halleri" name="hakliNedenFesih" value={form.hakliNedenFesih} onChange={handleChange}
                  placeholder="Örn: Temerrüt, iflası, tekrar eden ihlaller..." type="textarea" />
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title">
              <span className="text-lg">🛡️</span> Teminat ve Garanti
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Teminat Türü</label>
                <select name="teminatTuru" value={form.teminatTuru} onChange={handleChange} className="input-field">
                  {["Banka teminat mektubu", "Depozit", "Nakit", "Yok"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <Field label="Teminat Oranı / Tutarı" name="teminatOrani" value={form.teminatOrani} onChange={handleChange}
                placeholder="Örn: Sözleşme bedelinin %10'u" />
              <Field label="Teminat İade Koşulu" name="teminatIade" value={form.teminatIade} onChange={handleChange}
                placeholder="Örn: Kesin kabulden sonra 30 gün içinde" />
              <Field label="Garanti Süresi" name="garantiSuresi" value={form.garantiSuresi} onChange={handleChange}
                placeholder="Örn: Kesin kabulden itibaren 24 ay" required />
              <div className="sm:col-span-2">
                <Field label="Garanti Kapsamı" name="garantiKapsami" value={form.garantiKapsami} onChange={handleChange}
                  placeholder="Malzeme hatası, işçilik, performans..." type="textarea" />
              </div>
              <Field label="Garanti Dışı Haller" name="garantiDisi" value={form.garantiDisi} onChange={handleChange}
                placeholder="Kullanıcı hatası, doğal afet..." />
              <Field label="Sigorta Yükümlülüğü" name="sigortaYukumlulugu" value={form.sigortaYukumlulugu} onChange={handleChange}
                placeholder="Taşıma, montaj, 3. şahıs sigortası..." />
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Cezai Şart & Uyuşmazlık */}
      {step === 5 && (
        <div className="space-y-6">
          {/* Protection Level */}
          <div className="section-card">
            <h3 className="section-title">
              <span className="text-lg">⚖️</span> Koruma Seviyesi
              <span className="text-red-500 text-xs font-normal">* Gerekli</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PROTECTION_LEVELS.map((pl) => (
                <button
                  key={pl.value}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, korumaSeviyesi: pl.value }))}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    form.korumaSeviyesi === pl.value
                      ? pl.color + " border-opacity-100 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="font-bold text-sm mb-1">{pl.label}</div>
                  <div className="text-xs leading-relaxed opacity-80">{pl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title">
              <span className="text-lg">💢</span> Cezai Şart Detayları
              <span className="text-xs font-normal text-slate-400">(Boş bırakılırsa koruma seviyesine göre otomatik belirlenir)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Gecikme Cezası Oranı" name="gecikCezasiOrani" value={form.gecikCezasiOrani} onChange={handleChange}
                placeholder="Ör: Günlük %0,2 – maks. %15" />
              <Field label="Kalite/Performans İhlali Cezası" name="kaliteIhlaICezasi" value={form.kaliteIhlaICezasi} onChange={handleChange}
                placeholder="Ör: Bedelin %10'u" />
              <Field label="Cezai Şart Üst Sınırı" name="cezaiSartUstSinir" value={form.cezaiSartUstSinir} onChange={handleChange}
                placeholder="Ör: Toplam bedelin %20'si" />
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title">
              <span className="text-lg">🏛️</span> Uyuşmazlık Çözümü
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Uyuşmazlık Çözüm Yöntemi</label>
                <select name="uyusmazlikCozum" value={form.uyusmazlikCozum} onChange={handleChange} className="input-field">
                  {["Arabuluculuk → Mahkeme", "Doğrudan Mahkeme", "Tahkim"].map((u) => <option key={u}>{u}</option>)}
                </select>
              </div>
              <Field label="Yetkili Mahkeme / Hakem Kurumu" name="yetkiliMahkeme" value={form.yetkiliMahkeme} onChange={handleChange}
                placeholder="Örn: İstanbul Mahkemeleri" required />
            </div>
          </div>
        </div>
      )}

      {/* Step 6: Ek Koruma & Sektörel */}
      {step === 6 && (
        <div className="space-y-6">
          <div className="section-card">
            <h3 className="section-title">
              <span className="text-lg">🔒</span> Ek Koruma Katmanları
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Gizlilik / NDA</label>
                <select name="gizlilik" value={form.gizlilik} onChange={handleChange} className="input-field">
                  {["Evet - 2 yıl", "Evet - 5 yıl", "Evet - Süresiz", "Hayır"].map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Rekabet Yasağı</label>
                <select name="rekabetYasagi" value={form.rekabetYasagi} onChange={handleChange} className="input-field">
                  {["Evet", "Hayır"].map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Fikri Mülkiyet</label>
                <select name="fikrIMulkiyet" value={form.fikrIMulkiyet} onChange={handleChange} className="input-field">
                  {["Hayır", "Evet - Alıcıya ait", "Evet - Tedarikçiye ait", "Evet - Lisanslı"].map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="label">KVKK Uyumu</label>
                <select name="kvkkUyumu" value={form.kvkkUyumu} onChange={handleChange} className="input-field">
                  {["Evet", "Hayır"].map((k) => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Alt Yüklenici İzni</label>
                <select name="altYuklenici" value={form.altYuklenici} onChange={handleChange} className="input-field">
                  {["Kesinlikle yasak", "Yazılı onay şartıyla", "Bildirimle mümkün"].map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Devir / Temlik</label>
                <select name="devirTemlik" value={form.devirTemlik} onChange={handleChange} className="input-field">
                  {["Kesinlikle yasak", "Yazılı onayla mümkün", "30 gün bildirimle mümkün"].map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <Field label="Mücbir Sebep Örnekleri" name="mucbirSebebOrnekleri" value={form.mucbirSebebOrnekleri} onChange={handleChange}
                placeholder="Doğal afet, salgın, savaş..." />
              <Field label="Mücbir Sebep Bildirim Süresi" name="mucbirSebebBildirim" value={form.mucbirSebebBildirim} onChange={handleChange}
                placeholder="Örn: 5 takvim günü içinde" />
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title">
              <span className="text-lg">🔧</span> Sektörel ve Teknik Detaylar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Sektör" name="sektor" value={form.sektor} onChange={handleChange}
                placeholder="Gıda, enerji, inşaat, IT..." />
              <Field label="Zorunlu Belgeler" name="zorunluBelgeler" value={form.zorunluBelgeler} onChange={handleChange}
                placeholder="ISO, CE, TSE, hijyen belgesi..." />
              <Field label="Teknik Standartlar" name="teknikStandartlar" value={form.teknikStandartlar} onChange={handleChange}
                placeholder="Voltaj, frekans, tolerans..." />
              <Field label="Eğitim / Devreye Alma" name="egitimDevreye" value={form.egitimDevreye} onChange={handleChange}
                placeholder="Örn: 2 günlük eğitim verilecek" />
              <Field label="Yedek Parça Garantisi" name="yedekParcaGarantisi" value={form.yedekParcaGarantisi} onChange={handleChange}
                placeholder="Örn: 5 yıl boyunca yedek parça temini" />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={() => setStep((prev) => Math.max(1, prev - 1) as Step)}
          disabled={step === 1}
          className="btn-secondary disabled:opacity-30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Geri
        </button>

        <div className="flex items-center gap-1.5">
          {STEPS.map((s) => (
            <button key={s.id} type="button" onClick={() => setStep(s.id)}
              className={`w-2 h-2 rounded-full transition-all ${step === s.id ? "bg-brand-600 w-4" : "bg-slate-300 hover:bg-slate-400"}`} />
          ))}
        </div>

        {step < 6 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => Math.min(6, prev + 1) as Step)}
            className="btn-primary"
          >
            İleri
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sözleşme Üretiliyor...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Sözleşme Üret
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
