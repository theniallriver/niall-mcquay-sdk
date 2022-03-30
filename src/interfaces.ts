export interface Book {
  _id: string;
  name: string;
}

export interface BaseChapter {
  _id: string;
  chapterName: string;
}

export interface ChapterWithBook extends BaseChapter {
  book: string;
}

export interface Movie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

export interface Quote {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
  id: string;
}

export interface Character {
  _id: string;
  height: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  name: string;
  wikiUrl: string;
}

export interface BaseResponse {
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

export interface ListBooksResponse extends BaseResponse {
  docs: Book[];
}

export interface GetBookResponse extends BaseResponse {
  docs: Book[];
}

export interface ListBookChaptersResponse extends BaseResponse {
  docs: BaseChapter[];
}

export interface ListMoviesResponse extends BaseResponse {
  docs: Movie[];
}

export interface GetMovieResponse extends BaseResponse {
  docs: Movie[];
}

export interface GetMovieQuotesResponse extends BaseResponse {
  docs: Quote[];
}

export interface ListCharactersResponse extends BaseResponse {
  docs: Character[];
}

export interface GetCharacterResponse extends BaseResponse {
  docs: Character[];
}

export interface GetCharacterQuotesResponse extends BaseResponse {
  docs: Quote[];
}

export interface ListQuotesResponse extends BaseResponse {
  docs: Quote[];
}

export interface GetQuoteResponse extends BaseResponse {
  docs: Quote[];
}

export interface ListAllChaptersResponse extends BaseResponse {
  docs: ChapterWithBook[];
}

export interface GetChapterResponse extends BaseResponse {
  docs: ChapterWithBook[];
}

export interface QueryOptions<T> {
  sort?: SortConfig<T>;
  filter?: FilterConfig<T>;
}

export interface SortConfig<T> {
  key: keyof Omit<T, '_id'>;
  order: 'asc' | 'desc';
}
export interface FilterConfig<T> {
  key: keyof Omit<T, '_id'>;
  value: string;
}
