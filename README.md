
### Tecnologias
Typescript
PostgresSQL
Prisma
Express
SOLID

## Instalação

```bash
$ npm i
```

```bash
$ docker compose up -d
```

```bash
$ npx prisma generate
```

```bash
$ npx prisma migrate dev
```

## Alterar nome do arquivo .env.exemple para .env

```

  PORT=
  DATABASE_URL=
  
```

## Exemplo do arquivo .env

```

PORT=3333
DATABASE_URL="postgresql://candidates:abcde@localhost:5432/candidates?schema=public"

```

## Rodando a aplicação

```bash
$ npm run start:dev
```
