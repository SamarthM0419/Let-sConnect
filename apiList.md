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
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET user/connections
- GET user/requests
- GET user/feed - Gets you profile of other users of profile

Status : ignored , interested , accepted , rejected
