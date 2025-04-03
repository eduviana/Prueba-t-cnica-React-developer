// import { useEffect, useState } from "react";
// import { Layout } from "../layout";
// import { fetchData, filterByProgramType, filterByReleaseYear, getFirstNEntries, sortByTitle } from "../lib/dataUtils";
// import { Entry } from "../interfaces";
// import { EntryCard } from "../components/entryCard";

// export default function Movies() {
//   const [data, setData] = useState<Entry[] | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const rawData = await fetchData();
//         let processedData = rawData.entries;
//         processedData = filterByProgramType(processedData, "movie");
//         processedData = filterByReleaseYear(processedData, 2010);
//         processedData = sortByTitle(processedData)
//         processedData = getFirstNEntries(processedData, 20)
//         setData(processedData); 
//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("An unknown error occurred");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadData();
//   }, []);



//   return (
//     <Layout title="Popular Movies">
//       <div className="custom-container my-10">
//         {isLoading && <p>Cargando...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {!isLoading && !error && data && (
//             <div className="relative grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 justify-between gap-x-6 gap-y-18">
//               {data.map((entry) => (
//                 <EntryCard key={entry.title} entry={entry}/>
//               ))}
//             </div>
//         )}
//       </div>
//     </Layout>
//   );
// }






import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Layout } from "../layout";
import {
  fetchData,
  filterByProgramType,
  filterByReleaseYear,
  sortByTitle,
} from "../lib/dataUtils";
import { Entry } from "../interfaces";
import { EntryCard } from "../components/entryCard";
import { FilterByYear } from "../components/filterByYear";
import { ResultsPerPage } from "../components/resultsPerPage";
import { Pagination } from "../components/pagination";

export default function Series() {
  // Para leer y actualizar los parámetros de búsqueda
  const [searchParams, setSearchParams] = useSearchParams();

  // Extraer el parámetro "page" y usarlo como valor inicial (por defecto 1)
  const initialPage = Number(searchParams.get("page")) || 1;

  // Estado para los datos paginados a mostrar en la página actual
  const [paginatedEntries, setPaginatedEntries] = useState<Entry[] | null>(
    null
  );
  // Estado para guardar todos los datos filtrados (sin paginar)
  const [allFilteredEntries, setAllFilteredEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [resultsPerPage, setResultsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // Actualizar el search param cada vez que currentPage cambie
  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const rawData = await fetchData();
        let processedEntries = rawData.entries;

        // Filtrar solo series
        processedEntries = filterByProgramType(processedEntries, "movie");

        // Extraer años únicos antes de aplicar el filtro por año específico
        const uniqueYears = [
          ...new Set(processedEntries.map((entry) => entry.releaseYear)),
        ].sort((a, b) => b - a);
        setYears(uniqueYears);

        // Filtrar por año si hay uno seleccionado
        if (selectedYear) {
          processedEntries = filterByReleaseYear(
            processedEntries,
            selectedYear
          );
        }

        // Ordenar por título
        processedEntries = sortByTitle(processedEntries);

        // Guardar todos los datos filtrados para calcular el total de páginas
        setAllFilteredEntries(processedEntries);

        // Calcular el subconjunto de datos para la página actual
        const startIndex = (currentPage - 1) * resultsPerPage;
        const currentEntries = processedEntries.slice(
          startIndex,
          startIndex + resultsPerPage
        );
        setPaginatedEntries(currentEntries);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedYear, resultsPerPage, currentPage]);

  // Al cambiar el filtro (año o resultados por página), reiniciamos a la página 1
  const onSelectedYear = (year: number | null) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const onResultsPerpage = (quantity: number) => {
    setResultsPerPage(quantity);
    setCurrentPage(1);
  };

  // Calcular el total de páginas según la cantidad de datos filtrados
  const totalPages = Math.ceil(allFilteredEntries.length / resultsPerPage);

  // Funciones para navegar entre páginas
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Función para cambiar directamente a una página específica
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout title="Popular Series">
      <div className="custom-container my-10">
        <div className="mb-10 flex justify-end items-center gap-10">
          <ResultsPerPage
            onResultsPerpage={onResultsPerpage}
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
