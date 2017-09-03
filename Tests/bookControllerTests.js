var should = require('should');
var sinon = require('sinon');

describe('Book Controller Tests',()=>{
	describe('Post',()=>{
	it('should not allow empty title on posts',()=>{
		var Book = (book)=>{
			this.save = ()=>{}
		};

		var req = {
			body : {
				author : 'xyz'
			}
		}

		var res = {
			status : sinon.spy(),
			send : sinon.spy()
		}

		var bookController = require('../controllers/bookController')(Book);
		bookController.post(req,res);
		res.status.calledWith(400).should.equal(true,'Bad Status' + res.status.args[0][0]);
		res.send.calledWith('Title is required').should.equal(true);
	})
})
})