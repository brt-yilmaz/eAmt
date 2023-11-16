import useSWRImmutable from "swr/immutable"
import { fetcher } from "@/helpers/fetcher"

export function useUser() {
  const { data, error, isLoading } = useSWRImmutable(`/api/users/me`, fetcher)
  return {
    user: data?.data,
    isLoading,
    isError: error
  }
}