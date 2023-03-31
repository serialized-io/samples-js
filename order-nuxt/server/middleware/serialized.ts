import {Serialized, SerializedInstance} from "@serialized/serialized-client";
import {createOrderClient} from "~/server/utils/helpers";

let serialized: SerializedInstance | undefined

export default defineEventHandler((event) => {
  if (!serialized) {
    const accessKey = process.env.SERIALIZED_ACCESS_KEY!
    const secretAccessKey = process.env.SERIALIZED_SECRET_ACCESS_KEY!
    serialized = Serialized.createInstance({accessKey, secretAccessKey});
  }
  event.context.serialized = serialized
  event.context.orderClient = createOrderClient(serialized)
})
