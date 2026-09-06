import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteBlog, getBlogs } from "@/app/(admin)/admin/blogs/actions";
import { createBlog, updateBlog } from "@/app/(admin)/admin/blogs/new/actions";
import type { BlogType } from "@/drizzle/types";
import type { BlogSchemaValues } from "@/lib/validation/zod/blog.schema";

export const QUERY_KEY_BLOG = "blogs" as const;

export function useBlogCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: BlogSchemaValues) => {
      const result = await createBlog(input);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BLOG] });
    },
  });
}

type UpdateInput = {
  id: string;
  payload: BlogSchemaValues;
};

export function useBlogUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: UpdateInput) => {
      const result = await updateBlog(id, payload);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BLOG] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_BLOG, variables.id],
      });
    },
  });
}

export function useBlogs(search: string) {
  return useQuery({
    queryKey: [QUERY_KEY_BLOG, { search }],
    queryFn: async () => {
      const result = await getBlogs(search);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useBlogDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteBlog(id);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_BLOG] });

      const previousLists = queryClient.getQueriesData<BlogType[]>({
        queryKey: [QUERY_KEY_BLOG],
      });

      queryClient.setQueriesData<BlogType[]>(
        { queryKey: [QUERY_KEY_BLOG] },
        (current) => current?.filter((item) => item.id !== id),
      );

      return { previousLists };
    },

    onError: (_error, _id, context) => {
      for (const [queryKey, data] of context?.previousLists ?? []) {
        queryClient.setQueryData(queryKey, data);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BLOG] });
    },
  });
}
