import { Entries, Entry } from "../interfaces";

export async function fetchData(): Promise<Entries> {
  try {
    const response = await fetch("/data/sample.json");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    throw new Error("An unknow error ocurred");
  }
}

export function filterByProgramType(
  entries: Entry[],
  type: "series" | "movie"
): Entry[] {
  return entries.filter((entry) => entry.programType === type);
}

export function filterByReleaseYear(
  entries: Entry[],
  minYear: number
): Entry[] {
  return entries.filter((entry) => entry.releaseYear >= minYear);
}

export function sortByTitle(entries: Entry[]): Entry[] {
  return [...entries].sort((a, b) => a.title.localeCompare(b.title));
}

export function getFirstNEntries(entries: Entry[], n: number): Entry[] {
  return entries.slice(0, n);
}
