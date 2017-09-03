var bookController = (Book)=>{
  var post = (req,res)=>{
    //Push a specific book to the database
      //Create a new book by tapping the request body
      var book = new Book(req.body);
      //Check if the book has a title
      //if not then 
      if(!req.body.title){
        res.status(400);
        res.send('Title is required');
      }else{
        //if yes
        //Save the book to the db
        book.save();
        res.status(201);
        res.send(book);
      }
  }
  var get = (req,res)=>{
    //Create a query instance
    var query = {};
    //Query for a specific genre book
    if(req.query.genre){
      query.genre = req.query.genre;
    }
    Book.find(query,(err,books)=>{
      if(err){
        res.status(500).send(err);
      }else{
        var returnBooks = [];
      books.forEach((element,index,array)=>{
        var newBook = element.toJSON();
        newBook.links = {};
        newBook.links.self = 'http://' + req.headers.host + '/api/books' + newBook._id;
        returnBooks.push(newBook);
      })
      res.json(returnBooks);
      }
    });
}
return {
  post : post,
  get : get
}

module.exports = bookController;