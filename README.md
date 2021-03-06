# Super Admin App

A simple contacts app, where we can get a list of contact, create, edit and delete contacts

## Starting-up 🚀

_Follow the next steps to run the project_

### Installing 🔧

Download project: 

```bash
# From Source
git clone https://github.com/erniker/contactApp.git
cd contactApp
```

Then install dependencies:

For backend:
```bash
cd backend
yarn install
```
You need configure a .env file in ./src. You can use .env.example.

For backend:
```bash
cd frontend
yarn install
```
You need here another .env, in ./src:
```bash
REACT_APP_APP_NAME="ContactsApp"
REACT_APP_BASE_URL=http://localhost:8080
```

You need have an a postgres db called contactApp. You could use dockers by typing a command like this:
```bash
docker run --name contactApp -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432
```

And now, make migrations:
```bash
cd backend
yarn db:migration:create first-migration
```
After this:
```bash
yarn db:migration:run
```
And, in order to avoid compilation errors:
```bash
yarn db:migration:to-js
```

## Running app ⭐

To run backend in dev mode:
```bash
cd backend
yarn start:dev
```
To run frontend:
```bash
cd frontend
yarn start
```

## Running tests ⚙️

- You must to create the DB contactsApp-test to run all the behavioural tests there
- Go to the backend folder
```bash
cd backend
```
- Run `yarn test:unit` to get the unit tests executed
- Run `yarn test:behaviour` to get the behavioural tests executed
- Run `yarn test:unit:cov` to get a unit test coverage report
- Run `yarn test:cov` to get a full coverage report

To run  e2e test:
```bash
cd frontend
```
- Run `yarn cypress`

## Built with 🛠️

* [NodeJS](https://nodejs.org/es/) - A JavaScript runtim
* [NestJS](https://nestjs.com/) - A progressive Node.js framework
* [REACT](https://reactjs.org/) - A JavaScript library for building user interfaces
* [BOOTSTRAP](https://getbootstrap.com/) - A popular front-end open source toolkit

## Author ✒️

* **José Pablo Medina Grande** - [erniker](https://github.com/erniker)

## Acknowledgement 🎁

* To Frzurita, who taught me almost everything I know. -> Frzurita.https://github.com/Frzurita)


---
⌨️ con ❤️ por [erniker](https://github.com/erniker) 😊
