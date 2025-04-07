import { Layout } from "../layout";
import { EntryCard } from "../components/entryCard";
import { FilterByYear } from "../components/filterByYear";
import { ResultsPerPage } from "../components/resultsPerPage";
import { Pagination } from "../components/pagination";
import { useFilteredEntries } from "../hooks/useFilteredEntries";

export default function SeriesPage() {
  const {
    isLoading,
    error,
    paginatedEntries,
    years,
    onSelectedYear,
    onResultsPerPage,
    currentPage,
    totalPages,
    goToPreviousPage,
    goToNextPage,
    onPageChange,
    resultsPerPage,
  } = useFilteredEntries({ programType: "movie" });

  return (
    <Layout title="Popular Series">
      <div className="custom-container my-10">
        <div className="mb-10 flex justify-end items-center gap-10">
          <ResultsPerPage
            onResultsPerpage={onResultsPerPage}
            currentQuantity={resultsPerPage}
          />
          <FilterByYear years={years} onSelectYear={onSelectedYear} />
        </div>

        {isLoading && <p>Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && paginatedEntries && (
          <>
            <div className="relative grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 justify-between gap-x-6 gap-y-18">
              {paginatedEntries.map((entry) => (
                <EntryCard key={entry.title} entry={entry} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={goToPreviousPage}
              onNext={goToNextPage}
              onPageChange={onPageChange}
            />
          </>
        )}
      </div>
    </Layout>
  );
}