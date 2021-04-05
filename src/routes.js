const express = require('express')

const routes = express()

const views = __dirname + '/views/'


const Profile = {
  data: {
    name: 'Jonata santos',
    avatar: 'https://github.com/jonatafsa.png',
    'monthly-budget': 3000,
    'days-per-week':5,
    'hours-per-day':5,
    'vacation-per-year':4,
    'value-hour': 75
  },

  controllers: {
    index(req, res) {
      return res.render(views + 'profile', { profile: Profile.data })
    },

    update(req, res) {
      //Pegando os dados no Formulário
      const data = req.body

      //Definindo quantidade de meses por ano
      const weeksPerYear = 52

      //Definindo quantidades de meses a serem trabalhadas por mês
      const weeksPerMonth = (weeksPerYear - data['vacations-per-year']) / 12

      //Total de horas a serem trabalhadas na Semana
      const weeksTotalHours = data['hours-per-day'] * data['days-per-week']

      //Total de horas trabalhadas no mes
      const monthlyTotalHours = weeksTotalHours * weeksPerMonth

      //Valor da Hora
      const valueHour = data['monthly-budget'] / monthlyTotalHours

      //defindo valor de retorno
      Profile.data = {
        ...Profile.data,
        ...req.body,
        'value-hour': valueHour
      }

      return res.redirect('/profile')

    }
  }
}

const Job = {

  data: [
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

  ],

  controllers: {
    index(req, res) {
      //Calculo de tempo restante do JOB
      const updateJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
        }
      })

      return res.render(views + 'index', { jobs: updateJobs })
    },

    create(req, res) {
      return res.render(views + 'job')
    },

    save(req, res) {

      const lastID = Job.data[Job.data.length - 1]?.id || 0

      Job.data.push({
        id: lastID + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        createdAt: Date.now()
      })
      return res.redirect('/')
    },

    show(req, res) {

      const jobID = req.params.id
      const job = Job.data.find(job => Number(job.id) === Number(jobID))

      if (!job) {
        return res.send('Job Not Found')
      }

      job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])

      return res.render(views + 'job-edit', { job })
    },

    update(req, res) {
      const jobID = req.params.id
      const job = Job.data.find(job => Number(job.id) === Number(jobID))

      if (!job) {
        return res.send('Job Not Found')
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        'total-hours': req.body['total-hours'],
        'daily-hours': req.body['daily-hours']
      }
      console.log(updatedJob)

      Job.data = Job.data.map(job => {

        if (Number(job.id) === Number(jobID)) {
          job = updatedJob
        }

        return job
      })

      return res.redirect('/job/' + jobID)
    },

    delete(req, res) {
      const jobId = req.params.id
      
      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))
      return res.redirect('/')
    }
  },

  services: {
    remainingDays(job) {
      //Caclculo de tempo restante
      const remainningDays = (job['total-hours'] / job['daily-hours']).toFixed()
      const createdDate = new Date(job.createdAt)
      const deliveryDay = createdDate.getDate() + Number(remainningDays)
      const deliveryDate = createdDate.setDate(deliveryDay)

      const timeDiffInMs = deliveryDate - Date.now()

      //Transformar Milisegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)

      return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job['total-hours']
  }
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.get('/job/:id', Job.controllers.show)
routes.get('/profile', Profile.controllers.index)

routes.post('/job', Job.controllers.save)
routes.post('/job/:id', Job.controllers.update)
routes.post('/profile', Profile.controllers.update)

//Detetando
routes.post('/job/delete/:id', Job.controllers.delete)

module.exports = routes