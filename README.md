This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Vintage

Based on research by Princeton economist Orley Ashenfelter, who showed the relationship between various climate factors and the quality of Bordeaux wine, this project applies Ashenfelter's Bordeaux equation to various vintages and presents the results in a format accessible to everyday users. Historical climate data is obtained from the NOAA Climate Data Online API.

### Query Strings

#### Bordeaux queries

Rainfall data from October 2007 to September 2016
https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=PRCP&stationid=GHCND:FR000007510&units=metric&limit=1000&startdate=2007-10-01&enddate=2016-09-30

Temperature data from October 2007 to September 2016
https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=TAVG&stationid=GHCND:FR000007510&units=metric&limit=1000&startdate=2007-10-01&enddate=2016-09-30

#### Napa Valley queries

Rainfall data from October 2007 to September 2016
https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=PRCP&stationid=GHCND:USW00093227&units=metric&limit=1000&startdate=2007-10-01&enddate=2016-09-30

Temperature data from October 2007 to September 2016
https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=TAVG&stationid=GHCND:USW00093227&units=metric&limit=1000&startdate=2007-10-01&enddate=2016-09-30
