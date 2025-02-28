import { AbortError, codes } from '../../ours/errors';
import eos from './end-of-stream';

const { ERR_INVALID_ARG_TYPE } = codes // This method is inlined here for readable-stream
// It also does not allow for signal to not exist on the stream
// https://github.com/nodejs/node/pull/36061#discussion_r533718029

const validateAbortSignal = (signal, name) => {
  if (typeof signal !== 'object' || !('aborted' in signal)) {
    throw new ERR_INVALID_ARG_TYPE(name, 'AbortSignal', signal)
  }
}

function isNodeStream(obj) {
  return !!(obj && typeof obj.pipe === 'function')
}

export const addAbortSignal = function addAbortSignal(signal, stream) {
  validateAbortSignal(signal, 'signal')

  if (!isNodeStream(stream)) {
    throw new ERR_INVALID_ARG_TYPE('stream', 'stream.Stream', stream)
  }

  return addAbortSignalNoValidate(signal, stream)
}

export const addAbortSignalNoValidate = function (signal, stream) {
  if (typeof signal !== 'object' || !('aborted' in signal)) {
    return stream
  }

  const onAbort = () => {
    stream.destroy(
      new AbortError(undefined, {
        cause: signal.reason
      })
    )
  }

  if (signal.aborted) {
    onAbort()
  } else {
    signal.addEventListener('abort', onAbort)
    eos(stream, () => signal.removeEventListener('abort', onAbort))
  }

  return stream
}
