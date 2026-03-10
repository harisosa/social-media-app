import { updateProfile } from "@/features/user/api";
import { usersQueryKeys } from "@/features/user/queryKeys";
import { queryClient } from "@/lib/query";
import { appToast } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useUpdateProfile = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateProfile,

    onSuccess: async () => {
      
      await queryClient.invalidateQueries({
        queryKey: usersQueryKeys.me(),
      });
      appToast.success("Profile Success Update");
      router.push("/profile");
    },

    onError: (error) => {
      appToast.error(error.message ?? "Failed to update profile");
    },
  });
};
