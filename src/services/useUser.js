import useSWR from "swr"
import { fetcher } from "@/helpers/fetcher"

export function useUser() {
  const { data, error, isLoading } = useSWR(`/api/users/me`, fetcher)
  return {
    user: data?.data,
    isLoading,
    isError: error
  }
}