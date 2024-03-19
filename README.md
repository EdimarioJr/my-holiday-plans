This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run in development, just install docker on your machine, navigate to project folder, assign .env variables and execute : docker compose up.

This will create a postgres service and the front-end service. You can access the front-end project at localhost:3000.

To execute storybook you must enter in the running container ( docker exec -it container_id sh ) and execute : npm run storybook. The storybook containing components docs will be available at localhost:6006.

|


