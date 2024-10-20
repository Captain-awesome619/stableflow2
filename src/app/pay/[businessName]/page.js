// 'use client';

// const PayPage = ({ params }) => {
//   const { businessName } = params;

//   const getData = () => {};

//   return (
//     <div>
//       <h1>Pay Merchant</h1>
//       <p>Merchant ID: {JSON.stringify(params)}</p>
//       {/* Add your payment form or logic here */}
//     </div>
//   );
// };

// export default PayPage;

// app/pay/[businessName]/page.js

// This is a Server Component that can fetch data before rendering
export default async function PayPage({ params }) {
  // Destructure the dynamic route parameter from the params object
  const { businessName } = params;

  // Fetch data from an external API using the businessName as a query parameter
  const response = await fetch(
    `https://www.google.com/search?q=${businessName}`
  );

  // For demonstration purposes, we assume we're getting plain text (e.g., from a Google search)
  const data = await response.text();

  return (
    <div>
      <h1>Pay Merchant: {businessName}</h1>
      <p>Fetched Data:</p>
      <pre>{data}</pre> {/* Displaying fetched data */}
      {/* Add your payment form or logic here */}
    </div>
  );
}
