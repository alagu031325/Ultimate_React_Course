const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: false,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

//Lecture - Destructuring 
// useful to get some data out of an object or out of an array 
const book = getBook(3)

//can destructure all in one line - but should give exactly the same name as the properties in the retrieved object
const {title,author,pages,genres,publicationDate,hasMovieAdaptation} = book;

console.log(`Title : ${title}, Author : ${author}, Genres : ${genres}`)

//Array destructuring - relies on the order of the element instead of property names
//Will work on genres
//first and second element are assigned
const [primaryGenre, secondaryGenre] = genres; 

console.log(primaryGenre,secondaryGenre)

//Lecture : REST/SPREAD - Operator
//REST - collect all values into an array - used right side of the assignment operator - REST element must be the last element
const [priGenre, secGenre, ...otherGenre] = genres;

console.log(otherGenre)

//SPREAD operator - used in left side of the assignment operator - spreads the values in the array - can also be placed at the end
const copyGenres = [...genres,'Astronomy']

console.log(copyGenres)

//SPREAD with Objects
//to add a new property and create a new object from existing one
//we can also override property values - like pages - if two properties with the same name the second property will override the first one
const updatedBook = {
  ...book,
  moviePublicationDate: "2001-12-19",
  pages:1210
}

console.log(updatedBook)

//Lecture - Template literals - ES 6
//allows to create a string containing any JS expressions/variables - these are replaced with the corresponding values 

const summary = `${title}, a ${pages}-page long book, was written by ${author} and published in ${publicationDate.split('-')[0]}. The book has ${hasMovieAdaptation ? '':'not'} been adapted as a movie`;//splits the string and returns an array
summary

//Lecture - Ternary operator 
//If condition is true the result is the second part of the operator else it is the third part of the operator
//conditionally define a variable 
const result = pages > 1000 ? 'over a thousand' : 'less than 1000';
result

//We cant use if-else stmt within string literals because it doesnt return any value but we can use ternary operators

//Lecture - Arrow functions - useful for one liner functions mainly 

const getYear = (str) => str.split('-')[0]; //automatically returned - but if we use multi line function block then we need to return manually 
console.log(getYear(publicationDate));

//Lecture - Short-circuiting with logical operators ( It immediately returns the first value - without even executing the second value)

//&& - short circuits if first operand is false and immediately returns that value - if all are true then returns the last thruthy value 
console.log(true && 'I am executed')
console.log(false && 'I wont be executed')

console.log(hasMovieAdaptation && 'This book has a movie')
//falsy value : 0, '', null, undefined
console.log('Alagu' && 'This is my name')
console.log(0 && '0 short circuits so I wont be printed')

//OR Operator - short circuits if it sees a true value or returns the last falsy value 
console.log(true || 'I am short circuited')
console.log(false || 'I am not short circuited')
console.log(0 || false || undefined)

//To set default value
const spanishTranslation = book.translations.spanish || 'NOT TRANSLATED'
console.log(spanishTranslation)

//Should be careful while assigning default values
const countWrong = book.reviews.librarything?.reviewsCount || "no value"
countWrong 
//but it has initial value '0' being assigned

//Solution - to use Nullish Coalesing operator ?? , similar to || operator and returns second value only if first value is null or undefined
const count = book.reviews.librarything?.reviewsCount ?? "no value"
console.log(count)

//Lecture - Optional chaining 

function getTotalReviewCount(book){
  //checking if reviews exists and then only checking if goodreads exists
  const goodreads = book.reviews?.goodreads?.reviewsCount;
  //if librarything is not defined then the entire expression becomes undefined so setting default value 
  const librarything = book.reviews?.librarything?.reviewsCount ?? 0;

  return goodreads + librarything;
}

console.log(getTotalReviewCount(book))

//Lecture - The Array Map Method- dont mutate the original array 
const books = getBooks();
books
const titles = books.map(book => book.title)
titles 

/* const essentialData = books.map(book => {
  return {
    title: book.title,
    author: book.author,
  };
}); */
//return object directly 
const essentialData = books.map(book => ({
    title: book.title,
    author: book.author,
    reviewsCount: getTotalReviewCount(book),
  })
);

essentialData

//Lecture - The Array filter Method - return a condition which will either be true or false - we can chain methods since it returns an array 
const longBooksWithMovie = books.filter(book => book.pages > 500)
                .filter((book)=> book.hasMovieAdaptation) //only 3 values passed to another filter method
//only long books will be added to the new array 
longBooksWithMovie

const adventureBooks = books.filter(book => book.genres.includes("adventure")).map(book => book.title)
adventureBooks

//Lecture - The Array Reduce Method - boil down entire array into single value by also taking the current value of the accumulator as input to the function - acc 
const totalPages = books.reduce((sum,book) => sum + book.pages,0)
totalPages

//Lecture - Array sort method - mutates the original array 
//sort array in ascending way we do a - b
const tempArray = [90,8,4,1,10,45,3,88]
tempArray.sort((a,b) =>{
  //console.log(a,b)
   return a - b // positive value -> a comes after b else if neg value returned a comes before b else if both equal original order is preserved
} );
tempArray

//When we dont want to change the original array take a copy 
//sorts in descending order
const sorted = tempArray.slice().sort((a,b) => b-a)
sorted
tempArray
//sorted by pages
const sortedByPages = books.slice().sort((a,b) => a.pages - b.pages);
sortedByPages

//Lecture - Working with Immutable Arrays
//1) Add book object to array without changing the original one 
const newBook = {
  id: 6,
  title: "Harry Potter and the Chamber of Secrets",
  author: "J.K.Rowling",
};

const booksAfterAdd = [...books, newBook];

//2.delete a book object from array
const booksAfterDelete = booksAfterAdd.filter((book) => book.id != 3)
//filtering/deleting the book with id 3 from the array 
booksAfterDelete

//3. Update book object in the array 
const booksAfterUpdate = booksAfterDelete.map((book) => {
  return book.id === 1 ? {...book, pages:333} : book
})
booksAfterUpdate

//Lecture - Asynchronous Javascript : Promises
/* fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json()).then(data => console.log(data))

console.log("Fetch executed in Asynchronous way so you see me first") */

//Lecture - Asynchronous Javascript : Async/Await
async function getTodos(){
  //waits until the res is returned before proceeding further
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();
  console.log(data)
}

getTodos();

console.log(new Date());
console.log(new Date().toLocaleString());
console.log(new Date().toLocaleDateString());
console.log(new Date().toLocaleTimeString());
