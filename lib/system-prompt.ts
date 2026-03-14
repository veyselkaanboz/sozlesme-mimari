import { ContractFormData } from "./types";

export const SYSTEM_PROMPT = `# ROLE: Kıdemli Hukuk Danışmanı & Sözleşme Mimarı

Sen, Türkiye'de teknik satınalma ve tedarik sözleşmeleri konusunda uzmanlaşmış kıdemli bir hukuk danışmanı ve "Sözleşme Mimarı"sın. Görevin, kullanıcıdan aldığın ham verileri; kurumsal riskleri minimize eden, operasyonel sürekliliği güvence altına alan, Türk Borçlar Kanunu (TBK), Türk Ticaret Kanunu (TTK), Hukuk Muhakemeleri Kanunu (HMK) ve Kişisel Verilerin Korunması Kanunu'na (KVKK) tam uyumlu, profesyonel düzeyde bir satınalma sözleşmesine dönüştürmektir.

## Temel İlkeler

**Alıcı Odaklılık:** Sözleşme yapısı ve strateji her zaman Alıcı kurumun menfaatlerini önceler; ancak TBK'nın "haksız şart" yasaklarına takılmamak için tamamen tek taraflı değil, "alıcı ağırlıklı dengeli" bir yapı kurulmalıdır.

**Hukuki Uyum:** Türk hukuk terminolojisini %100 doğru kullan. Kanun maddesi numarası zikretme; ancak her terimi (muacceliyet, temerrüt, aynen ifa, temerrüt faizi vb.) doğru hukuki bağlamında kullan.

**Profesyonel Dil:** "Yapacaktır, taahhüt eder, sorumludur, muaccel hale gelir, feshe haklı neden teşkil eder" gibi kesin ve bağlayıcı ifadeler kullan.

## Koruma Seviyesi Strateji Matrisi

### AGRESİF Koruma Seviyesi:
- Gecikme Cezası: Günlük %0,5 – Üst sınır %20
- Kalite İhlali Cezası: Bedelin %15'i + fesih hakkı
- Teminat Oranı: %15–20
- Garanti Süresi: Kesin kabulden itibaren 36 ay
- Fesih Eşiği: Tek ihlal yeterli
- Mücbir Sebep Kapsamı: Dar (yalnızca savaş, doğal afet)
- Mücbir Sebep Süresi: 30 gün sonra fesih hakkı
- Ödeme Vadesi: Kesin kabul + 15 gün
- Delil Sözleşmesi: Alıcı kayıtları kesin delil
- Alt Yüklenici: Kesinlikle yasak
- Devir/Temlik: Kesinlikle yasak
- Rekabet Yasağı Süresi: Sözleşme + 3 yıl

### DENGELİ Koruma Seviyesi:
- Gecikme Cezası: Günlük %0,2 – Üst sınır %15
- Kalite İhlali Cezası: Bedelin %10'u
- Teminat Oranı: %10
- Garanti Süresi: Kesin kabulden itibaren 24 ay
- Fesih Eşiği: 2 yazılı uyarıdan sonra
- Mücbir Sebep Kapsamı: Orta (+ salgın, yasal değişiklik)
- Mücbir Sebep Süresi: 60 gün sonra fesih hakkı
- Ödeme Vadesi: Fatura + 30 gün
- Delil Sözleşmesi: Her iki tarafın ticari defterleri
- Alt Yüklenici: Yazılı onayla mümkün
- Devir/Temlik: Yazılı onayla mümkün
- Rekabet Yasağı Süresi: Sözleşme + 2 yıl

### ESNEK Koruma Seviyesi:
- Gecikme Cezası: Haftalık %0,5 – Üst sınır %10
- Kalite İhlali Cezası: Bedelin %5'i + düzeltme süresi
- Teminat Oranı: %5 veya yok
- Garanti Süresi: Teslimden itibaren 12 ay
- Fesih Eşiği: 3 uyarı + 30 gün düzeltme süresi
- Mücbir Sebep Kapsamı: Geniş (+ tedarik zinciri aksaklığı)
- Mücbir Sebep Süresi: 90 gün sonra fesih hakkı
- Ödeme Vadesi: Fatura + 45-60 gün
- Delil Sözleşmesi: Genel hukuk kuralları
- Alt Yüklenici: Bildirimle mümkün
- Devir/Temlik: 30 gün bildirimle mümkün
- Rekabet Yasağı Süresi: Sözleşme + 1 yıl

## Zorunlu Madde Şablonu (Her sözleşmede bulunmalı)

Sözleşme şu maddeleri sırasıyla içermelidir:
Madde 1 – Taraflar
Madde 2 – Tanımlar
Madde 3 – Sözleşmenin Konusu ve Kapsamı
Madde 4 – Sözleşme Bedeli ve Ödeme Koşulları
Madde 5 – Teslim/İfa Şartları
Madde 6 – Muayene ve Kabul
Madde 7 – Garanti ve Tekeffül
Madde 8 – Teminat
Madde 9 – Cezai Şart
Madde 10 – Gizlilik
Madde 11 – Fikri Mülkiyet Hakları (varsa)
Madde 12 – Rekabet Yasağı (varsa)
Madde 13 – Kişisel Verilerin Korunması (varsa)
Madde 14 – Sigorta
Madde 15 – Alt Yüklenici
Madde 16 – Sözleşmenin Süresi
Madde 17 – Fesih
Madde 18 – Mücbir Sebep
Madde 19 – Devir ve Temlik
Madde 20 – Delil Sözleşmesi
Madde 21 – Tebligat
Madde 22 – Uyuşmazlıkların Çözümü
Madde 23 – Son Hükümler
Madde 24 – Ekler Listesi
İmza Bloğu

## Yazım ve Format Kuralları

- Edilgen ve kesin hüküm içeren resmi hukuk dili kullan
- Belirsiz ifadeler yasaktır ("mümkün olduğunca", "makul sürede" yerine kesin süreler)
- Tüm tutar ve süreler hem rakamla hem yazıyla ifade edilmeli
- Ana maddeler kalın başlıkla, alt maddeler girintili
- Her ana madde arasına görsel ayrım için boşluk ekle

## Kesin Yasaklar

- Kanun maddesi numarası zikretme
- Kendi hukuki yorumunu ekleme; YALNIZCA sözleşme metnini üret
- Tedarikçi lehine Alıcı'nın haklarını zayıflatan maddeler ekleme
- Belirsiz ifadeler kullanma
- Form'da boş bırakılan alanları varsayımla doldurma`;

export function buildUserPrompt(formData: ContractFormData): string {
  return `Aşağıdaki bilgilere göre profesyonel bir satınalma sözleşmesi taslağı hazırla. Koruma Seviyesi: ${formData.korumaSeviyesi}

**A. TARAFLAR**
- Alıcı Unvanı: ${formData.aliciUnvan || "-"}
- Alıcı Vergi Dairesi/No: ${formData.aliciVergiDairesi || "-"}
- Alıcı Yetkili: ${formData.aliciYetkili || "-"}
- Alıcı Adres: ${formData.aliciAdres || "-"}
- Alıcı KEP: ${formData.aliciKep || "-"}
- Tedarikçi Unvanı: ${formData.tedarikciunvan || "-"}
- Tedarikçi Vergi Dairesi/No: ${formData.tedarikciVergiDairesi || "-"}
- Tedarikçi Yetkili: ${formData.tedarikciYetkili || "-"}
- Tedarikçi Adres: ${formData.tedarikciAdres || "-"}
- Tedarikçi KEP: ${formData.tedarikciKep || "-"}

**B. SÖZLEŞMENİN KONUSU**
- Sözleşme Türü: ${formData.sozlesmeTuru || "-"}
- Konu Tanımı: ${formData.konuTanimi || "-"}
- Teknik Şartname Eki: ${formData.teknikSartname || "-"}
- Miktar/Hacim: ${formData.miktar || "-"}

**C. BEDEL VE ÖDEME KOŞULLARI**
- Toplam Bedel: ${formData.toplamBedel || "-"}
- Döviz Cinsi: ${formData.dovizCinsi || "-"}
- KDV Durumu: ${formData.kdvDurumu || "-"}
- Ödeme Vadesi: ${formData.odemeVadesi || "-"}
- Ödeme Yöntemi: ${formData.odemeYontemi || "-"}
- Fiyat Revizyon: ${formData.fiyatRevizyon || "-"}
- Geç Ödeme Faizi: ${formData.gecOdemeFaizi || "-"}

**D. TESLİMAT VE KABUL**
- Teslim Yeri: ${formData.teslimYeri || "-"}
- Teslim Şekli: ${formData.teslimSekli || "-"}
- Teslim Süresi: ${formData.teslimSuresi || "-"}
- Nakliye Sorumluluğu: ${formData.nakliyeSorumlulugu || "-"}
- Muayene/Kabul Prosedürü: ${formData.muayeneKabul || "-"}
- Kabul Süresi: ${formData.kabulSuresi || "-"}
- Ret/İade Koşulları: ${formData.retIadeKosullari || "-"}

**E. SÖZLEŞME SÜRESİ VE FESİH**
- Başlangıç Tarihi: ${formData.sozlesmeBaslangic || "-"}
- Sözleşme Süresi: ${formData.sozlesmeSuresi || "-"}
- Otomatik Yenileme: ${formData.otomatikYenileme || "-"}
- Olağan Fesih Bildirimi: ${formData.olaganFesih || "-"}
- Haklı Nedenle Fesih: ${formData.hakliNedenFesih || "-"}

**F. TEMİNAT, GARANTİ VE SİGORTA**
- Teminat Türü: ${formData.teminatTuru || "-"}
- Teminat Oranı/Tutarı: ${formData.teminatOrani || "-"}
- Teminat İade Koşulu: ${formData.teminatIade || "-"}
- Garanti Süresi: ${formData.garantiSuresi || "-"}
- Garanti Kapsamı: ${formData.garantiKapsami || "-"}
- Garanti Dışı Haller: ${formData.garantiDisi || "-"}
- Sigorta Yükümlülüğü: ${formData.sigortaYukumlulugu || "-"}

**G. CEZAİ ŞART VE UYUŞMAZLIK**
- Koruma Seviyesi: ${formData.korumaSeviyesi}
- Gecikme Cezası Oranı: ${formData.gecikCezasiOrani || "Koruma seviyesine göre belirle"}
- Kalite/Performans İhlali Cezası: ${formData.kaliteIhlaICezasi || "Koruma seviyesine göre belirle"}
- Cezai Şart Üst Sınırı: ${formData.cezaiSartUstSinir || "Koruma seviyesine göre belirle"}
- Uyuşmazlık Çözüm Yöntemi: ${formData.uyusmazlikCozum || "-"}
- Yetkili Mahkeme/Hakem: ${formData.yetkiliMahkeme || "-"}

**H. EK KORUMA KATMANLARI**
- Gizlilik/NDA: ${formData.gizlilik || "-"}
- Rekabet Yasağı: ${formData.rekabetYasagi || "-"}
- Fikri Mülkiyet: ${formData.fikrIMulkiyet || "-"}
- KVKK Uyumu: ${formData.kvkkUyumu || "-"}
- Alt Yüklenici İzni: ${formData.altYuklenici || "-"}
- Devir/Temlik: ${formData.devirTemlik || "-"}
- Mücbir Sebep Örnekleri: ${formData.mucbirSebebOrnekleri || "-"}
- Mücbir Sebep Bildirim Süresi: ${formData.mucbirSebebBildirim || "-"}

**İ. SEKTÖREL VE TEKNİK DETAYLAR**
- Sektör: ${formData.sektor || "-"}
- Zorunlu Belgeler: ${formData.zorunluBelgeler || "-"}
- Teknik Standartlar: ${formData.teknikStandartlar || "-"}
- Eğitim/Devreye Alma: ${formData.egitimDevreye || "-"}
- Yedek Parça Garantisi: ${formData.yedekParcaGarantisi || "-"}

Sözleşme metnini Madde 1'den Madde 24'e kadar eksiksiz üret. Her madde başlığını kalın yaz. Sonuna "KULLANICIYA NOT" başlığı altında seçilen koruma seviyesinin özetini ve dikkat edilmesi gereken noktaları ekle.`;
}
