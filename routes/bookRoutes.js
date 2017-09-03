var express = require('express');
var routes = (Book)=>{
  //Define a router
  var bookRouter = express.Router();
  //Define a controller
  var bookController = require('../controllers/bookController')(Book);
  //Define routes for the route '/'
  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get)
//Middleware
  bookRouter.use('/:bookId',(req,res,next)=>{
    Book.findById(req.params.id,(err,book)=>{
      if(err)
        res.status(500).send(err);
      else if(book){
        //attach the book to the request object
        req.book = book;
        next();
      }else{
        //if no such book
        res.status(404).send('No such book');

      }
    });
  });

  bookRouter.route(':/bookId')
    //GET request to pull a specific book out from the db
      .get((req,res)=>{
          var returnBook = req.book.toJSON();
          returnBook.links = {};
          var newLink = 'http://' + req.headers.host + '/api/books?genre=' + returnBook.genre; 
          returnBook.links.FilterByThisGenre = newLink.replace('','%20');
          res.json(returnBook);
      })

    //PUT request to update a specific book
    .put((req,res)=>{
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;
      //Commit the changes to the db
      req.book.save((err)=>{
        if(err) res.status(500).send(err);
        else{
          res.json(req.book);
        }
      });
    })
    //PATCH request to update a particular key in the item
    .patch((req,res)=>{
      //Grab the specific keys u want to update
      for(var p in req.body){
        req.book[p] = req.body[p];
      }
      //Commit the changes to the db
      req.book.save((err)=>{
        if(err) res.status(500).send(err);
        else{
          res.json(req.book);
        }
      });
   })
    //Remove a specific book
    .delete((req,res)=>{
      req.book.remove((err)=>{
        if(err) res.status(500).send(err);
      else{
          //Status code 204 for successful removal
          res.status(204).send('Removed');
        }
      });
    });
    return bookRouter;
};

module.exports = routes;