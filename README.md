
# Project Name

Brief description of your project, what it does, and why it is useful.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Adding a Record](#adding-a-record)
  - [Deleting a Record](#deleting-a-record)
  - [Summary Statistics](#summary-statistics)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

A brief introduction to your project. Explain what your project does and why users might find it interesting or useful.

## Features

- **Authentication:** Secure endpoints with username and password authentication.
- **Data Management:** Add and delete records in the dataset.
- **Summary Statistics:** Calculate summary statistics for salary data.
- **Departmental Analysis:** Analyze salary data based on departments and sub-departments.

## Getting Started

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`

## Usage

### Authentication

To authenticate with the API, send a POST request to `/api/auth` with the following parameters and the username and password are hardcoded in the code which can be changed through the code only:

- `username`: Your username
- `password`: Your password

If authentication is successful, you will receive a JSON Web Token (JWT) that you can use to access protected endpoints.

### Adding a Record

To add a new record to the dataset, send a POST request to `/api/add` with the following parameters:

- `name`: Name of the employee
- `salary`: Salary of the employee
- `department`: Department of the employee
- `sub_department`: Sub-department of the employee
- `on_contract`: Employment contract status (true or false)

### Deleting a Record

To delete a record from the dataset, send a DELETE request to `/api/record/:name`, where `:name` is the name of the employee you want to delete.

### Summary Statistics

#### All Salaries

To get summary statistics for all salaries, send a GET request to `/api/salary-summary`.

#### Contract Employee Salaries

To get summary statistics for salaries of contract employees, send a GET request to `/api/salary-summary-contract`.

#### Department-wise Salary Summary

To get summary statistics for salaries based on departments, send a GET request to `/api/salary-summary-department`.

#### Department and Sub-department-wise Salary Summary

To get summary statistics for salaries based on both departments and sub-departments, send a GET request to `/api/salary-summary-department-sub`.

## Endpoints

- `POST /api/auth`: Authenticate user and receive a JWT token.
- `POST /api/add`: Add a new record to the dataset.
- `DELETE /api/record/:name`: Delete a record from the dataset.
- `GET /api/salary-summary`: Get summary statistics for all salaries.
- `GET /api/salary-summary-contract`: Get summary statistics for contract employee salaries.
- `GET /api/salary-summary-department`: Get summary statistics for department-wise salaries.
- `GET /api/salary-summary-department-sub`: Get summary statistics for department and sub-department-wise salaries.



