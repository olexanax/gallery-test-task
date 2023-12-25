import { PhotoType } from ".";

export type GetPhotosResponse = PhotoType[]

export interface GetPhotosQueryArgs {
  page: number;
  offset: number
  order_by: "latest" | "oldest" | "popular"
  per_page: number
}
