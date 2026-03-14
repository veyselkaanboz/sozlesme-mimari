import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/system-prompt";
import { GenerateContractRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API anahtarı bulunamadı. .env.local dosyasını kontrol edin." },
        { status: 500 }
      );
    }

    const body: GenerateContractRequest = await request.json();
    const { formData } = body;

    if (!formData) {
      return NextResponse.json(
        { error: "Form verisi eksik." },
        { status: 400 }
      );
    }

    const client = new Anthropic({ apiKey });
    const userPrompt = buildUserPrompt(formData);

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const contractText =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ contract: contractText });
  } catch (error) {
    console.error("Contract generation error:", error);
    const message = error instanceof Error ? error.message : "Bilinmeyen hata";
    return NextResponse.json(
      { error: `Sözleşme üretilirken hata: ${message}` },
      { status: 500 }
    );
  }
}
