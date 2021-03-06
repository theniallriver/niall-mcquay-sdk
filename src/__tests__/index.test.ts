import TheOneSDK from '../index';
import * as dotenv from 'dotenv';

dotenv.config();

const { THE_ONE_API_KEY } = process.env as { THE_ONE_API_KEY: string };

describe('class TheOneSDK', () => {
  const theOneClient = new TheOneSDK(THE_ONE_API_KEY);
  const unauthorizedTheOneClient = new TheOneSDK('');

  const fellowshipOfTheRingBookId = '5cf5805fb53e011a64671582';
  const returnOfTheKingMovieId = '5cd95395de30eff6ebccde5d';
  const gandalfCharacterId = '5cd99d4bde30eff6ebccfea0';
  const lastMarchOfTheEntsQuoteId = '5cd96e05de30eff6ebcceaa3';
  const aLongExpectedPartyChapterId = '6091b6d6d58360f988133b8b';

  describe('#listBooks', () => {
    describe('when calling the listBooks method', () => {
      it('returns a list of all 3 LOTR books', async () => {
        const books = await theOneClient.listBooks();
        expect(books.length).toBe(3);
        books.forEach((book) => {
          expect(book).toHaveProperty('name');
        });
      });
    });
    describe('when calling the listBooks method sorted ascending by name', () => {
      it('returns a list of all 3 LOTR books ascending by name', async () => {
        const books = await theOneClient.listBooks({
          sort: {
            key: 'name',
            order: 'asc'
          }
        });
        expect(JSON.stringify(books)).toBe(
          JSON.stringify([
            {
              _id: '5cf5805fb53e011a64671582',
              name: 'The Fellowship Of The Ring'
            },
            { _id: '5cf58080b53e011a64671584', name: 'The Return Of The King' },
            { _id: '5cf58077b53e011a64671583', name: 'The Two Towers' }
          ])
        );
      });
    });
    describe('when calling the listBooks method and filtering for The Fellowship Of The Ring ', () => {
      it('returns a list of all 3 LOTR books ascending by name', async () => {
        const books = await theOneClient.listBooks({
          filter: {
            key: 'name',
            value: 'The Fellowship Of The Ring'
          }
        });
        expect(JSON.stringify(books)).toBe(
          JSON.stringify([
            {
              _id: '5cf5805fb53e011a64671582',
              name: 'The Fellowship Of The Ring'
            }
          ])
        );
      });
    });
  });

  describe('#getBook', () => {
    describe('when calling the getBook method without a bookId', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await theOneClient.getBook('');
        }).rejects.toThrow();
      });
    });
    describe('when calling the getBook method with a valid bookId', () => {
      it('returns a book with a name property', async () => {
        const book = await theOneClient.getBook(fellowshipOfTheRingBookId);
        expect(book.name).toBeDefined();
      });
    });
  });

  describe('#getBookChapters', () => {
    describe('when calling the getBookChapters method without a bookId', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await theOneClient.listBookChapters('');
        }).rejects.toThrow();
      });
    });
    describe('when calling the getBookChapters method with a valid bookId', () => {
      it('returns a book with expected chapters', async () => {
        const chapters = await theOneClient.listBookChapters(fellowshipOfTheRingBookId);
        chapters.forEach((chapter) => {
          expect(chapter).toHaveProperty('chapterName');
        });
      });
    });
  });

  describe('#listMovies', () => {
    describe('when calling listMovies with an unauthorized SDK', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await unauthorizedTheOneClient.listMovies();
        }).rejects.toThrow();
      });
    });
    describe('when calling listMovies with an authorized SDK', () => {
      it('returns the expected list of movies in expected shape', async () => {
        const movies = await theOneClient.listMovies();
        movies.forEach((chapter) => {
          expect(chapter).toHaveProperty('name');
          expect(chapter).toHaveProperty('runtimeInMinutes');
          expect(chapter).toHaveProperty('budgetInMillions');
          expect(chapter).toHaveProperty('boxOfficeRevenueInMillions');
          expect(chapter).toHaveProperty('academyAwardNominations');
          expect(chapter).toHaveProperty('academyAwardWins');
          expect(chapter).toHaveProperty('rottenTomatoesScore');
        });
      });
    });
  });

  describe('#getMovie', () => {
    describe('when calling the getMovie method without a movieId', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await theOneClient.getMovie('');
        }).rejects.toThrow();
      });
    });
    describe('when calling getMovie with an unauthorized SDK', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await unauthorizedTheOneClient.getMovie(returnOfTheKingMovieId);
        }).rejects.toThrow();
      });
    });
    describe('when calling getMovie with an authorized SDK', () => {
      it('returns the expected movie', async () => {
        const expectedMovie = {
          _id: '5cd95395de30eff6ebccde5d',
          name: 'The Return of the King',
          runtimeInMinutes: 201,
          budgetInMillions: 94,
          boxOfficeRevenueInMillions: 1120,
          academyAwardNominations: 11,
          academyAwardWins: 11,
          rottenTomatoesScore: 95
        };
        const movie = await theOneClient.getMovie(returnOfTheKingMovieId);
        expect(JSON.stringify(movie)).toBe(JSON.stringify(expectedMovie));
      });
    });
  });

  describe('#getMovieQuotes', () => {
    describe('when calling the getMovieQuotes method without a movieId', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await theOneClient.getMovieQuotes('');
        }).rejects.toThrow();
      });
    });
    describe('when calling getMovieQuotes with an unauthorized SDK', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await unauthorizedTheOneClient.getMovieQuotes(returnOfTheKingMovieId);
        }).rejects.toThrow();
      });
    });
    describe('when calling getMovieQuotes with an authorized SDK', () => {
      it('return list of movie quotes with expected structure', async () => {
        const movieQuotes = await theOneClient.getMovieQuotes(returnOfTheKingMovieId);

        movieQuotes.forEach((quote) => {
          expect(quote).toHaveProperty('dialog');
          expect(quote).toHaveProperty('movie');
          expect(quote).toHaveProperty('character');
        });
      });
    });
  });

  describe('#listCharacters', () => {
    describe('when calling listCharacters with an unauthorized SDK', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await unauthorizedTheOneClient.listCharacters();
        }).rejects.toThrow();
      });
    });
    describe('when calling listCharacters with an authorized SDK', () => {
      it('returns the expected list of characters', async () => {
        const movies = await theOneClient.listCharacters();
        expect(movies).toBeDefined;
        expect(movies.length).toBe(933);
      });
    });
  });

  describe('#getCharacter', () => {
    describe('when calling the getCharacter method without a characterId', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await theOneClient.getCharacter('');
        }).rejects.toThrow();
      });
    });
    describe('when calling getCharacter with an unauthorized SDK', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await unauthorizedTheOneClient.getCharacter(gandalfCharacterId);
        }).rejects.toThrow();
      });
    });
    describe('when calling getCharacter with an authorized SDK', () => {
      it('returns the expected character', async () => {
        const expectedCharacter = {
          _id: '5cd99d4bde30eff6ebccfea0',
          height: '',
          race: 'Maiar',
          gender: 'Male',
          birth: 'Before the the Shaping of Arda',
          spouse: '',
          death: 'January 253019 ,Battle of the Peak immortal',
          realm: '',
          hair: 'Grey, later white',
          name: 'Gandalf',
          wikiUrl: 'http://lotr.wikia.com//wiki/Gandalf'
        };
        const character = await theOneClient.getCharacter(gandalfCharacterId);
        expect(JSON.stringify(character)).toBe(JSON.stringify(expectedCharacter));
      });
    });
  });

  describe('#getCharacterQuotes', () => {
    describe('when calling the getCharacterQuotes method without a characterId', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await theOneClient.getCharacterQuotes('');
        }).rejects.toThrow();
      });
    });
    describe('when calling getCharacterQuotes with an unauthorized SDK', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await unauthorizedTheOneClient.getCharacterQuotes(gandalfCharacterId);
        }).rejects.toThrow();
      });
    });
    describe('when calling getCharacterQuotes with an authorized SDK', () => {
      it('return list of character quotes with expected structure', async () => {
        const characterQuotes = await theOneClient.getCharacterQuotes(gandalfCharacterId);

        characterQuotes.forEach((quote) => {
          expect(quote).toHaveProperty('dialog');
          expect(quote).toHaveProperty('movie');
          expect(quote).toHaveProperty('character');
          expect(quote).toHaveProperty('id');
          expect(quote).toHaveProperty('_id');
        });
      });
    });
  });

  describe('#listQuotes', () => {
    describe('when calling listQuotes with an unauthorized SDK', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await unauthorizedTheOneClient.listQuotes();
        }).rejects.toThrow();
      });
    });
    describe('when calling listQuotes with an authorized SDK', () => {
      it('returns the expected list of quotes', async () => {
        const quotes = await theOneClient.listQuotes();
        quotes.forEach((quote) => {
          expect(quote).toHaveProperty('_id');
          expect(quote).toHaveProperty('dialog');
          expect(quote).toHaveProperty('movie');
          expect(quote).toHaveProperty('character');
          expect(quote).toHaveProperty('id');
        });
      });
    });
  });

  describe('#getQuote', () => {
    describe('when calling the getQuote method without a quoteId', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await theOneClient.getQuote('');
        }).rejects.toThrow();
      });
    });
    describe('when calling getQuote with an unauthorized SDK', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await unauthorizedTheOneClient.getQuote(gandalfCharacterId);
        }).rejects.toThrow();
      });
    });
    describe('when calling getQuote with an authorized SDK', () => {
      it('returns the expected quote', async () => {
        const expectedQuote = {
          _id: '5cd96e05de30eff6ebcceaa3',
          dialog:
            'Come, my friends. The Ents are going to war. It is likely......that we go to our doom. Last march......of the Ents.',
          movie: '5cd95395de30eff6ebccde5b',
          character: '5cd9d533844dc4c55e47afed',
          id: '5cd96e05de30eff6ebcceaa3'
        };
        const quote = await theOneClient.getQuote(lastMarchOfTheEntsQuoteId);
        expect(JSON.stringify(quote)).toBe(JSON.stringify(expectedQuote));
      });
    });
  });

  describe('#listAllChapters', () => {
    describe('when calling listAllChapters with an unauthorized SDK', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await unauthorizedTheOneClient.listAllChapters();
        }).rejects.toThrow();
      });
    });
    describe('when calling listAllChapters with an authorized SDK', () => {
      it('returns the expected list of chapters', async () => {
        const quotes = await theOneClient.listAllChapters();
        quotes.forEach((quote) => {
          expect(quote).toHaveProperty('_id');
          expect(quote).toHaveProperty('chapterName');
          expect(quote).toHaveProperty('book');
        });
      });
    });
  });

  describe('#getChapter', () => {
    describe('when calling the getChapter method without a chapterId', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await theOneClient.getChapter('');
        }).rejects.toThrow();
      });
    });
    describe('when calling getChapter with an unauthorized SDK', () => {
      it('throws an error', async () => {
        await expect(async () => {
          await unauthorizedTheOneClient.getChapter(aLongExpectedPartyChapterId);
        }).rejects.toThrow();
      });
    });
    describe('when calling getChapter with an authorized SDK', () => {
      it('returns the expected chapter', async () => {
        const expectedChapter = {
          _id: '6091b6d6d58360f988133b8b',
          chapterName: 'A Long-expected Party',
          book: '5cf5805fb53e011a64671582'
        };
        const chapter = await theOneClient.getChapter(aLongExpectedPartyChapterId);
        expect(JSON.stringify(chapter)).toBe(JSON.stringify(expectedChapter));
      });
    });
  });
});
