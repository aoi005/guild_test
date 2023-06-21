import { FC } from 'react'
import { useBooks } from '../hooks/useBooks'

export const BookTable: FC = () => {
  const { isLoading, books } = useBooks()
  if (isLoading) return <p>Loading...</p>

  return (
    <ul>
      {books.map((book) => (
        <div key={book.id}>
          <li>{book.id}</li>
          <a>{book.title} {book.author} {book.price}</a>
          
        </div>
      ))}
    </ul>
  )
}