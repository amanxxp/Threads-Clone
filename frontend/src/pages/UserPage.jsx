import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import Post from "../components/Post";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const toast = useToast();
  const [loading, setloading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(true);

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
        setloading(false);
      }
    };
    const getPosts = async () => {
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "something went wrong",
          duration: 3000,
          isClosable: true,
        });
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };
    getUser();
    getPosts();
  }, [username]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user) return null;

  if (!user && !loading) {
    return <h1>user not found</h1>;
  }
  if (!fetchingPosts && !Array.isArray(posts)) {
    return <h1>User not found or has no posts.</h1>;
  }

  if (fetchingPosts || !user) {
    return (
      <Flex justifyContent={"center"} my={12}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  return (
    <>
      <UserHeader user={user} />

      {posts.length === 0 && <h1>User has no posts.</h1>}

      {Array.isArray(posts) &&
        posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
    </>
  );
};

export default UserPage;
