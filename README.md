# ads-osn-portal

The front end and API for Outlaw Snax vendor portal

## Dependencies

- [Yarn](https://yarnpkg.com/) as a package manager
- [Parcel](https://parceljs.org/) as a bundler and build tool
- [Auth0](https://auth0.com/) for authentication and authorization
- [ReactJS](https://reactjs.org/) and [mui](https://mui.com/) as the front end UI library

## How to run it

Pull down the repo and run `yarn install`. Then run `yarn start`. The application will be visible at `http://localhost:1234`

## API

The API is built on expressjs and uses [JWT tokens](https://jwt.io/) provided by Auth0 for authorization. To run it, run `yarn api`. Make requests against the API at `http://localhost:3000`. Currently, only `GET` requests are supported.