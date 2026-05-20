export const stripHtml = (html) => {
  if (!html) return "";
  // تحويل النص إلى DOM مؤقت ثم استخراج النص منه
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};