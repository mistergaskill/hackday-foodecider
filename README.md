# A version of Foodecider made for the APIDays Hackathaon.

## API Specification

### Create a new foodecider session / Initiate add phase
### POST `/`
#### Request Parameters
|argument	|type					|description									|
|-----------|-----------------------|-----------------------------------------------|
|people		|array of [people]()	|A list of people in this session.				|
### Response Object
|field		|type					|description									|
|-----------|-----------------------|-----------------------------------------------|
|sessionID	|string					|The session ID for this foodecider session.	|
|texted		|array of [people]()	|The list of people successfully texted.		|
|failed		|array of [people]()	|The list of people that couldn't be texted.	|

### Get the people and choices for your session.
### GET `/<sesssionID>`
#### Response Object
|field		|type					|description									|
|-----------|-----------------------|-----------------------------------------------|
|people		|array of [people]()	|A list of people in this session.				|
|choices	|array of [choice]()	|A list of restaurant choices in this session.	|
