# React meal app

## Installation and setup repo

1- open the terminal type `https://github.com/mohammadAlshalabi/react-meal-app.git` <br />
2- Type cd ./react-meal-app <br />
3- Type nvm use (you need to have node v18) <br />
4- Type npm install <br />
5- You are all set <br />

## running Api tests in open mode

1- Open the terminal and type `npm run cypress:open` <br />
2- Run the spec file you want <br />

## Running Api tests in headless mode

1- Open the terminal and type `npm run cypress:headless` <br />
2- All the spec files under cypress/e2e folder will run <br />

### Github actions integration:

1- Open a PR with any changes <br />
2- Observe that the CI is triggered automatically <br />
3- Open the actions tab and check the tests results there <br />

#### Note: Only run visual testing spec file on headless mode on laptop, since the CI uses different machine capabilities

# Manual test cases

You can find the manual test cases here: `https://docs.google.com/spreadsheets/d/1xKyjr2nBFfkeT-HP8JWKLe4LZa4soblqYlRwDLnxHxM/edit?usp=sharing` <br />

The first Tab contains the test cases and the second tab contains the bugs i logged <br />
