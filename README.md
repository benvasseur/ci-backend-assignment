# Calm Island Assignment

Calm Island Backend Developer Assignment

## Project setup

```
npm install
```

## Create database

```
npm run create-db
```

## Delete database

```
npm run delete-db
```

### Run locally

```
npm run start
```

### Lints and fixes files

```
npm run lint
```

### Run tests

```
npm run test
```

### Create API docs

```
npm run docs
```

- Then go to <http://localhost:3000/api/docs/> with browser after starting the server

# Report

## 1 - A simple explanation about your setup, and why you made the choices that you did. Why did you choose this architecture.

This project is a Node.js and express.js setup.  
The routes folder contains 2 folders, admin and user, to separate routes based on user role. At the moment admin folder only contains an API to list all users in database. User folder contains routes to signup, login, and a profile route that is only accessible for logged in user.  
The models folder contains user model. It handles all actions to user database.  
I use [Passport.js](http://www.passportjs.org/) and [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) to authenticate user. Strategies folder contains the code to verify and load user data, and attach it to the req object on every routes that use passport middleware. At the moment, only account/profile use it.

## 2 - What are the potential weaknesses in your code? How would you resolve them if this would be going into production?

Before going to production I would add validation of incoming json, using libraries like [Joi](https://www.npmjs.com/package/joi).  
I would also implement an error log like [Sentry](https://sentry.io/) before going to production.

## 3 - What would your next tasks be if you would spend more time on this to improve the code?

If I had more time, I would implement a role system to limit access to admin route to certain user.  
I would also create a error handling middleware to uniform and avoid redundancy in code.

## 4 - Scenario 1 - Imagine that your API was suddenly being targeted with a brute-force attack trying to guess logins and passwords. What various strategies / steps / changes would you make in your code or architecture in response?

To avoid brute force attack, I would add system to limit the consecutive failed attempts for a user and IP. For exemple block the account after 3 consecutive login fail.  
Also adding IP blacklist on server if an IP do more thant 100 failed account a day, for exemple

## 5 - Scenario 2 - Imagine you needed your API to handle millions of requests per second (scale) and have fault tolerance (reliability). What various strategies / steps / changes would you make in your code or architecture in response?

One good solution to scale would be to create multiple instance of the app and using a load balancer to distribute the traffic.  
If the app get bigger than a simple authentication service, dividing the app into micro services would be also a good strategy.
Setting up a cache server for complex request would also be a good idea strategy.
