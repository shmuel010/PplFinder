import Text from "../Text";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import React, { useEffect, useState } from "react";

const DisplayUser = ({
                       user,
                       index,
                       hoveredUserId,
                       handleMouseEnter,
                       handleMouseLeave,
                     }) => {
  const [favoriteClick, setFavoriteClick] = useState(false);
  let favoriteArr = JSON.parse(localStorage.getItem("favorite") || "[]");

  useEffect(()=>{
    favoriteArr.forEach((favoriteUser) => {
      if (favoriteUser.login.uuid === user.login.uuid) {
        setFavoriteClick(true)
      }
    });
  },[])

  const onFavoriteClick = ()=> {
    let flag = false;
    favoriteArr.forEach((favoriteUser) => {
      if (favoriteUser.login.uuid === user.login.uuid) {
        flag = true;
      }
    });
    if (!flag) {
      favoriteArr.push(user);
    } else {
      favoriteArr = favoriteArr.filter(element => element.login.uuid !== user.login.uuid);
    }
    localStorage.setItem("favorite", JSON.stringify(favoriteArr));
    setFavoriteClick(prevState => !prevState)
  };

  return (

      <S.User
        key={index}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <S.UserPicture src={user?.picture.large} alt="" />
        <S.UserInfo>
          <Text size="22px" bold>
            {user?.name.title} {user?.name.first} {user?.name.last}
          </Text>
          <Text size="14px">{user?.email}</Text>
          <Text size="14px">
            {user?.location.street.number} {user?.location.street.name}
          </Text>
          <Text size="14px">
            {user?.location.city} {user?.location.country}
          </Text>
        </S.UserInfo>
        <S.IconButtonWrapper isVisible={(index === hoveredUserId) || (favoriteClick) }>
          <IconButton onClick={()=>{
            onFavoriteClick()
          }} >
              <FavoriteIcon  color="error" />
          </IconButton>
        </S.IconButtonWrapper>
        </S.User>
    )
};
export default DisplayUser;
