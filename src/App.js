import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function App() {
  const [data, setdata] = useState([])
  useEffect(() => {
    axios.get("https://northwind.vercel.app/api/suppliers")
      .then(response => {
        setdata(response.data)
      })
  },[])

  const handleData =(e) =>{
    let id = e.target.parentElement.parentElement.firstElementChild.innerText
    axios.delete(`https://northwind.vercel.app/api/suppliers/${id}`)
    e.target.parentElement.parentElement.innerHTML = ""
  }
  return (
    <div className="App">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Contact Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((element) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{element.id}</TableCell>
              <TableCell>{element.companyName}</TableCell>
              <TableCell>{element.contactName}</TableCell>
              <TableCell>{element.address.country}</TableCell>
              <TableCell>
                {
                  <button onClick={handleData}>Delete</button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default App;
