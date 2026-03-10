import {useEffect,useState} from "react"

function getZodiac(day,month){

const signs=[
["Capricorn",19],
["Aquarius",18],
["Pisces",20],
["Aries",19],
["Taurus",20],
["Gemini",20],
["Cancer",22],
["Leo",22],
["Virgo",22],
["Libra",22],
["Scorpio",21],
["Sagittarius",21],
["Capricorn",31]
]

return day>signs[month][1]
? signs[month+1][0]
: signs[month][0]

}

function PersonCard({name,birthdate}){

const [seconds,setSeconds]=useState(0)

const birth=new Date(birthdate)
const today=new Date()

let years=today.getFullYear()-birth.getFullYear()
let months=today.getMonth()-birth.getMonth()
let days=today.getDate()-birth.getDate()

if(days<0){
months--
days+=new Date(today.getFullYear(),today.getMonth(),0).getDate()
}

if(months<0){
years--
months+=12
}

const nextBirthday=
new Date(today.getFullYear(),birth.getMonth(),birth.getDate())

if(nextBirthday<today){
nextBirthday.setFullYear(today.getFullYear()+1)
}

const daysLeft=
Math.ceil((nextBirthday-today)/(1000*60*60*24))

const progress=((365-daysLeft)/365)*100

const zodiac=getZodiac(birth.getDate(),birth.getMonth())

useEffect(()=>{

const interval=setInterval(()=>{

const now=new Date()
const sec=Math.floor((now-birth)/1000)

setSeconds(sec)

},1000)

return()=>clearInterval(interval)

},[birth])

return(

<div className="person">

<h3>{name}</h3>

<div className="age-box">
<span>{years}y</span>
<span>{months}m</span>
<span>{days}d</span>
</div>

<div className="extra-info">

<p>Zodiac: {zodiac}</p>

<p>Next Birthday in {daysLeft} days 🎉</p>

<div className="progress-bar">
<div className="progress" style={{width:progress+"%"}}></div>
</div>

<p className="seconds">
Age in seconds: {seconds.toLocaleString()}
</p>

</div>

</div>

)

}

export default PersonCard