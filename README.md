# বাজার দর (BazarDor)

BazarDor is a Bangladeshi website for tracking the daily prices of essential goods. It shows today's market prices, changes from yesterday, category filters, and a protected product details page with market-wise prices in one place.

Live: (will be added after deployment)

## Technologies

- Next.js (App Router)
- Tailwind CSS
- BetterAuth
- MongoDB
- react-hot-toast

## Key Features

1. Live price ticker
2. Separate lists of products whose prices went up and down today
3. Category filter with price sorting
4. Market-wise price table for each product
5. Sign in with email, Google, or GitHub
6. Protected product details and profile name update

## Running Locally

1. Install dependencies:

   npm install

2. Create a `.env.local` file and add the following environment variables with your own values:

   - MONGODB_URI
   - BETTER_AUTH_SECRET
   - BETTER_AUTH_URL
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - GITHUB_CLIENT_ID
   - GITHUB_CLIENT_SECRET

3. Start the development server:

   npm run dev

4. Open in your browser:

   http://localhost:3000
