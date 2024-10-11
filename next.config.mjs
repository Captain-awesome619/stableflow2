/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        PRIVY_APP_ID : process.env.PRIVY_APP_ID, 
        PRIVY_APP_SECRET :process.env.PRIVY_APP_SECRET
    }
};

export default nextConfig;
