import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS_GENRE, ME } from '../queries'

const Recommended = ({ show }) => {
  let user = useQuery(ME)
  let [getRecommended, resultRec] = useLazyQuery(ALL_BOOKS_GENRE)
  useEffect(() => {
    console.log('effect')
    if (show && user.data && user.data.me) {
      let genre = user.data.me.favoriteGenre
      getRecommended({ variables: { genre } })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.data, show])
  if (!show || !resultRec.data) {
    return null
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {resultRec.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended