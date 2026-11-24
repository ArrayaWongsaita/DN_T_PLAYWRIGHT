import { BackLink } from "@/components/BackLink";

export const metadata = { title: "Playwright 02 - Role and Text" };

export default function Page() {
  return (
    <main>
      <BackLink />
      <h1>สินค้าแนะนำ</h1>
      <p>ราคา 250 บาท</p>
      <button>เพิ่มลงตะกร้า</button> <button>เพิ่ม</button>
      <p>
        <a href="/">ดูรายละเอียด</a>
      </p>
    </main>
  );
}
