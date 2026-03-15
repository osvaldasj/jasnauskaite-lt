interface IGGradientLineProps {
  className?: string;
}

export function IGGradientLine({ className = "" }: IGGradientLineProps) {
  return (
    <div
      className={`ig-gradient-line w-full transition-opacity duration-300 ${className}`}
    />
  );
}
