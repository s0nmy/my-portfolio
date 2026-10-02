type SectionTitleProps = {
  english: string;
  japanese: string;
  sparkleSide?: "left" | "right";
};

export function SectionTitle({ english, japanese, sparkleSide = "right" }: SectionTitleProps) {
  const sparklePosition = sparkleSide === "left" ? "after:left-[-3.2rem]" : "after:right-[-3.2rem]";

  return (
    <h2
      className={`relative mx-auto mb-16 w-fit text-center after:pointer-events-none after:absolute after:top-[-0.65rem] after:h-10 after:w-10 after:bg-[url('/section-sparkle.svg')] after:bg-contain after:bg-center after:bg-no-repeat after:content-[''] ${sparklePosition}`}
    >
      <span className="mb-2 block font-en text-[2.5rem] font-bold tracking-[0.15em] text-primary-dark max-[768px]:text-[2rem]">
        {english}
      </span>
      <span className="block text-[0.9rem] tracking-[0.2em] text-muted">{japanese}</span>
    </h2>
  );
}
