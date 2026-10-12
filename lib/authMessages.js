export function getAuthErrorMessage(error) {
  const message = (error?.message || error?.code || "").toLowerCase();

  if (message.includes("exist") || message.includes("already")) {
    return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা আছে";
  }

  if (message.includes("invalid") || message.includes("password") || message.includes("email")) {
    return "ইমেইল বা পাসওয়ার্ড ঠিক নয়";
  }

  return "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন";
}
