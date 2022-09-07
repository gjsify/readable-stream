'use strict'

import CustomStream from '../stream.js'

import promises from '../stream/promises.js'

const originalDestroy = CustomStream.Readable.destroy

export const _uint8ArrayToBuffer = CustomStream._uint8ArrayToBuffer
export const _isUint8Array = CustomStream._isUint8Array
export const isDisturbed = CustomStream.isDisturbed
export const isErrored = CustomStream.isErrored
export const isReadable = CustomStream.isReadable
export const Readable = CustomStream.Readable
export const Writable = CustomStream.Writable
export const Duplex = CustomStream.Duplex
export const Transform = CustomStream.Transform
export const PassThrough = CustomStream.PassThrough
export const addAbortSignal = CustomStream.addAbortSignal
export const finished = CustomStream.finished
// export const destroy = CustomStream.destroy
export const destroy = originalDestroy
export const pipeline = CustomStream.pipeline
export const compose = CustomStream.compose

Object.defineProperty(CustomStream, 'promises', {
  configurable: true,
  enumerable: true,

  get() {
    return promises
  }
})
export default CustomStream.Stream;
