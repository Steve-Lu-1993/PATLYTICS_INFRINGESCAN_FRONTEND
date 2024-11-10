import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import {
  deleteAppBackend,
  postAppBackend,
  putAppBackend,
} from "../apis/backend/calls";

type GenericMutationPropsType = {
  method: "POST" | "PUT" | "DELETE";
  endpoint: string;
  token?: string;
  onSuccessMsg?: string;
  onErrorMsg?: string;
};

type MutationFuncParamsType = {
  data: any;
};

export const useGenericMutation = <TData>({
  method,
  endpoint,
  token,
  onSuccessMsg,
  onErrorMsg,
}: GenericMutationPropsType): UseMutationResult<TData, any, MutationFuncParamsType> => {
  const queryClient = useQueryClient();

  let queryFunc: any;
  switch (method) {
    case "POST":
      queryFunc = postAppBackend;
      break;
    case "PUT":
      queryFunc = putAppBackend;
      break;
    case "DELETE":
      queryFunc = deleteAppBackend;
      break;
  }

  const queryCategory = endpoint.split("/")[0];

  return useMutation<TData, any, MutationFuncParamsType>({
    mutationFn: (props: MutationFuncParamsType) =>
      queryFunc({
        endpoint,
        token,
        onSuccessMsg,
        onErrorMsg,
        data: props.data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryCategory] });
    },
    onError: (error: any) => {
      console.error("Error during mutation:", error);
    },
  });
};
