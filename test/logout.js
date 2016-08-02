var common = require('./common');
var expect = common.expect;
var request = common.request;
var should = common.should;
var session = common.session;
var chai = common.chai;
var unique_code = '';
var timeout = common.timeout;
var token = ''


module.exports = function() {


	require('./projects.js')(function(tok) {
		token = tok;

	})


	describe('delete website and company and logout routes testing', function() {

		this.timeout(timeout); //increasing req timeout

		it('should test delete website from a company ', function(done) {
			request
				.delete('/company/website?token=' + token)
				.send({
					"website": 'http://www.google.com'

				})
				.end(function(err, res) {
					res.should.have.status(200);
					res.should.be.json;
					expect(res.body.error).to.equal(false);
					expect(res.body.errors).to.equal(null);
					done();
				});

		});
		it('should test delete company method', function(done) {
			request
				.delete('/company?token=' + token)
				.end(function(err, res) {
					res.should.have.status(200);
					res.should.be.json;
					expect(res.body.error).to.equal(false);
					expect(res.body.errors).to.equal(null);
					done();
				});

		});
		it('should test logout method for user', function(done) {
			request
				.delete('/user/session?token=' + token)
				.end(function(err, res) {
					res.should.have.status(200);
					res.should.be.json;
					expect(res.body.error).to.equal(false);
					expect(res.body.errors).to.equal(null);
					done();
				});

		});


	});


}
