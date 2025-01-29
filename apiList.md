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

Pagination :

- /feed?page=1&limit=10 => first 10 users => .skip(0) & limit(10)

- /feed?page=2&limit=10 => 11 - 20 users => .skip(10) & limit(10)

- /feed?page=3&limit=10 => 21 - 30 users => .skip(20) & limit(10)

skip() and limit()

Formula:

- skip = (pageNo - 1)\*limit

- pm2 - always runs
- nginx
- nginx proxy pass

# Deployment

- Backend

  - go to AWS machine using ssh
  - clone the project
  - install dependencies
  - allowed EC2 instance public IP on mongoDB server.
  - installed pm2 [npm install pm2 -g]
  - pm2 start npm -- start
  - pm2 logs - to check the logs
  - pm2 list , pm2 flush <name> , pm2 delete <name> , pm2 stop
  - pm2 start npm --name "letsconnect-backend" -- start -> change the name
  - config nginx = /etc/nginx/sites-available/default
  - restart nginx : sudo systemctl restart nginx


- connect both front-end and back-end

  - Front-end = http://16.171.182.161/
  - Back-end = http://16.171.182.161:7777/

  - Domain name = letsconnect.com => 16.171.182.161

  - Front-end = letsconnect.com
  - Back-end = letsconnect.com:7777 => letsconnect.com/api

  - nginx config :
    - server_name 16.171.182.161;


        location /api/ {
    proxy_pass http://localhost:7777/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }
