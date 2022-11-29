import {defineEventHandler} from "h3";
import {Feed, OrderEvent} from "~/server/utils/types";

export default defineEventHandler(async (event) => {
  const client = event.context.serialized.feedsClient();
  const response = await client.loadFeed({
    feedName: 'order'
  });
  const feed = response as Feed<OrderEvent>;
  const events = feed.entries.flatMap((entry => entry.events))
  return {orderEvents: events}
})
