#API's

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- PATCH /profile/edit
- GET /profile/view
- PATCH /profile/password

## connectionRequestRouter
{
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
}
 ===> /request/send/:status/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET user/connections
- GET user/requests
- GET user/feed - Gets you profile of other users of profile

 - user should see all the cards
 - Avoid his own card
 - His connections 
 - Ignored cards should not be seen
 - Already sent connection request

Status : ignored , interested , accepted , rejected
