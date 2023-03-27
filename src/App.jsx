import { useEffect, useState } from 'react'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


function App() {
  const [count, setCount] = useState(0)
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
        //clearInput()

        /*for (let i = 0; i < endorsmentsArray.length; i++) {
          let currentItem = endorsmentsArray[i]
          appendEndorstmentToList(currentItem)  
        }
      } else {*/
        //endorsmentsSection.innerHTML = "No endorsments added yet ... - be the first!!"
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
    
  const appendEndorstmentToList = endorsements.forEach(item => {
      return (
        <div>
          <h4>To ${item[1].from}</h4>
          <h3>Test</h3>
        </div>
      )
    })

  return (
    <main className="container">
      <img src="./assets/freddie.png" alt="img of freddie shadow" />
      <h1>We are the Champions</h1>
      <textarea
        id="input-element"
        placeholder="Write your endorsment here"
        name="input-element"
        value={input}
        onChange={handleInputChange}
      ></textarea>
      <section className="input-boxes">
        <input
          type="text"
          id="from-element"
          name="from-element"
          placeholder="From"
          value={from}
          onChange={handleFromChange}
        />
        <input
          type="text"
          id="to-element"
          name="to-element"
          placeholder="To"
          value={to}
          onChange={handleToChange}
        />
      </section>
      <button
        id="publish-button"
        onClick={submitInputToFirebase}
      >Publish
      </button>
      <h2>- Endorsements -</h2>
      <div id="endorsments-section" className="endorsments-section">
        {appendEndorstmentToList}
      </div>
    </main>

  )
}

export default App

/*      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      */