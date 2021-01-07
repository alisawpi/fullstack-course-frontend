import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogFrom from './BlogForm'
// eslint-disable-next-line testing-library/no-dom-import
//import { prettyDOM } from '@testing-library/dom'

describe('<Blogfrom/>', () => {
  let createBlog
  let component
  beforeEach(() => {
    createBlog = jest.fn()
    component = render(
      // eslint-disable-next-line react/react-in-jsx-scope
      < BlogFrom createBlog={createBlog} />
    )
  })

  test('Create blog is called with proper parameters', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const likes = component.container.querySelector('#likes')
    fireEvent.change(title, {
      target: { value: 'new title' }
    })
    fireEvent.change(author, {
      target: { value: 'new author' }
    })
    fireEvent.change(url, {
      target: { value: 'new url' }
    })
    fireEvent.change(likes, {
      target: { value: 3 }
    })
    const form = component.container.querySelector('#createBlog')
    fireEvent.submit(form)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'new title',
      author: 'new author',
      url: 'new url',
      likes: '3'
    })
    expect(createBlog.mock.calls).toHaveLength(1)

  })
})