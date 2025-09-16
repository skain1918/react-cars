import React from 'react'

function UniForm({ data, id, handleNewData, handleUpdate }) {
  //data .. 1 objekt auta
  //id .. pro identifikaci
  //handleNewData .. informace o zmenenem objektu auta nebo o novem ojektu auta
  //handleUpdate .. ta rekne komponente App, co se ma udelat (pridat nove, neo zmenit stavajici)
  const handleChange = (e) => {
    let temp = { ...data }
    const { name, value } = e.target
    switch (name) {
      case `${id}-brand`: {
        temp.brand = value
        break
      }
      case `${id}-model`: {
        temp.model = value
        break
      }
      case `${id}-reg`: {
        temp.reg = value
        break
      }
      case `${id}-km`: {
        temp.km = parseInt(value) || 0
        break
      }
      case `${id}-year`: {
        temp.year = parseInt(value) || 0
        break
      }
      default:
        console.log('bad input')
        break
    }
    handleNewData(temp, id)
  }
  return (
    <div id={id}>
      <div>
        <input
          type="text"
          name={`${id}-brand`}
          id={`${id}-brand`}
          value={data.brand}
          className="form-control"
          onChange={handleChange}
        />
        <label htmlFor={`${id}-brand`} className="form-label">
          Značka
        </label>
      </div>
      <div>
        <input
          type="text"
          name={`${id}-model`}
          id={`${id}-model`}
          value={data.model}
          className="form-control"
          onChange={handleChange}
        />
        <label htmlFor={`${id}-model`} className="form-label">
          Model
        </label>
      </div>
      <div>
        <input
          type="text"
          name={`${id}-reg`}
          id={`${id}-reg`}
          value={data.reg}
          className="form-control"
          onChange={handleChange}
        />
        <label htmlFor={`${id}-reg`} className="form-label">
          RZ
        </label>
      </div>

      <div>
        <input
          type="number"
          name={`${id}-km`}
          id={`${id}-km`}
          value={data.km}
          className="form-control"
          onChange={handleChange}
        />
        <label htmlFor={`${id}-km`} className="form-label">
          Najeto km
        </label>
      </div>
      <div className="mb3">
        <input
          type="number"
          name={`${id}-year`}
          id={`${id}-year`}
          value={data.year}
          className="form-control"
          onChange={handleChange}
        />
        <label htmlFor={`${id}-year`} className="form-label">
          Rok výroby
        </label>
      </div>
      <div>
        <button
          className="btn btn-success me-2"
          onClick={() => handleUpdate(id)}
        >
          Odešli
        </button>
      </div>
      <hr />
    </div>
  )
}

export default UniForm
