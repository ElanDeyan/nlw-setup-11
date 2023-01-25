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
        nlwSetup = new NLWSetup()
        console.log("Novo filho criado")
        console.log(nlwSetup.data)
      }
    }
  })
  observer.observe(elements.containers.habits, config)
}

elements?.buttons?.register.addEventListener("click", (e) => {
  e.preventDefault()
  const data = new FormData(elements?.forms?.manageHabits)
  manageHabitsData["habitName"] = data.get("habit-name")
  manageHabitsData["habitIcon"] = data.get("habit-icon")
  habitsContainer.appendChild(addHabit(manageHabitsData))
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
