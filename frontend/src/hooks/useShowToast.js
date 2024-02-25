import { useToast } from "@chakra-ui/toast";

const useShowToast = () => {
  const toast = useToast();

  const showToast =
    ((title, description, status) => {
      toast({
        title,
        description,
        status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]);

  return showToast;
};

export default useShowToast;
