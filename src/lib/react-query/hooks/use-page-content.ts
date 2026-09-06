import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePageContent,
  listConfiguredSlugs,
  upsertPageContent,
} from "@/app/(admin)/admin/pages/actions";
import type { PageContentSchemaValues } from "@/lib/validation/zod/page-content.schema";

export const QUERY_KEY_PAGE_CONTENT = "page-content" as const;

export function useConfiguredSlugs() {
  return useQuery({
    queryKey: [QUERY_KEY_PAGE_CONTENT, "configured"],
    queryFn: async () => {
      const result = await listConfiguredSlugs();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
  });
}

export function usePageContentUpsert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: PageContentSchemaValues) => {
      const result = await upsertPageContent(input);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_PAGE_CONTENT, variables.slug],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_PAGE_CONTENT, "configured"],
      });
    },
  });
}

export function usePageContentDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string) => {
      const result = await deletePageContent(slug);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onSettled: (_data, _error, slug) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_PAGE_CONTENT, slug],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_PAGE_CONTENT, "configured"],
      });
    },
  });
}
