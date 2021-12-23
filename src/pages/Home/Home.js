import React, { useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";
import NavBar from "../../components/NavBar";

const Home = () => {
  const [indexValue, setIndexValue] = useState(0);
  const [runnerIndex, setRunnerIndex] = useState(0);//for the infinity scroll

  useEffect(() => {
  }, [indexValue]);

  return (
    <S.Home>
      <NavBar setValue={setIndexValue} value={indexValue} />
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList indexValue={indexValue} runnerIndex={runnerIndex} setRunnerIndex={setRunnerIndex} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
