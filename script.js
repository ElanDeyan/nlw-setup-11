const form = document.querySelector("form")
const addButton = document.querySelector(".add-habit")
const nlwSetup = new NLWSetup(form)

addButton.addEventListener("click", () => {
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
  console.log(nlwSetup.data)
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data))
})

const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) ?? {}

nlwSetup.setData(data)
nlwSetup.load()

// const data = {
//   run: ["01-01", "01-02", "01-06"],
//   water: ["01-01", "01-03", "01-06"],
//   food: ["01-01", "01-04", "01-06"],
//   journal: ["01-03", "01-04", "01-06"],
//   takePills: ["01-01", "01-04", "01-06", "01-07"],
// }
