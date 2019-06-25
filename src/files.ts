import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

import {
  Block,
  FilesList,
  IBlock,
  IFilesList,
} from './model'

const { FilesBridge } = NativeModules

/**
 * Add raw data to a Textile thread
 * @param data Raw data
 * @param threadId The thread id the data will be added to
 * @param caption A caption to associate with the data
 * @returns A Promise that will resolve with the Block result
 */
export async function addData(data: Uint8Array, threadId: string, caption?: string): Promise<IBlock> {
  const result = await FilesBridge.addData(Buffer.from(data).toString('base64'), threadId, caption)
  return Block.decode(Buffer.from(result, 'base64'))
}

/**
 * Add files to a Textile thread
 * @param paths Comma separated list of file paths to add, can be file system paths, IPFS hashes, or existing hashes
 * @param threadId The thread id the files will be added to
 * @param caption A caption to associate with the files
 * @returns A Promise that will resolve with the Block result
 */
export async function addFiles(paths: string, threadId: string, caption?: string): Promise<IBlock> {
  const result = await FilesBridge.addFiles(paths, threadId, caption)
  return Block.decode(Buffer.from(result, 'base64'))
}

/**
 * Share files already aded to a Textile thread to a Textile thread
 * @param target The source thread target of the files to share
 * @param threadId The thread id the files will be shared to
 * @param caption A caption to associate with the files
 * @returns A Promise that will resolve with the Block result
 */
export async function shareFiles(target: string, threadId: string, caption?: string): Promise<IBlock> {
  const result = await FilesBridge.shareFiles(target, threadId, caption)
  return Block.decode(Buffer.from(result, 'base64'))
}

/**
 * List all files or files in a known Thread.
 * ```typescript
 * Textile.files.list(threadId, offset, limit);
 * ```
 */
export async function list(threadId: string, offset: string, limit: number): Promise<IFilesList> {
  const result = await FilesBridge.list(threadId, offset, limit)
  return FilesList.decode(Buffer.from(result, 'base64'))
}

/**
 * Get the raw data for a file at an IPFS hash.
 * ```typescript
 * Textile.files.content(hash);
 * ```
 */
export async function content(hash: string): Promise<{ data: Uint8Array, mediaType: string }> {
  const { data, mediaType } = await FilesBridge.content(hash)
  return { data: Buffer.from(data, 'base64'), mediaType }
}

/**
 * Get the best size image from a Thread with MEDIA type thread given a minimum width.
 *
 * Note: pth is <target>/<index>, e.g., "Qm.../0"
 * ```typescript
 * Textile.files.imageContentForMinWidth(path, minWidth);
 * ```
 */
export async function imageContentForMinWidth(
  pth: string,
  minWidth: number,
): Promise<{ data: Uint8Array, mediaType: string }> {
  const { data, mediaType } = await FilesBridge.imageContentForMinWidth(pth, minWidth)
  return { data: Buffer.from(data, 'base64'), mediaType }
}
