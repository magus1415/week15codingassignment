import './App.css';
import { useState } from 'react';
import React from 'react';
import UserProfile from './UserProfile'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

// CRUD - create, read, update, delete
// post, get, put, delete
function App() {

  // our api url endpoint
  const API_URL = 'https://65455e5a5a0b4b04436dfb22.mockapi.io/week15Assignment';

  const [user, setUser] = useState([{}])
  const [newName, setNewName] = useState("")
  const [newCurrentMood, setNewCurrentMood] = useState("")
  const [newFavoriteColor, setNewFavoriteColor] = useState("")
  const [updatedName, setupdatedName] = useState("")
  const [updatedCurrentMood, setupdatedCurrentMood] = useState("")
  const [updatedCompanyName, setupdatedCompanyName] = useState("")



  //using fetch to GET the api and setting state on setUser and displaying in return()
  function readApi() {
    fetch(API_URL)
      .then(resp => resp.json())
      .then(json => {
        console.log("this is data from our fetch/get: ", json);
        setUser(json)
      })
      .catch(json => console.error(json));
  }

  // this will trigger readApi function evertime the page is re-rendered
  // useEffect(() => {
  //   readApi()
  //   console.log('UseEffect being used', user)
  // }, []);

  // deleting that user id passed in
  function deleteUser(id) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(() => readApi())
  }

  // using POST method to create object data in api
  function postNewUser(e) {
    e.preventDefault()
    console.log("This is from postNewUser function: ")
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        name: newName,
        currentMood: newCurrentMood,
        favoriteColor: newFavoriteColor,
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      // this triggers a re - render
      .then(() => readApi())
  }

  // PUT function to update user profile
  function updateUserProfile(e, userProfile) {
    e.preventDefault()
    let updatedUserProfile = {
      ...userProfile,
      name: updatedName,
      currentMood: updatedCurrentMood,
      favoriteColor: updatedCompanyName,
    };
    fetch(`${API_URL}/${userProfile.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUserProfile),
      headers: { "Content-Type": "application/json" }
    })
      // this triggers a re-render
      .then(() => readApi())

  }


  return (
    <>
      <h1 className='App border'>Week15 coding project</h1>

      {/* Use ApiReader component */}
      <UserProfile API_URL={API_URL} setUser={setUser} />

      <form className='App border'>
        <h3 className='border border-top-0 border-end-0 border-start-0  border-2 m-4'>Set profile status </h3>

        <label>Name </label>
        <input placeholder='Name'
          onChange={(e) => setNewName(e.target.value)}></input><br />

        <label>What is your current mood? </label>
        <input
          placeholder='Mood'
          onChange={(e) => setNewCurrentMood(e.target.value)}></input><br />

        <label>What is your favorite color? </label>
        <input
          placeholder='What is your favorite color?'
          onChange={(e) => setNewFavoriteColor(e.target.value)}></input><br />

        <button
          className='btn btn-primary'
          onClick={(e) => postNewUser(e)}>Submit</button><br /><br />
      </form>

      {/* mapping through api data and displaying information with {} */}
      {user.map((data, id) => (
        <div className='App border' key={id}>


          <form>
            <h3 className='border border-top-0 border-end-0 border-start-0  border-2 m-4'>
              Your current status
            </h3>

            <div>
              <p className='text-dark bg-info bg-gradient border border-dark border-2 rounded-3 p-2'>Hello <strong>{data.name}</strong>, you're feeling <strong>{data.currentMood}</strong> and your favorite color is <strong>{data.favoriteColor}</strong>.</p>
            </div>

            <label>Update your status </label>
            <input onChange={(e) => setupdatedName(e.target.value)}></input>
            <br />

            <label>Update Mood </label>
            <input onChange={(e) => setupdatedCurrentMood(e.target.value)}></input>
            <br />

            <label>Update favorite color </label>
            <input onChange={(e) => setupdatedCompanyName(e.target.value)}></input>
            <br />

          </form>

          <div className='center'>
            <button className='btn btn-danger m-2' onClick={() => deleteUser(data.id)}>Delete Status</button>
            <button
              onClick={(e) => updateUserProfile(e, data)}
              className='btn btn-success m-2'>Update Status </button>
          </div>
        </div>
      ))
      }
    </>
  )

}

export default App;
