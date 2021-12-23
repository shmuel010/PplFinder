import DisplayUser from "./DisplayUser";
import * as S from "./style";
import React from "react";
import Spinner from "../Spinner";


const DivideUsers  = ({
                               users,
                               checkCountry,
                               hoveredUserId,
                               handleMouseEnter,
                               handleMouseLeave,
                               setUpdateComponent,
                               indexValue,
                               brazilClicked,
                               australiaClicked,
                               germanyClicked,
                               canadaClicked,
                               newZealandClicked
                             }) => {
  return (<div>
      {users.map((user, index) => {
        if (!checkCountry) { //check if one or more of the checkbox clicked
          return (
            <DisplayUser key={user.login.uuid} user={user} index={index} hoveredUserId={hoveredUserId}
                         handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}
                         setUpdateComponent={setUpdateComponent} />
          );
        } else {
          if ((brazilClicked && user.location.country === "Brazil") || (australiaClicked && user.location.country === "Australia")
            || (canadaClicked && user.location.country === "Canada") || (germanyClicked && user.location.country === "Germany")
            || (newZealandClicked && user.location.country === "New Zealand")) {
            return (
              <DisplayUser key={user.login.uuid} user={user} index={index} hoveredUserId={hoveredUserId}
                           handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}
                           setUpdateComponent={setUpdateComponent} />
            );
          }
        }
      })}
      {indexValue === 0 && !checkCountry && ( //check if the navbar mode on
        <S.SpinnerWrapper>
          <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
        </S.SpinnerWrapper>
      )}
    </div>
  );
};
export default DivideUsers;