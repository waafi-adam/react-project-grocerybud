import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ list, removeItem, editItem }) => {
  return (
    <div className='grocery-list'>
      {list.map((grocery) => {
        const { item, id } = grocery
        return (
          <article key={id} className='grocery-item'>
            <p className='title'>{item}</p>
            <div className='btn-container'>
              <button
                className='edit-btn'
                type='button'
                onClick={() => {
                  editItem(item, id)
                }}
              >
                <FaEdit />
              </button>
              <button
                className='delete-btn'
                type='button'
                onClick={() => {
                  removeItem(id)
                }}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
