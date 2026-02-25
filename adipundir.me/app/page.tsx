import Link from "next/link";
import Image from "next/image";
import { site, nav } from "@/lib/site";
import { FadeIn } from "@/components/fade-in";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:py-20">
      <FadeIn>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {nav.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-foreground underline underline-offset-4 decoration-foreground/70 hover:decoration-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </FadeIn>

      <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-5xl">
        hi i&apos;m aditya.
      </h1>

      <div className="mt-10 space-y-7 text-[1.125rem] leading-[1.8]">
        <FadeIn delay={800}>
          <p>my motto in life has always been this: fuck around and find out.</p>
        </FadeIn>

        <FadeIn delay={1000}>
          <p>
            my dad got me a computer when i was really young. that sparked
            everything. at age 13 i got{" "}
            <Link
              href="https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-foreground/70 hover:decoration-foreground transition-colors"
            >
              CEHv9 certified
            </Link>
            . it&apos;s a cert that teaches you how attackers think so you can
            defend. no one told me to get it. i just wanted to have that
            knowledge. i still use those security principles today. nothing
            wasted.
          </p>
        </FadeIn>

        <FadeIn delay={1200}>
          <p>
            after school i joined a college. didn&apos;t like the crowd.
            didn&apos;t like the vibe. so i left. studied hard for entrance
            exams and got into a better one the next year.
          </p>
        </FadeIn>

        <FadeIn delay={1400}>
          <p>
            first year of college i had my first win. or at least what i
            thought was a win back then. i landed my first internship. it
            didn&apos;t pay much in money. but it paid a lot in knowing what i
            should not be doing for the rest of my college life.
          </p>
        </FadeIn>

        <FadeIn delay={1600}>
          <p>
            then in 2024 i won my first hackathon. an online hack. $170. not
            a lot. but i took that money and straight booked a flight to
            bengaluru. the tech capital of india.
          </p>
        </FadeIn>

        <FadeIn delay={1800}>
          <p>
            that flight changed the track of my life. i met so many goats
            there. it was impossible to not get inspired. impossible to not
            want to build something great. since then i challenge myself to be
            in places i don&apos;t deserve to go. travel. meet new people.
            explore myself. that&apos;s what new experiences teach you.
          </p>
        </FadeIn>

        <FadeIn delay={1900}>
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
            <Image
              src="/Bangalore-flight.png"
              alt="Flight to Bengaluru"
              fill
              className="object-cover object-[50%_30%]"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </FadeIn>

        <FadeIn delay={2000}>
          <p>
            after a lot of failures and never giving up, for me the first big win
            back then was $3k in an online hack in 2025. that&apos;s when it
            clicked. if i never give up it&apos;s impossible to not win.
            anything is possible. like ANYTHING.
          </p>
        </FadeIn>

        <FadeIn delay={2200}>
          <p>
            2025 was a year i&apos;ll never forget. i shipped many products, some worked, many didn&apos;t.
            won hackathon bounties. paid my own college fees. took my first
            international trip. traveled across 15 Indian
            cities. learned to speak spanish. stayed consistent with the gym.
            met some amazing people along the way.
          </p>
        </FadeIn>

        <FadeIn delay={2600}>
          <p>
            entering 2026 with starting my own software{" "}
            <Link
              href="https://donalabs.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-foreground/70 hover:decoration-foreground transition-colors"
            >
              company
            </Link>
            . got a $6k grant from the government of india to help support
            product development. super bullish on the indian ecosystem btw.
          </p>
        </FadeIn>

        <FadeIn delay={2800}>
          <p>
            here i am today.
            <br />
            looking for my next big leap.
            <br />
            never give up. never stop being curious.
          </p>
        </FadeIn>

        <FadeIn delay={3000}>
          <p>
            want to talk? hit me on{" "}
            <Link
              href="https://t.me/adipundir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-foreground/70 hover:decoration-foreground transition-colors"
            >
              telegram
            </Link>{" "}
            or{" "}
            <Link
              href="https://x.com/adipundir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-foreground/70 hover:decoration-foreground transition-colors"
            >
              x
            </Link>
            . i reply to short messages with a clear ask.
          </p>
        </FadeIn>

        <FadeIn delay={3200}>
          <div className="mt-16">
            <div className="relative col-span-2 aspect-[2/1] w-full overflow-hidden rounded-lg">
              <Image
                src="/aditya-japan.png"
                alt="Aditya"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
