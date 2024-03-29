## Serialized Node.js Todo example

An example application showcasing the basic usage of the Event Sourcing API and the Projection API of Serialized. 

This example uses the official [Serialized Javascript client](https://github.com/serialized-io/client-js)

- Register for a free account at [https://serialized.io](https://serialized.io) to get your access keys to the API (if you haven't already).

### Running locally

Clone this repository and make sure you can run the application.

```bash
# Install all dependencies
npm install

# Start the server
export SERIALIZED_ACCESS_KEY=<YOUR_ACCESS_KEY> \
export SERIALIZED_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY> \
npm run start
```

The application should now be accessible at [http://localhost:8888](http://localhost:8888)

### Deploy to Heroku

You can easily deploy this application to your own Heroku account if you want to try it out some more.

You need a Heroku account, then run the following from the root of this repository:

```bash
$ heroku login
$ heroku create
$ heroku git:remote -a '<YOUR_APP_NAME>'
$ heroku config:set SERIALIZED_ACCESS_KEY=<YOUR_ACCESS_KEY>
$ heroku config:set SERIALIZED_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
$ git subtree push --prefix todo-application-js  heroku main
$ heroku open
```
