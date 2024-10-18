import { encodePacked, keccak256, namehash } from 'viem';
import { convertChainIdToCoinType } from './convertchains';

/**
 * Convert an address to a reverse node for ENS resolution
 */
export const convertReverseNodeToBytes = (address, chainId) => {
    const addressFormatted = address.toLowerCase();
    const addressNode = keccak256(addressFormatted.substring(2));
    const chainCoinType = convertChainIdToCoinType(chainId);
    const baseReverseNode = namehash(
        `${chainCoinType.toUpperCase()}.reverse`
    );
    const addressReverseNode = keccak256(
        encodePacked(['bytes32', 'bytes32'], [baseReverseNode, addressNode])
    );
    return addressReverseNode;
};
