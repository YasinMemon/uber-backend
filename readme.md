# User Registration Endpoint Documentation

## Endpoint: `/api/users/register`

### Description:

This endpoint allows a user to register by providing their full name, email, and password. The email must be unique, and the password will be hashed before storing it in the database. A JWT (JSON Web Token) is generated upon successful registration, which can be used for authentication in subsequent requests.

### Request Method:

- **POST**

### Request Body:

The request body should contain the following fields:

- `fullname`: An object containing the user's full name

  - `firstname` (required): The first name of the user. Minimum length of 3 characters.
  - `lastname` (optional): The last name of the user. Minimum length of 3 characters.

- `email` (required): The email address of the user. It must be a valid email format.

- `password` (required): The password of the user. The password must meet the security requirements.

#### Example of the Request Body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```
# User Login Endpoint Documentation

## Endpoint: `/api/users/login`

### Description:
This endpoint allows users to log in by providing their email and password. The server will validate the credentials, and if the user is found and the password is correct, a JWT (JSON Web Token) is generated for authentication. If the credentials are invalid, an error message will be returned.

### Request Method:
- **POST**

### Request Body:
The request body should contain the following fields:

- `email` (required): The email address of the user. It must be a valid email format.
- `password` (required): The password of the user.

#### Example of the Request Body:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
