import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (index = 1) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [index]);

  const fetchUsers = async () => {
    index++;
    setIsLoading(true);
      await axios.get(`https://randomuser.me/api/?results=25&page=${index++}`)
      .then((response)=>{
        setUsers(prev => [...prev, ...response.data.results]);
    }).catch((e)=>{
          console.log(e.message());
    });
    setIsLoading(false);
  };
  return { users, isLoading };
};
