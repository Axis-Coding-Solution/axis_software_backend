## Architecture

> #### The Product Contains _Feature-Based Architecture_

- parent folder with sub folder will contain 's' in names at the end

- folders with no sub folder will contain name without 's'

- schemas/controller/dtos which use in multiple places through out the application will occur in common folder i.e user.schema.ts

- every folder contain index.ts file (**expect Infra and the modules folders contains api's in Controller**) which is exporting all the files form this folder

## Roles

> #### The Product contain these roles

- admin
- user
- employee
- client

### Credentials (for development)

> #### credentials of every role for development and testing

1. admin

```
{
    "email": "admin@gmail.com",
    "password": "123456"
}
```

2. user

```
{
    "email": "user@gmail.com",
    "password": "123456"
}
```

2. employee

```
{
    "email": "Reagan_Dietrich38@gmail.com",
    "password": "securepassword123"
}
```

### Things to consider while development on this product

1. Mark fields Optional which are not required. Both in schema and Dtos.

2. If you're making a new folder then make index.ts file which will be exporting every file from this folder (**expect the modules folders contains api's in Controller**).

3. Try to give new line after every concern.

4. Remove all unnecessary consoles and commented code after testing.

5. Name of API function and service function should be same in every module for better readability and maintainability.

6. If there is any mongodId you have to add a check and search it in db and validate it as well.
