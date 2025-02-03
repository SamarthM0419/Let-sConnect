# Scheduling cron jobs = send emails to everyone who has recieved friend requests yesterday.

- npm cron-node
- npm date-fns 
- Schedule a job
- Find all the unique emailswho have got connection requests in previous day
- send emails

- Advance technique : Queing , batching , npm bee-queue 


# WebSockets
- Build the UI for chat window - /chat/:targetUserId
- setup socket.io in backend
- npm i socket.io
- configuration on back-end
- client side configuartion

- Whenever there is a socket connection, we need to create a room. I has a room _id and can have   multiple participants in the room.


- Steps involed during web socket connection:
 
  # BackEnd and FrontEnd
  - initialize the socket
  - Establish connection - BE
  - join the room - FE
  - create secretRoom and let users join the room - BE
  - send the message - FE , BE
  - Disconnect the connection


 # Payment Gateway Integration - RazorPay
 

