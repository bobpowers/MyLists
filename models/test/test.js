const Nightmare = require('nightmare')
const assert = require('assert')

var loginUserName = "test" + Math.round(Math.random()*1000000) + "@test.com";

describe('UI Flow Tests', function() {
  this.timeout('60s')

  let nightmare = null
  beforeEach(() => {
    nightmare = new Nightmare({ show: true })
  })

// unsuccessful log in with an unregistered e-mail
  describe('Login Page', function () {
    describe('given bad data', () => {
      it('should fail', done => {
        nightmare
        .goto('https://morning-hamlet-21634.herokuapp.com/signin')
        .on('page', (type, message) => {
          if (type == 'alert') done()
        })
        .type('#signInBlob1', 'not-a-registered-email@test.com')
        .type('#signInBlob2', 'password')
        .click('#signInButton')
        .wait(2000)
        .end()
        .then(function(result) { done() })
        .catch(done)
      })
    })
  })

//   successful log in after creating an account
  describe('Login Page', function () {
    describe('given the data', () => {
      it('should register user', done => {
        nightmare
        .goto('https://morning-hamlet-21634.herokuapp.com/signup')
        .on('page', (type, message) => {
          if (type == 'alert') done()
        })
        // this is to make random test emails per use .type('#signInBlob3', 'test+'+Math.round(Math.random()*1000000)+'@test.com')
        .type('#signInBlob3', loginUserName)
        .type('#signInBlob4', 'ExampleFirst')
        .type('#signInBlob5', 'ExampleLast')
        .type('#signInBlob6', 'supersecretpassword')
        .click('#signInButton')
        .wait(2000)
        .end()
        .then(function(result) { done() })
        .catch(done)
      })
    })
  })

//   testing the app's quick-add, regular add, list add, importance, and deleting functionality 
  describe('Using the App', function () {
    describe('quick-adding and deleting', () => {
      it('should work without timing out', done => {
        nightmare
        .goto('https://morning-hamlet-21634.herokuapp.com/index')
        // add an item example1
        .click('#addToList p')
        .click('#quickaddmodal')
        .type('#quickaddmodal', 'example1')
        .click('#addTask')
        .wait(2000)
        // check and uncheck
        .click('.form-check-input position-static')
        .wait(3000)
        .click('.form-check-input position-static')
        .wait(2000)
        // adding new list
        .click('.addCategory')
        .click('.form-control')
        .type('.form-control', 'listexample')
        .click('#addTask')
        .wait(2000)
        // quick add example2
        .click('#quickAddInput')
        .type('#quickAddInput', 'example2')
        .click('.btn my-2 my-sm-0')
        // testing importance
        .click('.btn btn-sm btn-light dropdown-toggle importance2')
            // dunno if the data-value selecting thing will work..
        .click('.dropdown-item importance [data-value="2"]')
        // log out
        .click('.fa fa-sign-out')
        .wait(2000)
        .end()
        .then(result => { done() })
        .catch(done)
      })
    })
  })

//   testing that items stay on the list for the user even after logging off
  describe('Login Page', function () {
    describe('given good data', () => {
      it('should log back in', done => {
        nightmare
        .goto('https://morning-hamlet-21634.herokuapp.com/signin')
        .on('page', (type, message) => {
          if (type == 'alert') done()
        })
        .type('#signInBlob1', loginUserName)
        .type('#signInBlob2', 'supersecretpassword')
        .click('#signInButton')
        .wait(2000)
        .end()
        .then(function(result) { done() })
        .catch(done)
      })
    })
  })

})