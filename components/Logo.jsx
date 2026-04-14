export default function Logo({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32',
  };

  return (
    <div
      className={`flex items-center justify-center transition-transform duration-300 hover:scale-105 ${sizeMap[size]} ${className}`}
      style={{
        filter: 'drop-shadow(0 4px 12px rgba(249, 168, 184, 0.3))',
      }}
    >
      <img
        src="/logo.png"
        alt="Gulabi Guiltz"
        className="h-full w-full object-contain animate-fade-in"
      />
    </div>
  );
}
