//Recebendo os dados de Jobs
const Job = require('../model/Job')

//recebendo os dados de Profile
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  async index(req, res) {

    const profile = await Profile.get()

    let statusCount = {
      progress: 0,
      done: 0,
      total: Job.get().length
    }

    //Calculo de Quantidade de horas livres
    let jobTotalHours = 0
    
    //Calculo de tempo restante do JOB
    const updateJobs = Job.get().map((job) => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress' 

      //Forma ternária
      // jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
      if(status == 'progress') {
        jobTotalHours =+ Number(job['daily-hours'])
      }
      
      //Somando a quantidade dos Status
      statusCount[status] += 1

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile['value-hour'])
      }
    })
    
    const freeHours = profile['hours-per-day'] - jobTotalHours
    return res.render('index', { jobs: updateJobs, profile: profile, statusCount, freeHours })
  }
}