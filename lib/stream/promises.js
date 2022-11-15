'use strict'

import { ArrayPrototypePop, Promise } from '../ours/primordials.js'
import { isIterable, isNodeStream } from '../internal/streams/utils.js'
import { pipelineImpl as pl } from '../internal/streams/pipeline.js'
import { finished } from '../internal/streams/end-of-stream.js'

function pipeline(...streams) {
  return new Promise((resolve, reject) => {
    let signal
    let end
    const lastArg = streams[streams.length - 1]

    if (lastArg && typeof lastArg === 'object' && !isNodeStream(lastArg) && !isIterable(lastArg)) {
      const options = ArrayPrototypePop(streams)
      signal = options.signal
      end = options.end
    }

    pl(
      streams,
      (err, value) => {
        if (err) {
          reject(err)
        } else {
          resolve(value)
        }
      },
      {
        signal,
        end
      }
    )
  })
}

export {
  finished,
  pipeline
}

export default {
  finished,
  pipeline
}
