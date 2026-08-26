export function Button({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`px-4 py-2 rounded bg-black text-white font-medium ${className}`} {...props}>
      {children}
    </button>
  );
}
