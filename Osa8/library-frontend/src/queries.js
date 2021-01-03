import { gql } from '@apollo/client'
export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    bookCount
    born
  }
}
`
export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`
export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!){
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author { name }
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks { 
    title 
    author {name}
    published 
    genres
  }
}
`
export const ALL_BOOKS_GENRE = gql`
query allBooks($genre: String!) {
  allBooks (genre: $genre) { 
    title 
    author {name}
    published 
  }
}
`
export const LOGIN_USER = gql`
mutation login($username: String!, $password: String!){
  login(
    username: $username,
    password: $password
  ) {
    value
  }
}
`
export const CREATE_USER = gql`
mutation createUser($username: String!, $favoriteGenre: String!){
  createUser(
    username: $username, 
    favoriteGenre: $favoriteGenre
  ) {
    username
  }
}
`
export const ME = gql`
query {
  me {
    username
    favoriteGenre
    id
  }
}
`