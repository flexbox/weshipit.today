interface HeroProps {
  children: React.ReactNode;
}

export function Hero({ children }: HeroProps) {
  return (
    <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-72 lg:text-left">
      {children}
    </div>
  );
}

export default Hero;
