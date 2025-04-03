export interface Entries {
    total:   number;
    entries: Entry[];
}

export interface Entry {
    title:       string;
    description: string;
    programType: ProgramType;
    images:      Images;
    releaseYear: number;
}

export interface Images {
    "Poster Art": PosterArt;
}

export interface PosterArt {
    url:    string;
    width:  number;
    height: number;
}

export enum ProgramType {
    Movie = "movie",
    Series = "series",
}
