This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Prisma

Prisma generates a custom `node_modules` package for our database. This is done by running the following command:

```bash
npx prisma generate
```

If we need to update the database schema, because it changed remotely for some reasons
we can do so by running the following command:

```bash
npx prisma db pull --force
```

We need to `--force` it because limitations of prisma on mongodb database.
This should go away if we migrate to a relational database (like postgresql).

### Usage

You can refer to the [Prisma documentation](https://www.prisma.io/docs/) for more information.
but generally speaking, you can use the following commands:

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all users, inside your server side or hook or wherever you want.
const users = await prisma.user.findMany();
```

Prisma is fully typed, so it uses the definitions in the `schema.prisma` file
to generate the API and their types.

## Setup

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
