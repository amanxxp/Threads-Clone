import { Button, StepStatus, useToast } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      localStorage.removeItem("user-threads");
      toast({
        title: "logout",
        description: "successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setUser(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}
    >
      <FiLogOut size={20} />
    </Button>
  );
};

export default LogoutButton;
