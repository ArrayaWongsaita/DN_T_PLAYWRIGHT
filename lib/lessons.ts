export type Lesson = { id: string; title: string; phase: number };

export const phases = [
  "ช่วงที่ 1: เริ่มต้น",
  "ช่วงที่ 2: ลงมือใช้งาน",
  "ช่วงที่ 3: ดูผลการทดสอบ",
  "ช่วงที่ 4: ของที่มาทีหลังและ API",
  "ช่วงที่ 5: โปรเจกต์จริง (ร้านค้า)",
];

export const lessons: Lesson[] = [
  { id: "01-first-test", title: "test แรกของฉัน", phase: 1 },
  { id: "02-role-and-text", title: "หา element ด้วย role และข้อความ", phase: 1 },
  { id: "03-labels-and-placeholders", title: "หาช่องฟอร์มด้วย label", phase: 1 },
  { id: "04-click", title: "คลิกปุ่ม", phase: 2 },
  { id: "05-fill-form", title: "กรอกฟอร์ม", phase: 2 },
  { id: "06-checkbox-radio-select", title: "checkbox, radio, select", phase: 2 },
  { id: "07-assertions", title: "assertion แบบต่างๆ", phase: 2 },
  { id: "08-headed-and-ui-mode", title: "เปิดเบราว์เซอร์ดู (headed, UI mode)", phase: 3 },
  { id: "09-report-and-trace", title: "รายงานผลและ Trace Viewer", phase: 3 },
  { id: "10-codegen-and-debug", title: "codegen และ debug", phase: 3 },
  { id: "11-auto-waiting", title: "auto-waiting", phase: 4 },
  { id: "12-mock-api", title: "mock API ด้วย page.route", phase: 4 },
  { id: "13-error-empty-loading", title: "สถานะ error, empty, loading", phase: 4 },
  { id: "14-describe-and-hooks", title: "describe, beforeEach, step", phase: 5 },
  { id: "15-page-object", title: "Page Object", phase: 5 },
  { id: "16-fixtures", title: "fixtures", phase: 5 },
  { id: "17-login-storagestate", title: "login ครั้งเดียวด้วย storageState", phase: 5 },
  { id: "18-full-flow", title: "เทสทั้ง flow", phase: 5 },
];

export function lessonHref(l: Lesson): string {
  return l.phase === 5 ? "/shop" : `/lessons/${l.id}`;
}
