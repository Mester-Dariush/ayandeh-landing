

// Global config. I guess.
// Put your bot info here. Or don't. I'm just a comment.

export const config = {
  // The name of this thing
  appName: "آینده", // Updated to match the overall project name
  
  // Where the bot lives (for the back buttons)
  telegramBotUrl: "https://t.me/YourBotID",
  
  // Who to complain to
  supportUrl: "https://t.me/YourSupportID",

  // Home page strings. Boring stuff.
  home: {
    badge: "نسخه آزمایشی",
    titlePrefix: "یه چیز", // Added for dynamic title
    titleSuffix: "تو راهه...", // Added for dynamic title
    description: "یه خبراییه! داریم با دقت و وسواس روی چیزی کار می‌کنیم که شبیه هیچکدوم از تجربه‌های قبلیت نیست.",
    telegramButtonText: "ربات تلگرام",
    telegramButtonDesc: "فعلا تا سایت آماده میشه، از رباتمون استفاده کن"
  },

  // Success page text
  success: {
    title: "پرداخت انجام شد!",
    desc: "تراکنش با موفقیت ثبت شد. حالا می‌تونی به ربات برگردی و از سرویس استفاده کنی.",
    button: "بازگشت به ربات"
  },

  // Failed page text. Bummer.
  failed: {
    title: "پرداخت انجام نشد",
    desc: "مشکلی در پرداخت پیش اومده یا توسط کاربر لغو شده. اگه پول کم شده، تا ۷۲ ساعت برمیگرده.",
    button: "تلاش مجدد / پشتیبانی"
  },

  // Redirect page stuff
  redirect: {
    title: "در حال انتقال...",
    desc: "شکیبا باشید، داریم به درگاه بانک وصل می‌شیم."
  }
};