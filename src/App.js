import { useState, useEffect } from "react";
import PersonCard from "./components/PersonCard";

function App(){

const [name,setName]=useState("")
const [birthdate,setBirthdate]=useState("")

const [people,setPeople]=useState(
JSON.parse(localStorage.getItem("people")) || []
)

const [dark,setDark]=useState(
localStorage.getItem("theme")==="dark"
)

useEffect(()=>{

if(dark){
document.body.classList.add("dark")
localStorage.setItem("theme","dark")
}else{
document.body.classList.remove("dark")
localStorage.setItem("theme","light")
}

},[dark])

useEffect(()=>{
localStorage.setItem("people",JSON.stringify(people))
},[people])

function addPerson(){

if(!name || !birthdate){
alert("Enter name and birthdate")
return
}

setPeople([...people,{name,birthdate}])

setName("")
setBirthdate("")

}

return(

<div>

<div className="theme-toggle">
<button onClick={()=>setDark(!dark)}>
{dark ? "☀️":"🌙"}
</button>
</div>

<div className="container">

<h1>Age Calculator</h1>

<div className="input-section">

<input
type="text"
placeholder="Enter Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="date"
value={birthdate}
onChange={(e)=>setBirthdate(e.target.value)}
/>

<button onClick={addPerson}>Add</button>

</div>

{people.map((person,index)=>(
<PersonCard
key={index}
name={person.name}
birthdate={person.birthdate}
/>
))}

</div>

</div>

)

}

export default App