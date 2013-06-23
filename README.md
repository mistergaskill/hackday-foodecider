# A version of Foodecider made for the APIDays Hackathaon.

## API Specification

### Create a new foodecider session / Initiate add phase
### POST <API URL>/
#### Request

people: <array of people>
### Response
sessionID: <sessionID>
texted: <array of people>
failed: <array of people>

### Get the people and choices for your session.
### GET <API URL>/<sesssionID>
#### Response
people: <array of people>
choices: <array of choices>
