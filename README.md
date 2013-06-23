# A version of Foodecider made for the APIDays Hackathaon.

## API Specification

### Create a new foodecider session / Initiate add phase
### POST `/`
#### Request Parameters
people: array of people
### Response Object
sessionID: sessionID
texted: array of people
failed: array of people

### Get the people and choices for your session.
### GET `/<sesssionID>`
#### Response Object
people: array of people
choices: array of choices
