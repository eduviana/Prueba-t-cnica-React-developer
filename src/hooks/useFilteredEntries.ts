import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Entry } from "../interfaces";
import {
  fetchData,
  filterByProgramType,
  filterByReleaseYear,
  sortByTitle,
} from "../lib/dataUtils";

export interface UseFilteredEntriesProps {
  programType: "series" | "movie";
}

export interface UseFilteredEntriesReturn {
  isLoading: boolean;
  error: string | null;
  paginatedEntries: Entry[] | null;
  allFilteredEntries: Entry[];
  years: number[];
  currentPage: number;
  resultsPerPage: number;
  selectedYear: number | null;
  totalPages: number;
  onSelectedYear: (year: number | null) => void;
  onResultsPerPage: (quantity: number) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  onPageChange: (page: number) => void;
}

export function useFilteredEntries({
  programType,
}: UseFilteredEntriesProps): UseFilteredEntriesReturn {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;

  const [paginatedEntries, setPaginatedEntries] = useState<Entry[] | null>(
    null
  );
  const [allFilteredEntries, setAllFilteredEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [resultsPerPage, setResultsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const rawData = await fetchData();
        let processedEntries = rawData.entries;

        processedEntries = filterByProgramType(processedEntries, programType);

        const uniqueYears = [
          ...new Set(processedEntries.map((entry) => entry.releaseYear)),
        ].sort((a, b) => b - a);
        setYears(uniqueYears);

        if (selectedYear) {
          processedEntries = filterByReleaseYear(
            processedEntries,
            selectedYear
          );
        }

        processedEntries = sortByTitle(processedEntries);

        setAllFilteredEntries(processedEntries);

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
  }, [programType, selectedYear, resultsPerPage, currentPage]);

  const onSelectedYear = (year: number | null) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const onResultsPerPage = (quantity: number) => {
    setResultsPerPage(quantity);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(allFilteredEntries.length / resultsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    isLoading,
    error,
    paginatedEntries,
    allFilteredEntries,
    years,
    currentPage,
    resultsPerPage,
    selectedYear,
    totalPages,
    onSelectedYear,
    onResultsPerPage,
    goToPreviousPage,
    goToNextPage,
    onPageChange,
  };
}
