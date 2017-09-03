var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var agent = request.agent();

//Tests

describe('Book CRUD Test',()=>{
	//Test
	it('Should allow a book to be posted and return _id and read',(done)=>{
		var bookPost = {
			title : 'new Book',
			author : 'xyz',
			genre : 'Fiction'
		};

		agent.post('/api/books')
			.send(bookPost)
			.expect(200)
			.end((err,results)=>{
				results.body.read.should.not.equal(false);
				results.body.should.have.property('_id');
				done();
			})
		})
	afterEach((done)=>{
		Book.remove().exec();
		done();
	});
});