const axios = require('axios');
require('../secrets');
const db = require('../server/db');
const { Weather, Vintage } = require('../server/db/models');

/*
 *
 * SEED FUNCTION FOR THE WEATHER MODEL
 *
 */

// async function seed() {
//   await db.sync({ force: true });
//   console.log('db synced!');
//   // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//   // executed until that promise resolves!

//   try {
//     const bordeauxRain = await axios.get(
//       'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=PRCP&stationid=GHCND:FR000007510&units=metric&limit=1000&startdate=2007-10-01&enddate=2016-09-30',
//       { headers: { token: process.env.NOAA_API_TOKEN } }
//     );

//     await Promise.all(
//       bordeauxRain.data.results.map(record => {
//         return Weather.findOrCreate({
//           where: {
//             month: record.date,
//             precip: record.value,
//             region: 'Bordeaux'
//           }
//         });
//       })
//     );

//     const napaRain = await axios.get(
//       'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=PRCP&stationid=GHCND:USW00093227&units=metric&limit=1000&startdate=2007-10-01&enddate=2016-09-30',
//       { headers: { token: process.env.NOAA_API_TOKEN } }
//     );

//     await Promise.all(
//       napaRain.data.results.map(record => {
//         return Weather.findOrCreate({
//           where: {
//             month: record.date,
//             precip: record.value,
//             region: 'Napa Valley'
//           }
//         });
//       })
//     );
//   } catch (error) {
//     console.log(error);
//   }

//   try {
//     const bordeauxTemp = await axios.get(
//       'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=TAVG&stationid=GHCND:FR000007510&units=metric&limit=1000&startdate=2007-10-01&enddate=2016-09-30',
//       { headers: { token: process.env.NOAA_API_TOKEN } }
//     );

//     await Promise.all(
//       bordeauxTemp.data.results.map(record => {
//         return Weather.findOne({
//           where: {
//             month: record.date,
//             region: 'Bordeaux'
//           }
//         }).then(foundData => foundData.update({ temp: record.value }));
//       })
//     );

//     const napaTemp = await axios.get(
//       'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=TAVG&stationid=GHCND:USW00093227&units=metric&limit=1000&startdate=2007-10-01&enddate=2016-09-30',
//       { headers: { token: process.env.NOAA_API_TOKEN } }
//     );

//     await Promise.all(
//       napaTemp.data.results.map(record => {
//         return Weather.findOne({
//           where: {
//             month: record.date,
//             region: 'Napa Valley'
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
//   .then(() => createVintage())
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

/*
 *
 * SEED FUNCTION FOR THE VINTAGE MODEL
 *
 */

async function createVintage() {
  console.log('seeding quality ratings');
  const recordSummary = {};
  const records = await Weather.findAll();

  records.forEach(record => {
    createVintageInfo(record, recordSummary);
  });

  for (key in recordSummary) {
    const region = recordSummary[key];

    for (key in region) {
      const year = region[key];

      const avgTemp = year.summerTemps.length
        ? year.summerTemps.reduce((a, b) => a + b) / year.summerTemps.length
        : 0;

      const qualityRating = rateWine(
        year.winterRain,
        avgTemp,
        year.harvestRain
      );

      year.tAvg = avgTemp;
      year.quality = qualityRating;
    }
  }

  // console.log(recordSummary);

  try {
    await Promise.all(
      Object.keys(recordSummary).map(key => {
        const regionObj = recordSummary[key];
        const region = key;

        Object.keys(regionObj).map(key => {
          const year = regionObj[key];

          return Vintage.create({
            year: Number(key),
            region: region,
            quality: year.quality,
            WRain: year.winterRain,
            HRain: year.harvestRain,
            TAvg: year.tAvg
          });
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
}

createVintage();

/*
 *
 * HELPER FUNCTIONS
 *
 */

// determines the time of year to which the current record pertains
const findTimeOfYear = month => {
  if (month === 10 || month === 11 || month === 12) return 'oct-dec';
  else if (month === 1 || month === 2 || month === 3) return 'jan-mar';
  else if (month === 8 || month === 9) return 'aug-sept';
  else return 'apr-july';
};

// stores climate info in the correct year's object
const createVintageInfo = (record, masterObj) => {
  if (!masterObj[record.region]) {
    masterObj[record.region] = {};
  }

  const regionObj = masterObj[record.region];

  let year = +record.month.slice(0, 4);
  const month = +record.month.slice(5, 7);

  if (findTimeOfYear(month) === 'oct-dec') year++;

  if (!regionObj[year]) {
    regionObj[year] = {
      winterRain: 0,
      harvestRain: 0,
      summerTemps: []
    };
  }

  const vintage = regionObj[year];
  if (
    findTimeOfYear(month) === 'oct-dec' ||
    findTimeOfYear(month) === 'jan-mar'
  ) {
    if (record.precip) vintage.winterRain += Number(record.precip);
  } else if (findTimeOfYear(month) === 'aug-sept') {
    if (record.precip) vintage.harvestRain += Number(record.precip);
    if (record.temp) vintage.summerTemps.push(Number(record.temp));
  } else {
    if (record.temp) vintage.summerTemps.push(Number(record.temp));
  }
};

const rateWine = (winterRain, avgTemp, harvestRain) => {
  winterCoeff = 0.00117 * winterRain;
  tempCoeff = 0.0614 * avgTemp;
  harvestCoeff = 0.00386 * harvestRain;

  return -12.145 + winterCoeff + tempCoeff - harvestCoeff;
};
