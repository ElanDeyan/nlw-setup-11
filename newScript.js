"use strict"

import { objectMap } from "./js/objectMap.js"

const getElement = (selector) => document.querySelector(`${selector}`)

const selectors = {
  forms: {
    habitsGrid: "#form-habits",
  },
  buttons: {
    addDay: ".add-day",
    manageHabits: ".manage-habits",
  },
  containers: {
    habits: ".habits",
  },
  modals: {
    manageHabits: "#addNewHabit",
    buttons: {
      cancel: "#manage-habits button.close",
      register: "#manage-habits button.register",
    },
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

if (elements.containers.habits.hasChildNodes()) {
  nlwSetup = new NLWSetup()
}

elements.buttons.manageHabits.addEventListener("click", () =>
  elements.modals.manageHabits.showModal(),
)

elements.modals.buttons.cancel.addEventListener("click", () =>
  elements.modals.manageHabits.close(),
)
