interface ResultsPerPageProps {
  onResultsPerpage: (quantity: number) => void;
  currentQuantity: number;
}

export function ResultsPerPage({
  onResultsPerpage,
  currentQuantity,
}: ResultsPerPageProps) {
  return (
    <select
      value={currentQuantity}
      className="bg-slate-600/90 rounded-sm font-semibold text-white py-2 px-4"
      onChange={(e) => onResultsPerpage(Number(e.target.value))}
    >
      <option value="" disabled hidden>
        Mostrar: {currentQuantity}
      </option>
      <option value={20}>Mostrar: 20</option>
      <option value={30}>Mostrar: 30</option>
      <option value={40}>Mostrar: 40</option>
      <option value={50}>Mostrar: 50</option>
    </select>
  );
}
