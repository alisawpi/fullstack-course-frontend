import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
// eslint-disable-next-line testing-library/no-dom-import
//import { prettyDOM } from '@testing-library/dom'

// CI=true npm test
describe('<Blog/>', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 0,
    url: 'test url',
    user: {
      id: 'someuserid',
      username: 'test username',
      name: null
    }
  }
  let component
  let likeBlog
  let deleteBlog
  beforeEach(() => {
    likeBlog = jest.fn()
    deleteBlog = jest.fn()
    component = render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <Blog blog={blog} loggedInUser='someuserid' likeBlog={likeBlog} deleteBlog={deleteBlog} />
    )

  })
  test('Intially renders only title and author', () => {
    const detailedDiv = component.container.querySelector('.blogDetails')
    expect(detailedDiv).toBeNull()
  })
  test('reders details when view button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const detailedDiv = component.container.querySelector('.blogDetails')
    expect(detailedDiv).not.toBeNull()
  })
  test('The like button calls the event handler', () => {
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)
    const buttonLike = component.getByText('Like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)
    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
