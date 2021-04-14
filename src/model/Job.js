let data = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    'daily-hours': 2,
    'total-hours': 1,
    createdAt: Date.now(),   //atribuindo uma nova data
    budget: 4500
  },
  {
    id: 2,
    name: 'OneTwo Project',
    'daily-hours': 3,
    'total-hours': 25,
    createdAt: Date.now(), //atribuindo uma nova data
    budget: 4500
  },
]

module.exports = {
  get() {
    return data
  },
  update(newJob) {
    data = newJob
  },
  create(newJob) {
    data.push(newJob)
  }
}