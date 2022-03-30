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
  GetChapterResponse
} from './interfaces';

export default class TheOneSDK {
  theOneApiUrl = 'https://the-one-api.dev/v2';
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  getAuthHeader() {
    return {
      Authorization: `Bearer ${this.apiKey}`
    };
  }

  async listBooks(): Promise<ListBooksResponse> {
    const response: AxiosResponse<ListBooksResponse> = await axios.get(`${this.theOneApiUrl}/book`);

    return response.data;
  }

  async getBook(bookId: string): Promise<GetBookResponse> {
    if (!bookId) {
      throw Error(`${bookId} is not a valid bookId parameter`);
    }

    const response: AxiosResponse<GetBookResponse> = await axios.get(`${this.theOneApiUrl}/book/${bookId}`);

    return response.data;
  }

  async listBookChapters(bookId: string): Promise<ListBookChaptersResponse> {
    if (!bookId) {
      throw Error(`${bookId} is not a valid bookId parameter`);
    }

    const getBookChaptersUrl = `${this.theOneApiUrl}/book/${bookId}/chapter`;
    const response: AxiosResponse<ListBookChaptersResponse> = await axios.get(getBookChaptersUrl);

    return response.data;
  }

  async listMovies(): Promise<ListMoviesResponse> {
    try {
      const listMoviesUrl = `${this.theOneApiUrl}/movie`;
      const response: AxiosResponse<ListMoviesResponse> = await axios.get(listMoviesUrl, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getMovie(movieId: string): Promise<GetMovieResponse> {
    if (!movieId) {
      throw Error(`${movieId} is not a valid movieId parameter`);
    }

    try {
      const getMovieUrl = `${this.theOneApiUrl}/movie/${movieId}`;
      const response: AxiosResponse<GetMovieResponse> = await axios.get(getMovieUrl, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getMovieQuotes(movieId: string): Promise<GetMovieQuotesResponse> {
    if (!movieId) {
      throw Error(`${movieId} is not a valid movieId parameter`);
    }

    try {
      const getMovieQuotesUrl = `${this.theOneApiUrl}/movie/${movieId}/quote`;
      const response: AxiosResponse<GetMovieQuotesResponse> = await axios.get(getMovieQuotesUrl, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async listCharacters(): Promise<ListCharactersResponse> {
    try {
      const listCharactersUrl = `${this.theOneApiUrl}/character`;
      const response: AxiosResponse<ListCharactersResponse> = await axios.get(listCharactersUrl, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getCharacter(characterId: string): Promise<GetCharacterResponse> {
    if (!characterId) {
      throw Error(`${characterId} is not a valid characterId parameter`);
    }

    try {
      const getCharacterUrl = `${this.theOneApiUrl}/character/${characterId}`;
      const response: AxiosResponse<GetCharacterResponse> = await axios.get(getCharacterUrl, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getCharacterQuotes(characterId: string): Promise<GetCharacterQuotesResponse> {
    if (!characterId) {
      throw Error(`${characterId} is not a valid characterId parameter`);
    }

    try {
      const getCharacterQuotesUrl = `${this.theOneApiUrl}/character/${characterId}/quote`;
      const response: AxiosResponse<GetCharacterQuotesResponse> = await axios.get(getCharacterQuotesUrl, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async listQuotes(): Promise<ListQuotesResponse> {
    try {
      const listQuotesUrl = `${this.theOneApiUrl}/quote`;
      const response: AxiosResponse<ListQuotesResponse> = await axios.get(listQuotesUrl, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getQuote(quoteId: string): Promise<GetQuoteResponse> {
    if (!quoteId) {
      throw Error(`${quoteId} is not a valid quoteId parameter`);
    }

    try {
      const getQuoteUrl = `${this.theOneApiUrl}/quote/${quoteId}`;
      const response: AxiosResponse<GetQuoteResponse> = await axios.get(getQuoteUrl, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async listAllChapters(): Promise<ListAllChaptersResponse> {
    try {
      const listChaptersUrl = `${this.theOneApiUrl}/chapter`;
      const response: AxiosResponse<ListAllChaptersResponse> = await axios.get(listChaptersUrl, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }

  async getChapter(chapterId: string): Promise<GetChapterResponse> {
    if (!chapterId) {
      throw Error(`${chapterId} is not a valid chapterId parameter`);
    }

    try {
      const getChapterUrl = `${this.theOneApiUrl}/chapter/${chapterId}`;
      const response: AxiosResponse<GetChapterResponse> = await axios.get(getChapterUrl, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        throw new Error('Your TheOneSDK api key is unauthorized');
      } else throw e;
    }
  }
}
