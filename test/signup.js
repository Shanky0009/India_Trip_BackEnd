var common = require('./common');
var expect = common.expect;
var request = common.request;
var should = common.should;
var session = common.session;
var chai = common.chai;
var unique_code = '';
var token = '';
var timeout = common.timeout;
var email_id = 'admin';
var password = 'password';
var userid = '';
var ucode = '';

module.exports = function() {

    describe('signup routes testing', function() {

        this.timeout(timeout); //increasing req timeout

        it('should test signup method for user', function(done) {
            request
                .post('/user')
                .send({
                    "firstname": 'test',
                    "lastname": 'user',
                    "email_id": email_id,
                    "password": password
                })
                .end(function(err, res) {
                    userid = res.body.data.userid;
                    token = res.body.data.token;
                    res.should.have.status(200);
                    res.should.be.json;
                    expect(res.body.error).to.equal(false);
                    expect(res.body.errors).to.equal(null);
                    done();
                });

        });

        it('should test resend verification method for user', function(done) {
            request
                .post('/user/resend?token=' + token)

            .end(function(err, res) {

                unique_code = res.body.data.unique_code;
                res.should.have.status(200);
                res.should.be.json;
                expect(res.body.error).to.equal(false);
                expect(res.body.errors).to.equal(null);
                done();

            });

        });
        it('should test verification method for user', function(done) {
            request
                .put('/user')
                .send({
                    "unique_code": unique_code
                })
                .end(function(err, res) {


                    res.should.have.status(200);
                    res.should.be.json;
                    expect(res.body.error).to.equal(false);
                    expect(res.body.errors).to.equal(null);
                    done();

                });

        });
        it('should test forgotPassword method for user', function(done) {
            request
                .post('/user/' + userid + '/resetpassword')
                .send({
                    "email_id": email_id
                })
                .end(function(err, res) {
                    ucode = res.body.data.user.unique_code;
                    res.should.have.status(200);
                    res.should.be.json;
                    expect(res.body.error).to.equal(false);
                    expect(res.body.errors).to.equal(null);
                    done();
                });

        });
        it('should test create password method for user', function(done) {
            request
                .put('/user/' + userid + '/resetpassword')
                .send({
                    "unique_code": ucode,
                    "email_id": email_id,
                    "password": "graphed.api",
                    "confirm_password": "graphed.api"
                })
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