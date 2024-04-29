## Get started

```bash
  git clone https://github.com/MatejBendik/nextjs-mysql-cardealership.git
```

Go to the project directory

```bash
  cd nextjs-mysql-cardealership
```

Install dependencies

```bash
  npm i
```

Run dev server

```bash
  npm run dev
```

### Create .env.local file:

```bash
  touch .env.local
```

Add these variables to the .env.local file:

```js
DB_HOST;
DB_USER;
DB_SCHEMA;
```

## API Reference

#### Get all customers

```bash
  GET /api/customers
```

#### Add customer

```bash
  POST /api/customers
```

| Parameter       | Type     | Description      |
| :-------------- | :------- | :--------------- |
| `ZamestnanecID` | `number` | Employee ID      |
| `Meno`          | `string` | Customer name    |
| `Priezvisko`    | `string` | Customer surname |
| `Kontakt`       | `string` | Customer contact |
| `Platba`        | `number` | Payment in €     |

#### Get customer

```bash
  GET /api/customers/${id|Name}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `number` | Id of the customer to fetch   |
| `Name`    | `string` | Name of the customer to fetch |

#### Delete customer

```bash
  DELETE /api/customers/${id}
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `number` | Id of the customer to delete |

#### Update customer

```bash
  PUT /api/customers/${id}
```

| Parameter       | Type     | Description      |
| :-------------- | :------- | :--------------- |
| `ZamestnanecID` | `number` | Employee ID      |
| `Meno`          | `string` | Customer name    |
| `Priezvisko`    | `string` | Customer surname |
| `Kontakt`       | `string` | Customer contact |
| `Platba`        | `number` | Payment in €     |

### Built with

[![My Skills](https://skillicons.dev/icons?i=nextjs,ts,tailwind,mysql)](https://skillicons.dev)
