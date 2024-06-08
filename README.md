# Project Name

Medicare - Patient Management System admin dashboard

## Description

Medicare is a patient management system

## Installation

1. Open folder in code editor

2. Install project dependencies:

```shell
yarn install
```

## Usage

1. Start the development server:

### For running against Local environment

Ensure your Rails API is running using
`PORT=3001 rails s`

and replace the

`const baseUrl = "https://medicare-pms-5c8030e1abf8.herokuapp.com";`

with

`const baseUrl = "http://localhost:3001";`

in api.js `line 6`

For running again

Before running

```shell
yarn start
```

2. Open your browser and visit `http://localhost:3000` to view the application.

## Deployment

Deploy using vercel

## Technologies Used

- React JS
- Tailwind CSS
