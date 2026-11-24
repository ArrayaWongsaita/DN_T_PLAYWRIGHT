# ฝึกเขียน E2E test ด้วย Playwright (Next.js)

เรโปนี้คือแบบฝึกหัด 18 บท สำหรับคนที่เขียน React/Next.js และเคยเขียน test ด้วย Vitest + React Testing Library มาแล้ว แต่ยังไม่เคยใช้ Playwright

Playwright เปิดเบราว์เซอร์จริง (Chromium) เข้าเว็บที่รันอยู่ แล้วคลิก พิมพ์ และตรวจผลเหมือนผู้ใช้จริง ต่างจาก Vitest ที่เรนเดอร์ component ใน jsdom

แต่ละบทมีเพจเล็กๆ ในแอป Next.js (เปิดดูได้ที่ http://localhost:3000 หลังรัน `pnpm dev` ใน terminal อีกอัน) และไฟล์ test ใน `e2e/` ที่เตรียมโจทย์ไว้ให้ ค่อยๆ เพิ่มคำสั่งทีละนิด ตั้งแต่ `page.goto` ไปจนถึง Page Object, fixtures และการ login ครั้งเดียวด้วย `storageState`

เครื่องมือ: Playwright Test + Next.js + TypeScript (ใช้ Chromium อย่างเดียว)

## ติดตั้ง

```bash
git clone <url ของเรโปนี้>
cd <โฟลเดอร์ของเรโป>
pnpm install
pnpm setup:browsers        # ดาวน์โหลด Chromium สำหรับ Playwright (ทำครั้งเดียว)
pnpm test:e2e setup-check  # ต้องขึ้น 2 passed ถ้าเห็นแบบนี้ แปลว่าติดตั้งสำเร็จ
```

ต้องใช้ Node 20 ขึ้นไป และ [pnpm](https://pnpm.io/installation) (ถ้ายังไม่มี: `npm i -g pnpm`)

ครั้งแรกที่รันจะ build แอปก่อน ใช้เวลาประมาณ 20 วินาที หลังจากนั้นจะเร็ว ไม่ต้องเปิดเซิร์ฟเวอร์เอง Playwright เปิดให้

## วิธีทำแบบฝึกหัด

1. เปิดไฟล์ test ของบท เช่น `e2e/01-first-test/first.spec.ts`
2. อ่านคำอธิบายด้านบนไฟล์ (คำสั่งที่ใช้ในบทนั้น พร้อมตัวอย่าง)
3. ดูเพจของบทนั้นในเบราว์เซอร์ (เช่น http://localhost:3000/lessons/01-first-test) เพื่อรู้ว่ามีอะไรให้ทดสอบ
4. เปลี่ยน `test.fixme(...)` ของข้อนั้นเป็น `test(...)` แล้วเขียนโค้ดตรงจุดที่มี 👉
5. รัน test ดูผล ทำทีละข้อ

## วิธีรัน

```bash
pnpm test:e2e                       # รันทุกบท
pnpm test:e2e e2e/04-click          # รันเฉพาะบท 04
pnpm test:e2e -g "สองครั้ง"         # รันเฉพาะ test ที่ชื่อมีคำนี้ (เป็น regex ระวังอักขระพิเศษอย่าง + ( ) )
pnpm test:e2e:headed                # เปิดหน้าต่างเบราว์เซอร์ให้ดูตอนเทสทำงาน
pnpm test:e2e:ui                    # UI mode: กดรันทีละ test ดูภาพย้อนหลังได้
pnpm report                         # เปิดรายงานผลล่าสุดในเบราว์เซอร์
```

รายละเอียดวิธีดูผลอยู่ในบท 08-10 และสรุปคำสั่งทั้งหมดอยู่ใน [`docs/cheatsheet.md`](docs/cheatsheet.md)

> ถ้าแก้โค้ดเพจในโฟลเดอร์ `app/` แล้วอยากให้ test เห็นการเปลี่ยนแปลง ให้ลบ build เก่าก่อน: `rm -rf .next` (รันครั้งถัดไปจะ build ใหม่ให้เอง)

## วิธีอ่านผล

- `skipped` = ข้อที่ยังไม่ได้ทำ (`test.fixme`) ไม่นับว่าล้ม `pnpm test:e2e` ยังเขียวอยู่
- `✓` หรือ `passed` = test ผ่าน
- `✘` หรือ `failed` = test ไม่ผ่าน ดู **Expected** (ที่คาดหวัง) เทียบกับ **Received** (ที่ได้จริง)
- `Timeout ... waiting for expect(...)` หรือ `element(s) not found` = รอแล้วแต่หา element ไม่เจอ ตรวจชื่อ role/ข้อความให้ตรง และเปิดรายงานดูภาพหน้าจอตอนพัง (`pnpm report`)
- `strict mode violation ... resolved to N elements` = locator เจอหลายตัวแต่สั่ง action ให้ทำกับตัวเดียว ทำให้ locator เจาะจงขึ้น (ดูบท 03)

## สารบัญ

### ช่วงที่ 1: เริ่มต้น (บท 01-03)

| บท | โฟลเดอร์ | ฝึก |
|---|---|---|
| 01 | `01-first-test` | `test`, `page.goto`, `toHaveTitle`, `toHaveURL` |
| 02 | `02-role-and-text` | `getByRole`, `getByText`, `exact` |
| 03 | `03-labels-and-placeholders` | `getByLabel`, `getByPlaceholder`, `filter`, strict mode |

### ช่วงที่ 2: ลงมือใช้งาน (บท 04-07)

| บท | โฟลเดอร์ | ฝึก |
|---|---|---|
| 04 | `04-click` | `click` |
| 05 | `05-fill-form` | `fill`, `press`, `clear` |
| 06 | `06-checkbox-radio-select` | `check`, `selectOption`, `toBeChecked`, `toBeDisabled` |
| 07 | `07-assertions` | `toBeVisible`, `toBeHidden`, `toHaveCount`, `toHaveText`, `.not` |

### ช่วงที่ 3: ดูผลการทดสอบ (บท 08-10)

| บท | โฟลเดอร์ | ฝึก |
|---|---|---|
| 08 | `08-headed-and-ui-mode` | `--headed`, `--ui`, `-g`, `--project` |
| 09 | `09-report-and-trace` | `pnpm report`, Trace Viewer, `trace: "on"` |
| 10 | `10-codegen-and-debug` | `codegen`, `--debug`, `page.pause()` |

### ช่วงที่ 4: ของที่มาทีหลังและ API (บท 11-13)

| บท | โฟลเดอร์ | ฝึก |
|---|---|---|
| 11 | `11-auto-waiting` | auto-waiting ไม่ใช้ `waitForTimeout` |
| 12 | `12-mock-api` | `page.route`, `route.fulfill`, `waitForRequest` |
| 13 | `13-error-empty-loading` | mock ล้มเหลว (500), รายการว่าง, ตอบช้า |

### ช่วงที่ 5: โปรเจกต์จริง ร้านค้า (บท 14-18)

ตั้งแต่ช่วงนี้ทดสอบแอปร้านค้าที่ `/shop` (สินค้า ตะกร้า login checkout) ใช้ไฟล์ใน `e2e/shop/`

| บท | ไฟล์ | ฝึก |
|---|---|---|
| 14 | `14-describe-and-hooks.spec.ts` | `test.describe`, `beforeEach`, `test.step` |
| 15 | `15-page-object.spec.ts` + `pages/` | Page Object |
| 16 | `16-fixtures.spec.ts` + `fixtures.ts` | `test.extend` |
| 17 | `auth.setup.ts` + `17-login-storagestate.spec.ts` | setup project, `storageState` |
| 18 | `18-full-flow.spec.ts` | เทสทั้ง flow |

## ข้อควรรู้

- คอร์สนี้ไม่ครอบคลุม CI (GitHub Actions), การรันหลายเบราว์เซอร์/แบ่งเครื่อง (sharding), visual snapshot และ component testing ของ Playwright ถ้าเรียนจบแล้วอยากต่อยอด แนะนำให้เริ่มจากสองเรื่องแรก
- แอปร้านค้าเป็นของจำลอง: ไม่มีฐานข้อมูล ตะกร้าเก็บใน `localStorage` และ login ใช้ `demo` / `1234`

## เฉลย

อยู่ที่ branch `solutions` ของเรโปนี้ ลองทำเองก่อนแล้วค่อยเปิดดู
