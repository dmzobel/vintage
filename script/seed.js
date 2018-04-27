const axios = require('axios');
require('../secrets');
const db = require('../server/db');
const { Weather, Quality } = require('../server/db/models');

// async function seed() {
//   await db.sync({ force: true });
//   console.log('db synced!');
//   // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//   // executed until that promise resolves!

//   try {
//     const rainfallRecord = await axios.get(
//       'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=PRCP&stationid=GHCND:FR000007510&units=metric&limit=1000&startdate=2010-10-01&enddate=2017-09-30',
//       { headers: { token: process.env.NOAA_API_TOKEN } }
//     );

//     await Promise.all(
//       rainfallRecord.data.results.map(record => {
//         return Weather.findOrCreate({
//           where: {
//             month: record.date,
//             precip: record.value,
//             region: 'Bordeaux'
//           }
//         });
//       })
//     );
//   } catch (error) {
//     console.log(error);
//   }

//   try {
//     const tempRecord = await axios.get(
//       'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=TAVG&stationid=GHCND:FR000007510&units=metric&limit=1000&startdate=2010-10-01&enddate=2017-09-30',
//       { headers: { token: process.env.NOAA_API_TOKEN } }
//     );

//     await Promise.all(
//       tempRecord.data.results.map(record => {
//         return Weather.findOne({
//           where: {
//             month: record.date,
//             region: 'Bordeaux'
//           }
//         }).then(foundData => foundData.update({ temp: record.value }));
//       })
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }

// // Execute the `seed` function
// // `Async` functions always return a promise, so we can use `catch` to handle any errors
// // that might occur inside of `seed`
// seed()
//   .catch(err => {
//     console.error(err.message);
//     console.error(err.stack);
//     process.exitCode = 1;
//   })
//   .then(() => {
//     console.log('closing db connection');
//     db.close();
//     console.log('db connection closed');
//   });

// /*
//  * note: everything outside of the async function is totally synchronous
//  * The console.log below will occur before any of the logs that occur inside
//  * of the async function
//  */
// console.log('seeding...');

async function createVintage() {
  const records = await Weather.findAll();

  const summaryByYear = {};

  records.forEach(record => {
    createVintageInfo(record, summaryByYear);
  });
  // console.log('summaryByYear', summaryByYear);
}

// helper function to determine the time of year to which the current record pertains
const findTimeOfYear = month => {
  if (month === 10 || month === 11 || month === 12) return 'oct-dec';
  else if (month === 1 || month === 2 || month === 3) return 'jan-mar';
  else if (month === 8 || month === 9) return 'aug-sept';
  else return 'apr-july';
};

// helper function to create the
const createVintageInfo = (record, vintageObj) => {
  let year = +record.month.slice(0, 4);
  const month = +record.month.slice(5, 7);

  if (findTimeOfYear(month) === 'oct-dec') year++;

  if (!vintageObj[year]) {
    vintageObj[year] = { winterRain: 0, harvestRain: 0, summerTemp: [] };
  }

  const vintage = vintageObj[year];
  if (
    findTimeOfYear(month) === 'oct-dec' ||
    findTimeOfYear(month) === 'jan-mar'
  ) {
    if (record.precip) vintage.winterRain += Number(record.precip);
  } else if (findTimeOfYear(month) === 'aug-sept') {
    if (record.precip) vintage.harvestRain += Number(record.precip);
    if (record.temp) vintage.summerTemp.push(Number(record.temp));
  } else {
    if (record.temp) vintage.summerTemp.push(Number(record.temp));
  }
};
