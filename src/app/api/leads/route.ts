import { prisma } from "@/lib/prisma";
import { TipoLead } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      type,
      subject,
      message,
      propertyAddress,
      propertyType,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Nome, e-mail e telefone são obrigatórios." },
        { status: 400 },
      );
    }

    const leadType = Object.values(TipoLead).includes(type)
      ? (type as TipoLead)
      : TipoLead.CONTATO;

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        type: leadType,
        subject: subject || null,
        message: message || null,
        propertyAddress: propertyAddress || null,
        propertyType: propertyType || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        message:
          "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erro ao registrar lead:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro interno ao enviar sua mensagem." },
      { status: 500 },
    );
  }
}
