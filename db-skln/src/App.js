import React from "react";
import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [username, setUsertname] = useState("");
  const [password, setPassword] = useState("");
  const [card, setCard] = useState(0);
  const [address, SetAddress] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState("")
  const getData = async() => {
    try{
      const data = await Axios.get("http://localhost:3001/employees")
      console.log(data.data);
      setDatas(data.data)
    }
    catch(e){
      console.log(e)
    }
  };
  useEffect(() =>{
    getData();
  },[]);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      username: username,
      password: password,
      card: card,
      address: address,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
      username: username,
      password: password,
      card: card,
      address: address,
        },
      ]);
    });
    window.location.reload();
  };



  const deleteD = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
    window.location.reload();
  };
  return (
    <div className="App">
      <div id="form-main">
  <div id="form-div">
    <form class="form" id="form1"> 
      <h2>Information</h2>
      
        <input name="name" type="text" class="validate[required,custom[onlyLetter],length[0,100]] feedback-input" placeholder="Name" id="name" onChange={(event) => {
                setUsertname(event.target.value)
              }}/>
      
      
      
        <input name="email" type="password" class="validate[required,custom[email]] feedback-input" id="email" placeholder="password" onChange={(event) => {
                setPassword(event.target.value)
              }}/>
      
      <input name="email" type="number" class="validate[required,custom[email]] feedback-input" id="email" placeholder="ID card" onChange={(event) => {
                setCard(event.target.value)
              }}/>
      
      
        <textarea name="text" class="validate[required,length[6,300]] feedback-input" id="comment" placeholder="Address" onChange={(event) => {
                SetAddress(event.target.value)
              }}></textarea>
      
      
      
      <div class="submit">
        <button type="submit" id="button-blue" onClick={addEmployee}>Add</button>
        <div class="ease"></div>
      </div>
    
  <div className="datatext">
        
        <div className="outputtext">
        <br></br>
        <br></br>
          <h2>Information Success</h2>
        <table class="table" id="myTable">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Username</th>
              <th scope="col">Password</th>
              <th scope="col">Card</th>
              <th scope="col">Address</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {datas
            .filter((l)=>{
              if(search == ""){
                return l;
              }else if (l.username.toLowerCase().includes(search.toLowerCase())){
                return l;
              }
            })
            .map((l) =>{
              return(
                <tr key={l.id}>
                  <td>{l.id}</td>
                  <td>{l.username}</td>
                  <td>{l.password}</td>
                  <td>{l.card}</td>
                  <td>{l.address}</td>
                  <td><button className="btn" onClick={()=> deleteD(l.id)}>Del</button></td>
                </tr>
                
              )
            })}
          <tbody>
      
      
    </tbody>
        </tbody>
      </table>
      </div>
      </div>
      </form>
  </div>
  </div>
</div>
  );
}

export default App;
