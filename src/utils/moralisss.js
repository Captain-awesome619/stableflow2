import Moralis from "moralis";

export const initializeMoralis = async () => {
  await Moralis.start({
    apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFiN2YyYTdhLTUyOTctNDAzMC1iMDdhLWU4ZmU0M2QyNmY1MyIsIm9yZ0lkIjoiNDExMzg1IiwidXNlcklkIjoiNDIyNzYzIiwidHlwZUlkIjoiMDc4OTExMWItMmViZC00ZmY4LWE0NWUtZjAyZmFlZmJjNzEzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjg2NzI1NzUsImV4cCI6NDg4NDQzMjU3NX0.80oz0twdS4YBzXPAQnhKnW8n3iT9qWUkdkd1AMELMMo', // Replace with your Moralis API key
  });
}