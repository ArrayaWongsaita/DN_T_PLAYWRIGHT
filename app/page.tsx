import Link from "next/link";
import { lessons, phases, lessonHref } from "@/lib/lessons";

export default function Home() {
  return (
    <main>
      <h1>Playwright + Next.js</h1>
      <p>เลือกบทเรียน แล้วเปิดไฟล์ test ในโฟลเดอร์ e2e/ ของบทนั้น</p>
      {phases.map((name, i) => (
        <section key={name}>
          <h2>{name}</h2>
          <ul>
            {lessons
              .filter((l) => l.phase === i + 1)
              .map((l) => (
                <li key={l.id}>
                  <Link href={lessonHref(l)}>{`${l.id.slice(0, 2)} ${l.title}`}</Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
