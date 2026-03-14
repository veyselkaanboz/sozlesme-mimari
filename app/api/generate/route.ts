import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/system-prompt";
import { GenerateContractRequest } from "@/lib/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body: GenerateContractRequest = await request.json();
    const { formData } = body;

    if (!formData) {
      return NextResponse.json(
        { error: "Form verisi eksik." },
        { status: 400 }
      );
    }

    const userPrompt = buildUserPrompt(formData);

    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const contractText =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ contract: contractText });
  } catch (error) {
    console.error("Contract generation error:", error);
    return NextResponse.json(
      { error: "Sözleşme üretilirken bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
