import { useState, useEffect } from 'react'
//import rawData from './rawData.json'
import Table from './components/Table'
import FilterForm from './components/FilterForm'
import UniForm from './components/UniForm'
import axios from 'axios'

function App() {
  const [cars, setCars] = useState([])
  const [carsToShow, setCarsToShow] = useState([])
  const [showAdd, setShowAdd] = useState('')
  const [showEdit, setShowEdit] = useState('d-none')
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    reg: '',
    km: '',
    year: '',
  })
  const [carToChange, setCarToChange] = useState({
    id: 0,
    brand: '',
    model: '',
    reg: '',
    km: '',
    year: '',
  })
  const getCars = () =>{
    axios.get('./cars-api/?action=getAll').then((response)=>{
      if(Array.isArray(response.data)){
      setCars(response.data)
      setCarsToShow(response.data);
    }else{
      console.error('Odpoved serveru neni pole.')
    }}).catch((error)=>{
      console.error("There was an error!", error);
      alert(`Chyba ${error}`)
    });
  }
  
  useEffect(() => { getCars(); }, []);
  //Metoda pro nacteni filtrovaneho seznamu aut
  const filterCars = (ids)=>{
     const param = ids.join();
     console.log(param);
     axios.get(`./cars-api/?action=getSpec&ids=${param}`).then((response)=>{
       if (Array.isArray(response.data)){
         setCarsToShow(response.data)}
       else
         {
       console.error("Odpoved serveru neni pole.")
         }
      
     }).catch((error)=>{
       console.error("There was an error!", error)
       alert(`Chyba: ${error}`)
     })
   }
  //metoda pro mazani aut z databaze http DELETE
  const deleteCar = (id) => {
  axios.delete(`./cars-api/${id}`).then((response)=>{
    console.log(response.data)
    getCars();
    alert('Auto úspěšně smazáno.')
  }).catch((error)=>{
    console.error("There was an error!, error")
  })
}
//metoda pro pridani auta do databaze http POST
  const insertCar = (car)=>{
    axios.post('./cars-api/', car).then((response)=>{
    console.log(response.data)
    getCars()
    alert("Auto úspěšně přidáno.")
  }).catch((error)=>{
    console.error("There was an error!", error)
    alert(`Chyba: ${error}`)
  })
}
const updateCar = (car)=>{
  axios.put('./cars-api/', car).then((response)=>{
    console.log(response.data)
    getCars()
    alert("Auto úspěšně aktualizováno.")
  }).catch((error)=>{
    console.error("There was an error!", error)
    alert(`Chyba: ${error}`)
  })
}
   const handleChange = (idToChange) => {
    setShowAdd('d-none')
    setShowEdit('')
    const temp = cars.filter((car) => car.id === idToChange)
    setCarToChange(...temp)
  }
  const handleDelete = (idToDelete) => {
    deleteCar(idToDelete)
  }
  const handleNewData = (updatedCar, source) => {
    switch (source) {
      case 'add-car-form': {
        setNewCar(updatedCar)
        break
      }
      case 'change-car-form': {
        setCarToChange(updatedCar)
        break
      }
      default:
        break
    }
  }
  const fillEmptyInfos = (car) => {
    const filledCar = {
      ...car,
      brand: car.brand.trim() ? car.brand : 'empty',
      model: car.model.trim() ? car.model : 'empty',
      reg: car.reg.trim() ? car.reg : 'empty',
      km: parseInt(car.km) || 0,
      year: parseInt(car.year) || 0,
    }
    return filledCar
  }
  const confirmCar = (car) => {
    return window.confirm(
      'Opravdu chcete odeslat data?\n' +
        `Značka: ${car.brand}\n` +
        `Model: ${car.model}\n` +
        `Reg. značka: ${car.reg}\n` +
        `Kilometry: ${car.km}\n` +
        `Rok výroby: ${car.year}\n`
      )
    }
  const handleUpdate = (source) => {
    let temp
    switch (source) {
      case 'add-car-form': {
        temp = fillEmptyInfos(newCar)
        if (confirmCar(temp)) {
          insertCar(temp)
          setNewCar({
            brand: '',
            model: '',
            reg: '',
            km: '',
            year: '',
          })
          alert('Data byla úspěšně odeslána.')
        } else {
          alert('Odeslání bylo zrušeno.')
        }
        break
      }
      case 'change-car-form': {
        temp = fillEmptyInfos(carToChange)
        if (confirmCar(temp)) {
          const index = cars.findIndex((car) => car.id === temp.id)
          if (index !== -1) {
            updateCar(temp)
            setCarToChange({
            id: 0,
            brand: '',
            model: '',
            reg: '',
            km: '',
            year: '',
          })
          alert("Aktualizace dat úspěšná"); 
          } else {
            alert('Auto s daným id nebylo nalezeno.')
            setCarToChange({
            id: 0,
            brand: '',
            model: '',
            reg: '',
            km: '',
            year: '',
          })
          }

        } else {
          alert('Aktualizace neproběhla.')
        }
        break
      }
      default:
        break
    }
  }
  const handleFilterData = (filteredCars) => {
    const ids = filteredCars.map((car)=>car.id);
    filterCars(ids);
  }
  return (
    <div className="container">
      <h1 className='display-3 text-center'>Garage</h1>
      <FilterForm data={cars} handleFilterData={handleFilterData}></FilterForm>
      <Table
        data={carsToShow}
        handleChange={handleChange}
        handleDelete={handleDelete}
      ></Table>
      <hr />
      <div className={`${showAdd}`}>
        <h2 className="fw-bold">Přidání nového auta</h2>
        <UniForm
          data={newCar}
          id="add-car-form"
          handleNewData={handleNewData}
          handleUpdate={handleUpdate}
        ></UniForm>
      </div>
      <div className={`${showEdit}`}>
        <h2 className="fw-bold">Úprava auta</h2>
        <UniForm
          data={carToChange}
          id="change-car-form"
          handleNewData={handleNewData}
          handleUpdate={handleUpdate}
        ></UniForm>
      </div>
    </div>
  )
}

export default App
