const schedule = require('node-schedule');

const notifyGradesJob = schedule.scheduleJob('15 * * * * *', () => {
  console.log('notify-grades-job runs');
});
