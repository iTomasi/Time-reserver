import React, {useState, useEffect} from 'react';
import "./app.scss"

// Components
import Box from "./components/Box";

const App = () => {

  const [hoursList, setHoursList] = useState<any[]>([])

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then(res => res.json())
      .then(res => setHoursList(res.list))
  }, [])

  const clickingHour = (e: any) => {
    if (e.currentTarget.classList.contains("available")) {
      e.currentTarget.classList.remove("available");
      e.currentTarget.classList.add("taken");

      fetch("http://localhost:4000/updating-list/" + e.currentTarget.dataset.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({msg: "available"})
      })
        .then(res => res.json())
        .then(res => setHoursList(res.list))

      if (localStorage.getItem("hourstaken") === null) {
        localStorage.setItem("hourstaken", JSON.stringify([{
          id: e.currentTarget.dataset.id,
          quoteNum: e.currentTarget.dataset.quote
        }]))

        return
      }

      const parseLS = JSON.parse(localStorage.getItem("hourstaken") || "[]");

      localStorage.setItem("hourstaken", JSON.stringify([...parseLS, {
        id: e.currentTarget.dataset.id,
        quoteNum: e.currentTarget.dataset.quote
      }]))
    }

    else if (e.currentTarget.classList.contains("taken")) {
      e.currentTarget.classList.remove("taken");
      e.currentTarget.classList.add("available");

      fetch("http://localhost:4000/updating-list/" + e.currentTarget.dataset.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({msg: "taken"})
      })
        .then(res => res.json())
        .then(res => setHoursList(res.list))

      const parseLS = JSON.parse(localStorage.getItem("hourstaken") || "[]");
      const newArrayLS = parseLS.filter((element: any) => element.id !== e.currentTarget.dataset.id);

      localStorage.setItem("hourstaken", JSON.stringify(newArrayLS))
    }

    else if (e.currentTarget.classList.contains("taken-full")) {
      e.currentTarget.classList.remove("taken-full");
      e.currentTarget.classList.add("available");

      fetch("http://localhost:4000/updating-list/" + e.currentTarget.dataset.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({msg: "taken-full"})
      })
        .then(res => res.json())
        .then(res => setHoursList(res.list))

      const parseLS = JSON.parse(localStorage.getItem("hourstaken") || "[]")
      const newArrayLS = parseLS.filter((element: any) => element.id !== e.currentTarget.dataset.id)
      localStorage.setItem("hourstaken", JSON.stringify(newArrayLS));
    }

    else {
      alert("Sorry there are not quotes availables please try next time.")
    }
  }

  const checkingLocalStorageUser: any = (id: number, quotes: number) => {

    if (localStorage.getItem("hourstaken") === null) {
      if (quotes === 0) return "full"
      return "available"
    }

    const parseLS = JSON.parse(localStorage.getItem("hourstaken") || "[]");
    const checkingHour = parseLS.find((element: any) => element.id == id);

    if (checkingHour === undefined) {
      if (quotes === 0) return "full"
      return "available"
    }

    else {
      if (quotes === 0) return "taken-full"
      return "taken"
    }




    /* if (localStorage.getItem("hourstaken") === null) {
      return "available"
    }
    
    const parseLS = JSON.parse(localStorage.getItem("hourstaken") || "[]")
    const checkingHour: any = parseLS.filter((element: any) => element.id == id)
    
    if (checkingHour[0] !== undefined) {
      if (checkingHour[0].quoteNum === "1") {
        return "taken-full"
      }

      else {
        return "taken"
      }
    }

    else {
      return "available"
    } */
    
  }

  return (
    <div className="content">
      <div className="boxs">{
        hoursList.map((hour: any) => (
          <Box id={hour.id} hour={hour.hour} quotes={hour.quotes} boxState={checkingLocalStorageUser(hour.id, hour.quotes)} onClick={clickingHour}/>
        ))
      }</div>
    </div>
  );
}

export default App;
