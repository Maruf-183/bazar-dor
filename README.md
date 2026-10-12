# বাজার দর (BazarDor)

বাজার দর একটি বাংলাদেশি দৈনন্দিন প্রয়োজনীয় পণ্যের দাম ট্র্যাকিং ওয়েবসাইট। এতে প্রতিদিনের বাজারদর, ডেল্টা, ক্যাটাগরি ফিল্টার এবং সুরক্ষিত পণ্য ডিটেইল একসাথে দেখা যায়।

Live: (deploy করার পর যোগ হবে)

## প্রযুক্তি

- Next.js
- Tailwind CSS
- BetterAuth
- MongoDB
- react-hot-toast

## মূল বৈশিষ্ট্য

1. লাইভ প্রাইস টিকার
2. দাম বেড়েছে ও কমেছে এমন পণ্য তালিকা
3. ক্যাটাগরি অনুযায়ী ফিল্টার ও সাজানো
4. বাজারভিত্তিক দাম টেবিল
5. ইমেইল, Google, GitHub সাইন-ইন
6. সুরক্ষিত পণ্য ডিটেইল ও প্রোফাইল আপডেট

## লোকাল রান করার নিয়ম

1. Dependency ইন্সটল করুন:
   npm install
2. `.env.local` ফাইলে নিচের ভেরিয়েবল নেম যোগ করুন, মান লিখতে হবে:
   - MONGODB_URI
   - BETTER_AUTH_SECRET
   - BETTER_AUTH_URL
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - GITHUB_CLIENT_ID
   - GITHUB_CLIENT_SECRET
3. ডেভ সার্ভার চালু করুন:
   npm run dev
4. ব্রাউজারে খুলুন:
   http://localhost:3000
