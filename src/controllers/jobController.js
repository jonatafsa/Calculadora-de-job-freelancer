const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {

  create(req, res) {
    return res.render('job')
  },

  save(req, res) {

    const lastID = Job.get()[Job.get().length - 1]?.id || 0

    Job.get().push({
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
    const job = Job.get().find(job => Number(job.id) === Number(jobID))

    if (!job) {
      return res.send('Job Not Found')
    }

    job.budget = JobUtils.calculateBudget(job, Profile.get()['value-hour'])

    return res.render('job-edit', { job })
  },

  update(req, res) {
    const jobID = req.params.id
    const jobs = Job.get()

    const job = jobs.find(job => Number(job.id) === Number(jobID))

    if (!job) {
      return res.send('Job Not Found')
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours']
    }

    const newJobs = Job.get().map(job => {

      if (Number(job.id) === Number(jobID)) {
        job = updatedJob
      }

      return job
    })

    Job.update(newJobs)
    return res.redirect('/job/' + jobID)
  },

  delete(req, res) {
    const jobId = req.params.id
    const deleteJob = Job.get().filter(job => Number(job.id) !== Number(jobId))

    Job.update(deleteJob)
    return res.redirect('/')
  }
}