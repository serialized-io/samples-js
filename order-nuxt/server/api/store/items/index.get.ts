import {defineEventHandler} from "h3";
import {productDatabase} from "~/server/utils/helpers";

export default defineEventHandler(async (_event) => {
  return {
    items: productDatabase.listAll()
  }
})
