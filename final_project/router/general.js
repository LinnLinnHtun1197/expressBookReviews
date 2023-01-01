const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
let getBooks = new Promise((resolve,reject) => {
    public_users.get('/',function (req, res) {
        //Write your code here
        res.send(JSON.stringify(books,null,4));
        //   return res.status(300).json({message: "Yet to be implemented linn"});
    });
    setTimeout(() => {
        resolve("getBooks resolved")
    },6000)
});

getBooks.then((successMessage) => {
    console.log("From Callback " + successMessage)
})

// Get book details based on ISBN
let getBookDetails = new Promise((resolve,reject) => {
    public_users.get('/isbn/:isbn',function (req, res) {
        //Write your code here
        const isbn = req.params.isbn;
        let filtered_book = Object.entries(books).filter(([k, v]) => k == isbn);
        res.send(Object.fromEntries(filtered_book))
        //   return res.status(300).json({message: "Yet to be implemented"});
    });
    setTimeout(() => {
        resolve("getBookDetails resolved")
    },6000)
});

getBookDetails.then((successMessage) => {
    console.log("From Callback " + successMessage)
})
  
// Get book details based on author
let author = new Promise((resolve,reject) => {
    public_users.get('/author/:author',function (req, res) {
        //Write your code here
        const author = req.params.author;
        let filtered_author = Object.entries(books).filter(([k, v]) => v.author == author);
        res.send(Object.fromEntries(filtered_author))
        //   return res.status(300).json({message: "Yet to be implemented"});
    });
    setTimeout(() => {
        resolve("author resolved")
    },6000)
});

author.then((successMessage) => {
    console.log("From Callback " + successMessage)
})

// Get all books based on title
let title = new Promise((resolve,reject) => {
    public_users.get('/title/:title',function (req, res) {
        //Write your code here
        const title = req.params.title;
        let filtered_title = Object.entries(books).filter(([k, v]) => v.title == title);
        res.send(Object.fromEntries(filtered_title))
        //   return res.status(300).json({message: "Yet to be implemented"});
    });
    setTimeout(() => {
        resolve("title resolved")
    },6000)
});

title.then((successMessage) => {
    console.log("From Callback " + successMessage)
})
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_book = Object.entries(books).filter(([k, v]) => k == isbn);
  res.send(Object.fromEntries(filtered_book)[isbn].reviews)
//   return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
