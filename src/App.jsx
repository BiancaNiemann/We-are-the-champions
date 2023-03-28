import { useEffect, useState } from 'react'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


function App() {
  //const [count, setCount] = useState(0)
  const [input, setInput] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [endorsements, setEndorsments] = useState([])

  const appSettings = {
    databaseURL: "https://we-are-the-champions-82fb8-default-rtdb.europe-west1.firebasedatabase.app/"
  }
  const app = initializeApp(appSettings)
  const database = getDatabase(app)
  const endorsmentsInDB = ref(database, "endorsments")

  useEffect(() => {
    onValue(endorsmentsInDB, function (snapshot) {
      if (snapshot.exists()) {
        let endorsmentsArray = Object.entries(snapshot.val())
        setEndorsments(endorsmentsArray.reverse())
      } else {
        setEndorsments([])
      }
    })
  }, [input])


  function handleInputChange(e) {
    setInput(e.target.value)
  }

  function handleFromChange(e) {
    setFrom(e.target.value)
  }

  function handleToChange(e) {
    setTo(e.target.value)
  }

  function submitInputToFirebase() {
    let inputValue = {
      comment: input,
      from: from,
      to: to
    }
    push(endorsmentsInDB, inputValue)
    setInput('')
    setFrom('')
    setTo('')
  }

  function Endorsment(){
    const [count, setCount] = useState(0)
    const appendEndorstmentToList = endorsements.map(item => {
      
      return (
        <div 
          key={item[0]} 
          className="endorsment" 
          >
          <h4 id={item[0]}  onClick={(e) => removeEndorsment(e)}>To {item[1].to}</h4>
          <p>{item[1].comment}</p>
          <div className="last-line">
            <h4>From {item[1].from}</h4>
            <div className="likes">
              <div 
                className="heartLogo" 
                id={`likes-${item[0]}`}
                onClick={() => setCount((count) => count + 1)}
              > 
               ❤
              </div>
              <h4>{count}</h4>
            </div>
          </div>
        </div>
      )
    })
    return appendEndorstmentToList
  }

  function removeEndorsment(e){
    let exactLocationOfEndorsment = ref(database, `endorsments/${e.target.id}`)
    remove(exactLocationOfEndorsment)
  }

  return (
    <main className="container">
      <img src="./assets/freddie.png" alt="img of freddie shadow" />
      <h1>We are the Champions</h1>
      <textarea
        placeholder="Write your endorsment here"
        name="input-element"
        value={input}
        onChange={handleInputChange}
      ></textarea>
      <section className="input-boxes">
        <input
          type="text"
          name="from-element"
          placeholder="From"
          value={from}
          onChange={handleFromChange}
        />
        <input
          type="text"
          name="to-element"
          placeholder="To"
          value={to}
          onChange={handleToChange}
        />
      </section>
      <button
        onClick={submitInputToFirebase}
      >Publish
      </button>
      <h2>- Endorsements -</h2>
      <div className="endorsments-section">
        <div>
          <Endorsment />
        </div>
      </div>
    </main>

  )
}

export default App
