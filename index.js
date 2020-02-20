const fs = require("fs");
const splitLines = require("split-lines");

const Book = require("./Book");
const Library = require("./Library");

const inputs = ["a_example.txt", "b_read_on.txt", "c_incunabula.txt", "d_tough_choices.txt", "e_so_many_books.txt", "e_so_many_books.txt"];

// for (const input in inputs) {
//   console.log(`Reading ${input}`);
//   main(input);
//   console.log(`Done with ${input}`);
// }

var main = input => {
  const file = fs.readFileSync(`input/${input}`, { encoding: "utf8" });
  const lines = splitLines(file);
  num_books = lines[0].split(" ")[0];
  num_libraries = lines[0].split(" ")[1];
  num_days = lines[0].split(" ")[2];
  var libraries = [];

  var scores = lines[1].split(" ");
  var totalBooks = scores.map((x, i) => {
    return {
      id: i,
      score: x,
      in: {}
    }
  })
  for (var i = 2; i < lines.length; i += 2) {
    var lib = lines[i].split(" ");
    var library = new Library(lib[0], lib[1], lib[2]);
    library.id = libraries.length
    libraries.push(library)
    var libBooks = lines[i+1].split(" ");
    libBooks.forEach(b => {
      totalBooks[b].in[libraries.length-1] = library;
      totalBooks[b].weighted =  totalBooks[b].score / Object.keys(totalBooks[b]).length
      library.add_book(b, totalBooks[b])
      library.score += Number(totalBooks[b].score)
    })

  }
  libraries.forEach(x => {
    x.books = Object.values(x.books).sort((a, b) => b.weighted - a.weighted)
    for(var i of x.books) {
      x.weighted += i.weighted;
    }
  })

  libraries.sort((a, b) => b.weighted - a.weighted)

  return libraries;
};

console.log(main(inputs[0]));
