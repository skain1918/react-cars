import React, { useState, useEffect } from 'react'

function FilterForm({ data, handleFilterData }) {
  const [brands, setBrands] = useState([])
  const [selBrands, setSelBrands] = useState([])
  const [selRegistration, setSelRegistration] = useState('')
  const [criteria, setCriteria] = useState('brand')
  useEffect(() => {
    setBrands(Array.from(new Set(data.map((item) => item.brand))))
  }, [data])
  const handleChange = (e) => {
    const name = e.target.name
    switch (name) {
      case 'reg-filter': {
        setSelRegistration(e.target.value)
        break
      }
      case 'brand-filter': {
        const selOptions = e.target.selectedOptions
        const temp = Array.from(selOptions).map((option) => option.value)
        setSelBrands(temp)
        break
      }
      default:
        break
    }
  }
  const handleReset = () => {
    setSelBrands([])
    handleFilterData(data)
    setSelRegistration('')
  }
  const handleFilter = () => {
    let filtered
    switch (criteria) {
      case 'brand': {
        filtered = data.filter((car) => selBrands.includes(car.brand))
        
        break
      }
      case 'reg': {
        filtered = data.filter((car) => car.reg.indexOf(selRegistration) >= 0)

        break
      }
      default:
        break
    }
    handleFilterData(filtered)
  }
  const handleCriteria = (e) => {
    setCriteria(e.target.value)
  }
  return (
    <fieldset className="form-control">
      <legend>
        <h2>Filtr</h2>
      </legend>
      <div className="mb-2">
        <div>
          <input
            type="radio"
            name="filter-criteria"
            id="brand-criteria"
            value="brand"
            checked={criteria === 'brand'}
            onChange={handleCriteria}
          />{' '}
          <label htmlFor="brand-criteria">Hledání podle značky výrobce</label>
        </div>
        <div>
          <input
            type="radio"
            name="filter-criteria"
            id="reg-criteria"
            value="reg"
            checked={criteria === 'reg'}
            onChange={handleCriteria}
          />{' '}
          <label htmlFor="reg-criteria">Hledání podle registrační značky</label>
        </div>
      </div>

      <div className="mb-2">
        <select
          className="form-select form-select-sm"
          name="brand-filter"
          id="brand-filter"
          multiple
          value={selBrands}
          onChange={handleChange}
          disabled={criteria === 'reg'}
        >
          {brands.map((brand) => (
            <option key={brand}>{brand}</option>
          ))}
        </select>{' '}
      </div>
      <div className="mb-2">
        <input
          type="text"
          name="reg-filter"
          id="reg-filter"
          value={selRegistration}
          onChange={handleChange}
          disabled={criteria === 'brand'}
        />
      </div>
      <div className="mb-2">
        <button className="btn btn-primary btn-sm me-2" onClick={handleFilter}>
          Filtruj
        </button>
        <button className="btn btn-primary btn-sm me-2" onClick={handleReset}>
          Reset
        </button>
      </div>
    </fieldset>
  )
}

export default FilterForm
