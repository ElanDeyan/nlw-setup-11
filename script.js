"use strict"

import { objectMap } from "./js/objectMap.js"

const getElement = (selector) => document.querySelector(`${selector}`)

const selectors = {
  forms: {
    habitsGrid: "#form-habits",
    manageHabits: "#manage-habits",
  },
  buttons: {
    addDay: ".add-day",
    manageHabits: ".manage-habits",
    cancel: "#manage-habits button.close",
    register: "#manage-habits button.register",
  },
  containers: {
    habits: ".habits",
  },
  modals: {
    manageHabits: "#addNewHabit",
  },
}

const elements = new Object()

for (const [key, value] of Object.entries(selectors)) {
  elements[key] = objectMap(value, (item) => {
    if (typeof item === "object") {
      for (const keyOfItem in item) {
        if (Object.hasOwnProperty.call(item, keyOfItem)) {
          console.log(keyOfItem)
        }
      }
    } else {
      return getElement(`${item}`)
    }
  })
}

let nlwSetup

// if (elements.containers.habits.hasChildNodes()) {
//   nlwSetup = new NLWSetup()
// }

elements?.buttons?.manageHabits.addEventListener("click", () =>
  elements?.modals?.manageHabits.showModal()
)

elements?.buttons?.cancel.addEventListener("click", () =>
  elements.modals.manageHabits.close()
)

window.onload = () => {
  let config = {
    attibutes: true,
    childList: true,
    subtree: true,
  }

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation?.type === "childList") {
        nlwSetup = new NLWSetup(elements?.forms?.habitsGrid)
        console.log("Novo filho criado")
        console.log(nlwSetup.data)
      }
    }
  })
  observer.observe(elements.containers.habits, config)
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

const manageHabitsData = new Object()

elements?.buttons?.register.addEventListener("click", (e) => {
  e.preventDefault()
  const data = new FormData(elements?.forms?.manageHabits)
  manageHabitsData["habitName"] = camelize(data.get("habit-name"))
  manageHabitsData["habitIcon"] = data.get("habit-icon")
  elements?.containers?.habits.appendChild(addHabit(manageHabitsData))
  elements?.forms?.manageHabits.reset()
  elements?.modals?.manageHabits.close()
})

function addHabit(habitData) {
  const newHabit = document.createElement("div")
  newHabit.classList.add("habit")
  newHabit.setAttribute("data-name", `${habitData.habitName}`)
  newHabit.innerText = `${habitData.habitIcon}`
  return newHabit
}

elements?.buttons?.addDay.addEventListener("click", () => {
  if (nlwSetup === undefined) return
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5)
  const dayExists = nlwSetup.dayExists(today)
  if (dayExists) {
    alert("Dia já incluso")
    return
  }
  alert("Dia Adicionado com sucesso")
  nlwSetup.addDay(today)
  nlwSetup.load()
})

elements?.forms?.habitsGrid.addEventListener("change", () => {
  console.log(nlwSetup.data)
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data))
  const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) ?? {}
  nlwSetup.setData(data)
  console.log(nlwSetup.data)
})

if(nlwSetup !== undefined) nlwSetup.load()
