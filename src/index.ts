import axios, { AxiosResponse } from 'axios';
import {
  ListBookChaptersResponse,
  GetBookResponse,
  ListBooksResponse,
  ListMoviesResponse,
  GetMovieResponse,
  GetMovieQuotesResponse,
  ListCharactersResponse,
  GetCharacterResponse,
  GetCharacterQuotesResponse,
  GetQuoteResponse,
  ListQuotesResponse,
  ListAllChaptersResponse,
  GetChapterResponse,
  Book,
  QueryOptions,
  BaseChapter,
  Character,
  ChapterWithBook,
  Quote,
  Movie
} from './interfaces';

export default class TheOneSDK {
  private theOneApiUrl = 'https://the-one-api.dev/v2';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getAuthHeader() {
    return {
      Authorization: `Bearer ${this.apiKey}`
    };
  }

  private generateQueryParamString<T>(queryOptions?: QueryOptions<T>): string {
    let queryParamString = '';

    if (queryOptions?.sort) {
      queryParamString = queryParamString.concat(`?sort=${queryOptions.sort.key}:${queryOptions.sort.order}`);
    }

    if (queryOptions?.filter) {
      if (queryParamString.length) {
        queryParamString = queryParamString.concat(`&${queryOptions.filter.key}=${queryOptions.filter.value}`);
      } else queryParamString = queryParamString.concat(`?${queryOptions.filter.key}=${queryOptions.filter.value}`);
    }

    return queryParamString;
  }

  async listBooks(queryConfig?: QueryOptions<Book>): Promise<Book[]> {
    const listBooksUrl = `${this.theOneApiUrl}/book${this.generateQueryParamString(queryConfig)}`;
    const response: AxiosResponse<ListBooksResponse> = await axios.get(listBooksUrl);

    return response.data.docs;
  }

  async getBook(bookId: string): Promise<Book> {
    if (!bookId) {
      throw Error(`${bookId} is not a valid bookId parameter`);
    }

    const response: AxiosResponse<GetBookResponse> = await axios.get(`${this.theOneApiUrl}/book/${bookId}`);

    return response.data.docs[0];
  }

  async listBookChapters(bookId: string, queryConfig?: QueryOptions<BaseChapter>): Promise<BaseChapter[]> {
    if (!bookId) {
      throw Error(`${bookId} is not a valid bookId parameter`);
    }

    const getBookChaptersUrl = `${this.theOneApiUrl}/book/${bookId}/chapter${this.generateQueryParamString(
      queryConfig
    )}`;
    const response: AxiosResponse<ListBookChaptersResponse> = await axios.get(getBookChaptersUrl);

    return response.data.docs;
  }

  async listMovies(queryConfig?: QueryOptions<Movie>): Promise<Movie[]> {
    try {
      const listMoviesUrl = `${this.theOneApiUrl}/movie${this.generateQueryParamString(queryConfig)}`;
      const response: AxiosResponse<ListMoviesResponse> = await axios.get(listMoviesUrl, {
        headers: this.getAuthHeader()
      });
      return response.data.docs;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getMovie(movieId: string): Promise<Movie> {
    if (!movieId) {
      throw Error(`${movieId} is not a valid movieId parameter`);
    }

    try {
      const getMovieUrl = `${this.theOneApiUrl}/movie/${movieId}`;
      const response: AxiosResponse<GetMovieResponse> = await axios.get(getMovieUrl, {
        headers: this.getAuthHeader()
      });
      return response.data.docs[0];
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getMovieQuotes(movieId: string): Promise<Quote[]> {
    if (!movieId) {
      throw Error(`${movieId} is not a valid movieId parameter`);
    }

    try {
      const getMovieQuotesUrl = `${this.theOneApiUrl}/movie/${movieId}/quote`;
      const response: AxiosResponse<GetMovieQuotesResponse> = await axios.get(getMovieQuotesUrl, {
        headers: this.getAuthHeader()
      });
      return response.data.docs;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async listCharacters(queryConfig?: QueryOptions<Character>): Promise<Character[]> {
    try {
      const listCharactersUrl = `${this.theOneApiUrl}/character${this.generateQueryParamString(queryConfig)}`;
      const response: AxiosResponse<ListCharactersResponse> = await axios.get(listCharactersUrl, {
        headers: this.getAuthHeader()
      });
      return response.data.docs;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getCharacter(characterId: string): Promise<Character> {
    if (!characterId) {
      throw Error(`${characterId} is not a valid characterId parameter`);
    }

    try {
      const getCharacterUrl = `${this.theOneApiUrl}/character/${characterId}`;
      const response: AxiosResponse<GetCharacterResponse> = await axios.get(getCharacterUrl, {
        headers: this.getAuthHeader()
      });
      return response.data.docs[0];
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getCharacterQuotes(characterId: string): Promise<Quote[]> {
    if (!characterId) {
      throw Error(`${characterId} is not a valid characterId parameter`);
    }

    try {
      const getCharacterQuotesUrl = `${this.theOneApiUrl}/character/${characterId}/quote`;
      const response: AxiosResponse<GetCharacterQuotesResponse> = await axios.get(getCharacterQuotesUrl, {
        headers: this.getAuthHeader()
      });
      return response.data.docs;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async listQuotes(queryConfig?: QueryOptions<Quote>): Promise<Quote[]> {
    try {
      const listQuotesUrl = `${this.theOneApiUrl}/quote${this.generateQueryParamString(queryConfig)}`;
      const response: AxiosResponse<ListQuotesResponse> = await axios.get(listQuotesUrl, {
        headers: this.getAuthHeader()
      });
      return response.data.docs;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getQuote(quoteId: string): Promise<Quote> {
    if (!quoteId) {
      throw Error(`${quoteId} is not a valid quoteId parameter`);
    }

    try {
      const getQuoteUrl = `${this.theOneApiUrl}/quote/${quoteId}`;
      const response: AxiosResponse<GetQuoteResponse> = await axios.get(getQuoteUrl, {
        headers: this.getAuthHeader()
      });
      return response.data.docs[0];
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async listAllChapters(queryConfig?: QueryOptions<ChapterWithBook>): Promise<ChapterWithBook[]> {
    try {
      const listChaptersUrl = `${this.theOneApiUrl}/chapter${this.generateQueryParamString(queryConfig)}`;
      const response: AxiosResponse<ListAllChaptersResponse> = await axios.get(listChaptersUrl, {
        headers: this.getAuthHeader()
      });
      return response.data.docs;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getChapter(chapterId: string): Promise<ChapterWithBook> {
    if (!chapterId) {
      throw Error(`${chapterId} is not a valid chapterId parameter`);
    }

    try {
      const getChapterUrl = `${this.theOneApiUrl}/chapter/${chapterId}`;
      const response: AxiosResponse<GetChapterResponse> = await axios.get(getChapterUrl, {
        headers: this.getAuthHeader()
      });
      return response.data.docs[0];
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }
}
