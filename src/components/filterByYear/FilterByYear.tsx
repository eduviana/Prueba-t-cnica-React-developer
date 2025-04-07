interface FilterByYearProps {
  years: number[];
  onSelectYear: (year: number | null) => void;
}

export function FilterByYear({ years, onSelectYear }: FilterByYearProps) {
  return (
    <select
      data-testid="filter-year-select"
      defaultValue=""
      className="bg-slate-600/90 rounded-sm font-semibold text-white py-2 px-4"
      onChange={(e) =>
        onSelectYear(e.target.value ? Number(e.target.value) : null)
      }
    >
      <option value="" hidden disabled>
        Filtrar por fecha
      </option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
