## Featured Based Architecture

- parent folder with sub folder will contain 's' in names at the end
- folders with no sub folder will contain name without 's'
- schemas/controller/dtos which use in multiple places through out the application will occur in common folder i.e user.schema.ts
- every folder contain index.ts file (**expect Infra and the modules folders contains api's in Controller**) which is exporting all the files form this folder

## Roles

- admin
- user
- employee
- client

### Credentials

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
