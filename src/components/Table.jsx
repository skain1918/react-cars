import React from "react";

function Table({ data, handleChange, handleDelete }) {
  return (
    <table className="table table-bordered table-striped table-sm text-center">
      <thead className="fw-bold">
        <tr>
          <td>Značka</td>
          <td>Model</td>
          <td>Reg. značka</td>
          <td>Najeto km</td>
          <td>Rok výroby</td>
          <td colSpan="2"></td>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.reg}</td>
              <td>{item.km}</td>
              <td>{item.year}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleChange(item.id)}
                >
                  Edituj
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Smaž
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
