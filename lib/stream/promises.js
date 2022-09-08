'use strict'

import { ArrayPrototypePop, Promise } from '../ours/primordials'
<<<<<<< Updated upstream

import { isIterable, isNodeStream } from '../internal/streams/utils'

import { pipelineImpl as pl } from '../internal/streams/pipeline'

=======
import { isIterable, isNodeStream } from '../internal/streams/utils'
import { pipelineImpl as pl } from '../internal/streams/pipeline'
>>>>>>> Stashed changes
import { finished } from '../internal/streams/end-of-stream'

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

<<<<<<< Updated upstream
export {
  finished,
  pipeline
}

=======
>>>>>>> Stashed changes
export default {
  finished,
  pipeline
}
