import { mainnet } from 'viem/chains';

/**
 * Convert a chainId to a coinType hex for reverse chain resolution
 */
export const convertChainIdToCoinType = (chainId) => {
    // L1 resolvers to addr
    if (chainId === mainnet.id) {
        return 'addr';
    }

    const cointype = (0x80000000 | chainId) >>> 0;
    return cointype.toString(16).toUpperCase();
};
