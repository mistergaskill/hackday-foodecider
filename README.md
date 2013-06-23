## A version of Foodecider made for the APIDays Hackathon.

### API Specification

#### Create a new foodecider session / Initiate add phase
#### POST `/`
##### Request Parameters
|argument	|type				|description									|
|-----------|-------------------|-----------------------------------------------|
|people		|[person]() array	|A list of people in this session.				|
##### Response Object
|field		|type				|description									|
|-----------|-------------------|-----------------------------------------------|
|sessionID	|string				|The session ID for this foodecider session.	|
|texted		|[person]() array	|The list of people successfully texted.		|
|failed		|[person]() array	|The list of people that couldn't be texted.	|

#### Get the people in your session.
#### GET `/<sesssionID>/people`
##### Response Object
|field		|type				|description						|
|-----------|-------------------|-----------------------------------|
|people		|[person]() array	|A list of people in this session.	|

#### Get the choices for your session.
#### GET `/<sesssionID>/choices`
##### Response Object
|field		|type			|description									|
|-----------|---------------|-----------------------------------------------|
|choices	|[choice]() array	|A list of restaurant choices in this session.	|

#### Add a choice
#### POST `/<sessionID>/choices`
##### Request Parameters
|argument	|type	|description				|
|-----------|-------|---------------------------|
|name		|string	|Name of the choice to add.	|

#### Remove a choice
#### DELETE `/<sessionID>/choices/<name>`
##### Request Parameters
|argument	|type	|description				|
|-----------|-------|---------------------------|
|name		|string	|Name of the choice to add.	|

#### Set votes and vetoes
##### POST `/<sessionID>/people/<phone>/votes`
|argument	|type		|description						|
|-----------|-----------|-----------------------------------|
|votes		|choiceID	|Array of restaurants to vote for.	|
|vetoes		|choiceID	|Array of restaurants to veto.		|

#### Start voting
##### POST `/<sesssionID>/start`
##### Response Object
|field		|type				|description						|
|-----------|-------------------|-----------------------------------|
|people		|[person]() array	|A list of people in this session.	|

#### End Voting
##### POST `/<sesssionID>/end`
##### Response Object
|field		|type	|description							|
|-----------|---------------|-------------------------------|
|winner		|string	|The name of the winning restaurant.	|

### Model Specification
#### Person Object
|field		|type				|description						|
|-----------|-------------------|-----------------------------------|
|name		|string				|The user's name.					|
|phone		|[phone number]()	|The user's phone number.			|
|voted		|boolean			|Whether or not the user has voted.	|

#### Choice Object
|field		|type				|description						|
|-----------|-------------------|-----------------------------------|
|name		|string				|The restuarants name |
|suggester		|string				|The person's name |

#### Phone Number
A 10 digit string of numeric characters representing a phone number.

[person]: /README.md#person-object
[phone number]: ./README.md#phone-number
