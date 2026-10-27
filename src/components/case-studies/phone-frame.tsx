import Image from "next/image";

// A plain iPhone 14 Pro drawn in CSS around a vector app screen (393 × 852 pt), so the whole
// device stays crisp at any size. Proportions from the real device: the screen fills all but a
// thin bezel, its corners are 55pt, and the Dynamic Island is 126 × 37pt, 11pt from the top.
const SCREEN = { w: 393, h: 852 };
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function PhoneFrame({ screen, alt, className = "w-[min(300px,70vw)]" }: { screen: string; alt: string; className?: string }) {
  return (
    <div className={`relative mx-auto ${className}`}>
      {/* side buttons: action + volume on the left, power on the right */}
      <span aria-hidden className="absolute top-[17%] -left-[1.2%] h-[4%] w-[1.6%] rounded-l-sm bg-[#2c2c2e]" />
      <span aria-hidden className="absolute top-[25%] -left-[1.2%] h-[7.5%] w-[1.6%] rounded-l-sm bg-[#2c2c2e]" />
      <span aria-hidden className="absolute top-[34%] -left-[1.2%] h-[7.5%] w-[1.6%] rounded-l-sm bg-[#2c2c2e]" />
      <span aria-hidden className="absolute top-[27%] -right-[1.2%] h-[11%] w-[1.6%] rounded-r-sm bg-[#2c2c2e]" />

      {/* body: a dark titanium edge around a black bezel */}
      <div className="relative rounded-[16%/7.4%] bg-[#1c1c1e] p-[3.6%] shadow-[0_30px_60px_-28px_rgba(22,21,20,0.45),inset_0_0_0_1.5px_#3a3a3c]">
        <div
          className="relative overflow-hidden bg-black"
          style={{ aspectRatio: `${SCREEN.w} / ${SCREEN.h}`, borderRadius: `${pct(55, SCREEN.w)} / ${pct(55, SCREEN.h)}` }}
        >
          <Image src={screen} alt={alt} fill unoptimized />
          <span
            aria-hidden
            className="absolute rounded-full bg-black"
            style={{ left: pct((SCREEN.w - 126) / 2, SCREEN.w), top: pct(11, SCREEN.h), width: pct(126, SCREEN.w), height: pct(37, SCREEN.h) }}
          />
        </div>
      </div>
    </div>
  );
}
