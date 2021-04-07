module.exports = {
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