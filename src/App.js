import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

export default class App extends Component {
  constructor(props){
    super();
    this.state = {
      users : [],
      users_title :[]
    }
  }
  componentDidMount()
  {
    axios.get('https://jsonplaceholder.typicode.com/users')
  .then( (response)=> {
    this.setState({users : response.data})
  })
  }
  userList=()=>{
    return this.state.users.map(urs=>{
    return (<tr user={urs}    key = {urs.id}>
    <td>{urs.id}  </td>
    <td>{urs.name}</td>
    <td><Button onClick={()=>this.getinfo(urs.id)}>View Info</Button></td>
    </tr>
    )
    })
}

  getinfo=(id)=>{
  axios.get('https://jsonplaceholder.typicode.com/posts?userId='+id)
  .then( (response)=> {
    this.setState({users_title : response.data})
   console.log(this.state.users_title);
   document.innerHTML= this.state.users_title ;
  })
}
  render() {
    return (
      <div >
        <Table>
              <thead className="thead-dark">
                <tr>
                  <th>User ID </th>
                  <th>Name</th>
                  <th>More Info</th>
                </tr>
              </thead>
              <tbody>
                {this.userList()}
              </tbody>
            </Table>
      </div>
    )
  }
}

