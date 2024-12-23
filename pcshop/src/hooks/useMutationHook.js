import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (fnCallback, options = {}) => {
    const mutation = useMutation({
        mutationFn: fnCallback,
    });

    return mutation;
};
