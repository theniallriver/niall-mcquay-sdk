# niall-mcquay-sdk
An SDK for TheOneAPI Code Challenge

## Installation
```npm install niall-mcquay-sdk```
or 
```yarn add niall-mcquay-sdk```


## Usage
To start, you will need access to TheOneAPI via an API Key. You can create one here: https://the-one-api.dev/sign-up.

Import `niall-mcquay-sdk` npm module, and create an instance, providing your api key. 

```ts 
import TheOneSDK from 'niall-mcquay-sdk';
const theOneClient = new TheOneSDK(YOUR_API_KEY)
```

`theOneClient` has our full SDK.

## Documentation

### QueryOptions

QueryOptions is an optional parameter provided for all of our "list" methods.

```ts
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
```

QueryOptions offers some additional flexbility.

`sort` allows you to sort your responses by any property in ascending and descending order.

`filter` allows you to filter responses by any property, given that the value matches the one you provide.
### Methods
All methods are async.
#### listBooks(queryConfig?: QueryOptions)
Returns a list of LOTR books with `_id` and `name`. Takes optional QueryOptions.

#### getBook(bookId)
Returns a book with `_id` and `name`.

#### listBookChapters(bookId, queryConfig?: QueryOptions)
Returns a list of chapters for the given book. Takes optional QueryOptions.

#### listMovies(queryConfig?: QueryOptions)
Returns a list of LOTR movies. Takes optional QueryOptions.

#### getMovie(movieId)
Returns given movie.

#### getMovieQuotes(movieId)
Returns a list of quotes for the given movie.

#### listCharacters(queryConfig?: QueryOptions)
Returns a list of characters. Takes optional QueryOptions.

#### getCharacter(characterId)
Returns requested character

#### getCharacterQuotes(charcterId)
Returns a list of quotes for the given characterId.

#### listQuotes(queryConfig?: QueryOptions)
Returns a list of all LOTR movie quotes. Takes optional QueryOptions.

#### getQuote(quoteId)
Returns requested quote.

#### listAllChapters(queryConfig?: QueryOptions)
Returns a list of all chapters from all LOTR books. Takes optional QueryOptions

#### getChapter(chapterId)
Returns requested chapter.
