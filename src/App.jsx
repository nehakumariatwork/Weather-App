import { useEffect, useState,useRef} from 'react'
import './App.css'
function App() {
  const [text, setText] = useState("")
  const [cloud, setCloud] = useState("")
  const [temperature, setTemperature] = useState("")
  const [wind, setWind] = useState("")
  const [icon, setIcon] = useState("")
  const [countryName, setcCountryName] = useState("")
  const [city, setCity] = useState("palampur")
  const [inputValue, setInputValue] = useState("");
  const inputElement = useRef();


  const dataFetch = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`http://api.weatherapi.com/v1/current.json?key=cf2978fcdd07418ba6b44704233012&q=${city}&aqi=no;`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let current = data.current
          let condition = current.condition
          let location = data.location
          let cloud = current.cloud
          setIcon(condition.icon)
          setcCountryName(location.name)
          setText(condition.text)
          setWind(current.wind_kph)
          setTemperature(current.temp_c)
          return setCloud(cloud)
        })
    });
  }

  useEffect(() => {
    dataFetch()
  }, [])
  const handleChange = (event) => {
    setInputValue(event.target.value); 
  }
  const handleClick = () => {
    dataFetch();
    setCity(inputValue)
    inputElement.current.value = "";
  };


  return (
    <div>
      <h1 className='wedther'>weather-App</h1>
      <div className='box'>
        <input type="text" placeholder='Enter city name'
         onChange={handleChange}defaultValue={inputValue}
         ref={inputElement}/>
        <button onClick={handleClick}>sumit</button>

        <h1> wind {wind}</h1>
        <h1>cloud {cloud}</h1>
        <h1>{temperature}°C</h1>
        <h3 className='text'>{text}</h3>
        <img className='weadther-img' src={icon} />
        <h1 className='couName'>{countryName}</h1>

      </div>
    </div>
  )

}
export default App


