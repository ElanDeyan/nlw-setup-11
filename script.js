"use strict"

const form = document.querySelector("#form-habits")
const addDayButton = document.querySelector(".add-day")
const habitsContainer = document.querySelector(".habits")
if (habitsContainer.hasChildNodes()) {
  let nlwSetup = new NLWSetup()
}
const manageHabitsSelectors = {
  button: {
    selector: ".manage-habits",
  },
  modal: {
    selector: "#addNewHabit",
  },
  form: {
    selector: "#manage-habits",
  },
  cancelButton: {
    selector: "#manage-habits button.close",
  },
  createButton: {
    selector: "#manage-habits button.register",
  },
}

const manageHabitsElements = new Object()

for (const elem in manageHabitsSelectors) {
  manageHabitsElements[`${elem}`] = document.querySelector(
    manageHabitsSelectors[elem]["selector"],
  )
}

manageHabitsElements["button"].addEventListener("click", () =>
  manageHabitsElements["modal"].showModal(),
)

manageHabitsElements["cancelButton"].addEventListener("click", () =>
  manageHabitsElements["modal"].close(),
)

const manageHabitsData = new Object()

manageHabitsElements["createButton"].addEventListener("click", (e) => {
  e.preventDefault()
  const data = new FormData(manageHabitsElements["form"])
  manageHabitsData["habitName"] = data.get("habit-name")
  manageHabitsData["habitIcon"] = data.get("habit-icon")
  habitsContainer.appendChild(addHabit(manageHabitsData))
  nlwSetup = new NLWSetup()
  console.log(nlwSetup.data)
  manageHabitsElements["form"].reset()
  manageHabitsElements["modal"].close()
})

function addHabit(habitData) {
  const newHabit = document.createElement("div")
  newHabit.classList.add("habit")
  newHabit.setAttribute("data-name", `${habitData.habitName}`)
  newHabit.innerText = `${habitData.habitIcon}`
  return newHabit
}

addDayButton.addEventListener("click", () => {
  if (nlwSetup === undefined) return
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5)
  const dayExists = nlwSetup.dayExists(today)
  if (dayExists) {
    alert("Dia já incluso")
    return
  }
  alert("Dia Adicionado com sucesso")
  nlwSetup.addDay(today)
})

form.addEventListener("change", () => {
  if (nlwSetup === undefined) return
  console.log(nlwSetup.data)
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data))
})

function habitsLoad() {
  if (nlwSetup === undefined) return
  const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) ?? {}

  nlwSetup.setData(data)
  nlwSetup.load()
}

if (localStorage.getItem("NLWSetup@habits") !== null) {
  habitsLoad()
} else {
  localStorage.setItem("NLWSetup@habits", nlwSetup.data)
  habitsLoad()
}
