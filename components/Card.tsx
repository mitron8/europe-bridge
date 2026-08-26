export function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-black rounded p-4 bg-white shadow-sm">
      <h3 className="font-bold mb-2 text-black">{title}</h3>
      <p className="text-black text-sm">{description}</p>
    </div>
  );
}
