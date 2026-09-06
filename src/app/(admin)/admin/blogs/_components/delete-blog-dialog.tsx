"use client";

import { Loader, Trash2Icon, TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useBlogDelete } from "@/lib/react-query/hooks/use-blog";

const DeleteBlogDialog = ({ id, title }: { id: string; title: string }) => {
  const [open, setOpen] = useState(false);
  const { mutate: removeBlog, isPending } = useBlogDelete();

  function onConfirm() {
    removeBlog(id, {
      onSuccess: () => {
        toast.add({ title: "Blog deleted successfully" });
        setOpen(false);
      },
      onError: (err) => {
        toast.add({ title: err?.message || "Failed to delete blog" });
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Delete ${title}`}
            className="text-slate-500 hover:bg-red-50 hover:text-red-600"
          />
        }
      >
        <Trash2Icon />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-red-50 text-red-600">
            <TriangleAlertIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete this blog post?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium text-slate-900">{title}</span> will be
            permanently removed. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Deleting
              </>
            ) : (
              "Delete post"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBlogDialog;
