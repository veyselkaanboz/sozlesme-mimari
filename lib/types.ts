export type ProtectionLevel = "AGRESİF" | "DENGELİ" | "ESNEK";

export interface ContractFormData {
  // A. TARAFLAR
  aliciUnvan: string;
  aliciVergiDairesi: string;
  aliciYetkili: string;
  aliciAdres: string;
  aliciKep: string;
  tedarikciunvan: string;
  tedarikciVergiDairesi: string;
  tedarikciYetkili: string;
  tedarikciAdres: string;
  tedarikciKep: string;

  // B. SÖZLEŞMENİN KONUSU
  sozlesmeTuru: string;
  konuTanimi: string;
  teknikSartname: string;
  miktar: string;

  // C. BEDEL VE ÖDEME
  toplamBedel: string;
  dovizCinsi: string;
  kdvDurumu: string;
  odemeVadesi: string;
  odemeYontemi: string;
  fiyatRevizyon: string;
  gecOdemeFaizi: string;

  // D. TESLİMAT VE KABUL
  teslimYeri: string;
  teslimSekli: string;
  teslimSuresi: string;
  nakliyeSorumlulugu: string;
  muayeneKabul: string;
  kabulSuresi: string;
  retIadeKosullari: string;

  // E. SÜRE VE FESİH
  sozlesmeBaslangic: string;
  sozlesmeSuresi: string;
  otomatikYenileme: string;
  olaganFesih: string;
  hakliNedenFesih: string;

  // F. TEMİNAT VE GARANTİ
  teminatTuru: string;
  teminatOrani: string;
  teminatIade: string;
  garantiSuresi: string;
  garantiKapsami: string;
  garantiDisi: string;
  sigortaYukumlulugu: string;

  // G. CEZAİ ŞART
  korumaSeviyesi: ProtectionLevel;
  gecikCezasiOrani: string;
  kaliteIhlaICezasi: string;
  cezaiSartUstSinir: string;
  uyusmazlikCozum: string;
  yetkiliMahkeme: string;

  // H. EK KORUMA
  gizlilik: string;
  rekabetYasagi: string;
  fikrIMulkiyet: string;
  kvkkUyumu: string;
  altYuklenici: string;
  devirTemlik: string;
  mucbirSebebOrnekleri: string;
  mucbirSebebBildirim: string;

  // İ. SEKTÖREL
  sektor: string;
  zorunluBelgeler: string;
  teknikStandartlar: string;
  egitimDevreye: string;
  yedekParcaGarantisi: string;
}

export interface GenerateContractRequest {
  formData: ContractFormData;
}

export interface GenerateContractResponse {
  contract: string;
  error?: string;
}
