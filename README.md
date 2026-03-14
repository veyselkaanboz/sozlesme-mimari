# Sözleşme Mimarı — Otomatik Sözleşme Üreticisi v2.0

Türk hukuk mevzuatına tam uyumlu (TBK, TTK, HMK, KVKK), alıcı odaklı satınalma sözleşmesi taslakları üretir.

## Özellikler

- 6 adımlı form ile tüm sözleşme bilgilerini toplar (Taraflar, Konu, Teslimat, Teminat, Cezai Şart, Ek Koruma)
- **3 Koruma Seviyesi:** Agresif / Dengeli / Esnek
- Claude AI ile 24 maddelik profesyonel sözleşme taslağı üretir
- Yazdırma ve kopyalama desteği
- Sektörel detaylar, KVKK, gizlilik, rekabet yasağı, fikri mülkiyet maddeleri

## Kurulum

```bash
npm install
cp .env.local.example .env.local
# .env.local dosyasına Anthropic API anahtarınızı ekleyin
npm run dev
```

## Ortam Değişkenleri

```
ANTHROPIC_API_KEY=sk-ant-...
```

## Dağıtım (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Vercel'e yükleyin
2. `ANTHROPIC_API_KEY` değişkenini Vercel dashboard'dan ekleyin

## Uyarı

Üretilen sözleşmeler taslak niteliğindedir ve profesyonel hukuki danışmanlık yerine geçmez.
