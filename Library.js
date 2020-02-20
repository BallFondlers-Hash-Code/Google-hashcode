class Library {
  constructor(id, count, bootup, rate) {
    this.id = id;
    this.books = {};
    this.rate = rate;
    this.bootup = bootup;
    this.shared = {};
    this.score = 0 ;
    this.weighted = 0;
    this.booksCount = count;
  }

  add_book = (i, book) => {
    this.books[i] = book
  }


}

module.exports = Library