import { Toast, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.message) {
          toast({
            title: "Error",
            description: "User Does't exist",
            duration: 3000,
            isClosable: true,
          });
        }
        setUser(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "something went wrong",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username]);
  return { loading, user };
};

export default useGetUserProfile;
