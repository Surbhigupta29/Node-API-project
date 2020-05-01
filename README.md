# Node-API-project
include nod_modules while giving command npm i and istall all libraries.

This project is related to mainly API building. 
It contains the following api
a) /getInformationJson: API to get record with their name and address together.
b) /addDataInAddress: API to add data entry in address collection with useid and address field.
C) /addDataInInformation: API to add data entry in information table/model with useid, name and address field.
d) /getFilteredJSON: API to Convert the CSV file data to JSON format.
g) /signup: API to register user with certain fields
h) /login: API to authenticate user using email
These api are located in api/routes folder

The database connection is through cloud mongodb atlas and accessed in code via mongoose.
