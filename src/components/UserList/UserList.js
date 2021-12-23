import React, { useEffect, useState } from "react";
import CheckBox from "components/CheckBox";
import * as S from "./style";
import { usePeopleFetch } from "../../hooks";
import DivideUsers from "./DivideUsers";


const UserList = ({ indexValue, runnerIndex, setRunnerIndex }) => {
  let countryArr = [];
  let { users } = usePeopleFetch(runnerIndex);

  const [hoveredUserId, setHoveredUserId] = useState();
  const [brazilClicked, setBrazilClicked] = useState(false);
  const [australiaClicked, setAustraliaClicked] = useState(false);
  const [canadaClicked, setCanadaClicked] = useState(false);
  const [germanyClicked, setGermanyClicked] = useState(false);
  const [newZealandClicked, setNewZealandClicked] = useState(false);
  const [checkCountry, setCheckCountry] = useState(false);
  const [moreUsers, setMoreUsers] = useState(false);
  const [timerForRender, setTimerForRender] = useState(true);

  if (indexValue === 1) {
    users = JSON.parse(localStorage.getItem("favorite") || "[]");
  }

  useEffect(() => {
    if (!brazilClicked && !australiaClicked && !canadaClicked && !germanyClicked && !newZealandClicked) {
      setCheckCountry(false);
    } else {
      setCheckCountry(true);
    }
    findByCheckBox();
  }, [brazilClicked, australiaClicked, canadaClicked, germanyClicked, newZealandClicked, moreUsers, runnerIndex]);


  const scrollHandler = async (e) => {
    if (indexValue === 0 && !checkCountry) {
      const bottom = e.target.scrollHeight- e.target.scrollTop -50  <= e.target.clientHeight;
      if (bottom) { //check if the scroll ended
        if(timerForRender){
          setTimerForRender(prevState => !prevState)
          setRunnerIndex(prev => prev + 1);
          setMoreUsers(prevState => !prevState);
        }
        setTimeout(()=>{// timer for disable add users too many times at the same scrolling.
          setTimerForRender(true)
        },1000)
      }
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const findByCheckBox = () => { // cases when clicked on checkbox
    if (brazilClicked) {
      if (countryArr.includes("Brazil")) {
        countryArr.filter((element) => element !== "Brazil");
      } else {
        countryArr.push("Brazil");
      }
    }

    if (australiaClicked) {
      if (countryArr.includes("Australia")) {
        countryArr.filter((element) => element !== "Australia");
      } else {
        countryArr.push("Australia");
      }
    }

    if (canadaClicked) {
      if (countryArr.includes("Canada")) {
        countryArr.filter((element) => element !== "Canada");
      } else {
        countryArr.push("Canada");
      }
    }

    if (germanyClicked) {
      if (countryArr.includes("Germany")) {
        countryArr.filter((element) => element !== "Germany");
      } else {
        countryArr.push("Germany");
      }
    }

    if (newZealandClicked) {
      if (countryArr.includes("New Zealand")) {
        countryArr.filter((element) => element !== "New Zealand");
      } else {
        countryArr.push("New Zealand");
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onClick={setBrazilClicked} val={brazilClicked} />
        <CheckBox value="AU" label="Australia" onClick={setAustraliaClicked} val={australiaClicked} />
        <CheckBox value="CA" label="Canada" onClick={setCanadaClicked} val={canadaClicked} />
        <CheckBox value="DE" label="Germany" onClick={setGermanyClicked} val={germanyClicked} />
        <CheckBox value="NZ" label="New Zealand" onClick={setNewZealandClicked} val={newZealandClicked} />
      </S.Filters>

      <S.List onScroll={scrollHandler}>
        <DivideUsers indexValue={indexValue} users={users} checkCountry={checkCountry}
                     hoveredUserId={hoveredUserId} handleMouseEnter={handleMouseEnter}
                     handleMouseLeave={handleMouseLeave} brazilClicked={brazilClicked}
                     australiaClicked={australiaClicked} newZealandClicked={newZealandClicked}
                     germanyClicked={germanyClicked} canadaClicked={canadaClicked} />

      </S.List>

    </S.UserList>
  );

};

export default UserList;
