const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {

  create(req, res) {
    return res.render('job')
  },

  async save(req, res) {

    await Job.create({
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      createdAt: Date.now()
    })
    
    return res.redirect('/')
  },

  async show(req, res) {

    const jobs = await Job.get()
    const jobID = req.params.id
    const job = jobs.find(job => Number(job.id) === Number(jobID))

    if (!job) {
      return res.send('Job Not Found')
    }

    job.budget = JobUtils.calculateBudget(job, await Profile.get()['value-hour'])

    return res.render('job-edit', { job })
  },

  async update(req, res) {
    const jobID = req.params.id

    const updatedJob = {
      name: req.body.name,
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours']
    }

    await Job.update(updatedJob, jobID)
    return res.redirect('/job/' + jobID)
  },

  async delete(req, res) {
    const jobId = req.params.id
    await Job.delete(jobId)
    return res.redirect('/')
  }
}