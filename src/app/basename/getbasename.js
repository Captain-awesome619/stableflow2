import {
    createPublicClient,
    http,
} from 'viem';
import { base } from 'viem/chains';
import l2Resolver from './l2resolver/l2Resolver';
import { convertReverseNodeToBytes } from './convertnodestobytes';
import { getAddress } from 'ethers';
const baseClient = createPublicClient({
    chain: base,
    transport: http(), 
});
const BASENAME_L2_RESOLVER_ADDRESS = '0xC6d566A56A1aFf6508b41f6c90ff131615583BCD';
export async function getBasename(address) {
    const validAddress = getAddress(address);
    try {
        const addressReverseNode = convertReverseNodeToBytes(validAddress, base.id);
        const basename = await baseClient.readContract({
            abi: l2Resolver,
            address: BASENAME_L2_RESOLVER_ADDRESS,
            functionName: 'name',
            args: [addressReverseNode],
        });
        if (basename) {
            return { name: basename }; 
        }
    } catch (error) {
        console.error('Error resolving Basename:', error);
    }
}
export async function getBasenameAvatar(basename) {
    const avatar = await baseClient.getEnsAvatar({
      name: basename,
      universalResolverAddress: BASENAME_L2_RESOLVER_ADDRESS,
    });
    return avatar;
  }