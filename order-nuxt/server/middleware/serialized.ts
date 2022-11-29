import {Serialized, SerializedInstance} from "@serialized/serialized-client";

let serialized: SerializedInstance | undefined

export default defineEventHandler((event) => {
  if (!serialized) {
    const accessKey = process.env.SERIALIZED_ACCESS_KEY!
    const secretAccessKey = process.env.SERIALIZED_SECRET_ACCESS_KEY!
    serialized = Serialized.createInstance({accessKey, secretAccessKey});
  }
  event.context.serialized = serialized
})
