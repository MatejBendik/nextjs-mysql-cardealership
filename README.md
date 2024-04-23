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

#### Get all cars

```http
  GET /api/cars
```

#### Add car

```http
  POST /api/cars
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `brand`   | `string` | Car brand   |
| `model`   | `string` | Car model   |
| `year`    | `number` | Car year    |

#### Get car

```http
  GET /api/cars/${id|brand}
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `number` | Id of the car to fetch    |
| `brand`   | `string` | Brand of the car to fetch |

#### Delete car

```http
  DELETE /api/cars/${id}
```

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `number` | Id of the car to delete |

#### Update car

```http
  PUT /api/cars/${id}
```

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `number` | Id of the car to delete |
| `brand`   | `string` | Car brand               |
| `model`   | `string` | Car model               |
| `year`    | `number` | Car year                |

### Built with

[![My Skills](https://skillicons.dev/icons?i=nextjs,ts,tailwind,mysql)](https://skillicons.dev)
