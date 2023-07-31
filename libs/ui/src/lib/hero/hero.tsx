interface HeroProps {
  children: React.ReactNode;
}

export function Hero({ children }: HeroProps) {
  return (
    <div className="mx-auto w-full max-w-7xl py-2 text-center lg:py-12 lg:text-left">
      {children}
    </div>
  );
}

export default Hero;
