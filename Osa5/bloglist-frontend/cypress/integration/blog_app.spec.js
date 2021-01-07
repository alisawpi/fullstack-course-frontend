/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable indent */
/* eslint-disable no-undef */
describe('Blog app', function() {
	beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'test user',
      username: 'testUser',
      password: 'testpwd'
    }
    const user2 = {
      name: 'test user2',
      username: 'testUser2',
      password: 'testpwd2'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
		cy.visit('http://localhost:3000')
	})

	it('Login from is shown', function() {
		cy.contains('Login')
	})
	it('succeeds with correct credentials', function() {
		cy.get('#username').type('testUser')
		cy.get('#password').type('testpwd')
		cy.get('#login-button').click()
		cy.contains('Blogs')
	})
	it('fails with wrong credentials', function() {
		cy.get('#username').type('someone')
		cy.get('#password').type('wrong')
		cy.get('#login-button').click()
		cy.contains('wrong credentials')
		cy.contains('Login')
  })
  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'testUser', password: 'testpwd'
      }).then(response => {
        window.localStorage.setItem('user', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })
    it('A blog can be created', function() {
      cy.contains('Add a new blog').click()
      cy.get('#title').type('my new title')
      cy.get('#author').type('my new author')
      cy.get('#url').type('my new url')
      cy.get('#likes').type(10)
      cy.get('#submit-blog').click()
      cy.contains('my new title')
    })

    it('A blog can be liked', function() {
      cy.contains('Add a new blog').click()
      cy.get('#title').type('my new title')
      cy.get('#author').type('my new author')
      cy.get('#url').type('my new url')
      cy.get('#likes').type(10)
      cy.get('#submit-blog').click()
      cy.contains('my new title')
      cy.contains('view').click()
      cy.get('.like-button').click()
      cy.contains('Likes: 11')
    })
    it('User can delete their blog', function() {
      cy.contains('Add a new blog').click()
      cy.get('#title').type('my new title')
      cy.get('#author').type('my new author')
      cy.get('#url').type('my new url')
      cy.get('#likes').type(10)
      cy.get('#submit-blog').click()
      cy.contains('my new title')
      cy.contains('view').click()
      cy.get('.DeleteBlog').click()
      cy.get('my new title').should('not.exist')
    })
    //it('User can not delete blogs of others', function(){
  //this is a bonus assignment
    //})
    it('Blogs are displayed in descending like order', function(){
      cy.contains('Add a new blog').click()
      cy.get('#title').type('my new title')
      cy.get('#author').type('my new author')
      cy.get('#url').type('my new url')
      cy.get('#likes').type(10)
      cy.get('#submit-blog').click()
      cy.contains('my new title')
      cy.contains('Add a new blog').click()
      cy.get('#title').type('my new title2')
      cy.get('#author').type('my new author2')
      cy.get('#url').type('my new url2')
      cy.get('#likes').type(20)
      cy.get('#submit-blog').click()
      cy.contains('my new title2')
      cy.contains('view').click()
      cy.contains('view').click()
      cy.get('.blogLikes').then(($p) => {
        const likes = $p.text()
        cy.log(likes)
        const likesAsNumbers = likes.match(/\d+/g)
        cy.log(likesAsNumbers)
        const sorted = likesAsNumbers.sort(function(a, b){return b-a})
        // eslint-disable-next-line jest/valid-expect
        expect(likesAsNumbers).to.deep.equal(sorted)
      })
    })
  })
})