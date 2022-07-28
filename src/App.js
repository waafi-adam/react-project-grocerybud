import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorageItems = () => {
  let items = JSON.parse(localStorage.getItem('lists'))
  if (items) return items
  else return []
}

function App() {
  const [item, setItem] = useState('')
  const [list, setList] = useState(getLocalStorageItems())
  const [isEdit, setEdit] = useState(false)
  const [editId, setEditId] = useState('')
  const [alert, setAlert] = useState({ display: false, color: '', text: '' })

  const handlerSubmit = (e) => {
    e.preventDefault()
    let id = new Date()
    id = id.getTime()
    if (!isEdit && item) {
      setList([...list, { item, id }])
      displayAlert('alert-success', 'item added')
    } else if (isEdit && item) {
      setList((currList) => {
        return currList.map((grocery) => {
          if (grocery.id === editId) grocery.item = item
          return grocery
        })
      })
      displayAlert('alert-success', 'item editted')
    }
    setEdit(false)
    setItem('')
  }

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(list))
  }, [list])

  const removeItem = (id) => {
    const newList = list.filter((grocery) => grocery.id !== id)
    setList(newList)
    setEdit(false)
    setItem('')
    displayAlert('alert-danger', 'item removed')
  }

  const editItem = (editingItem, id) => {
    setItem(editingItem)
    setEditId(id)
    setEdit(true)
  }

  const displayAlert = (color, text) => {
    setAlert({ display: true, color, text })
    setTimeout(() => {
      setAlert({ display: false, color: '', text: '' })
    }, 2000)
  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handlerSubmit}>
        {alert.display && <Alert {...alert} />}
        <h2>grocery bud</h2>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={item}
            onChange={(e) => {
              setItem(e.target.value)
            }}
          />
          <button className='submit-btn'>{isEdit ? 'edit' : 'submit'}</button>
        </div>
      </form>
      {list[0] && (
        <div className='grocery-container'>
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button
            onClick={() => {
              setList([])
              setEdit(false)
              setItem('')
              displayAlert('alert-danger', 'list cleared')
            }}
            className='clear-btn'
          >
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
