export default function handler(req, res) {
  // Permite apenas POST
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Use POST" });
  }

  const { code } = req.body || {};

  // Validação básica
  if (!code || typeof code !== "string") {
    return res.status(400).json({ ok: false, error: "Código ausente" });
  }

  // Normaliza o código digitado
  const normalized = code.trim().toUpperCase();

  // ✅ Códigos vindo do Vercel ENV: PREMIUM_CODES="A,B,C"
  const raw = process.env.PREMIUM_CODES || "";

  // Transforma em lista limpa (split por vírgula)
  const validCodes = raw
    .split(",")
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean);

  // Se não tiver nenhum código configurado no servidor
  if (validCodes.length === 0) {
    return res.status(500).json({
      ok: false,
      error: "Códigos não configurados no servidor",
    });
  }

  // Confere se o código existe
  const isValid = validCodes.includes(normalized);

  if (!isValid) {
    return res.status(401).json({ ok: false, error: "Código inválido" });
  }

  // ✅ Sucesso (mantém seu contrato atual)
  return res.status(200).json({
    ok: true,
    premium: true,
    token: "premium",
    expiresInDays: 30,
  });
}
