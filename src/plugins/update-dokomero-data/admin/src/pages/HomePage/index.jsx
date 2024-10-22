import React, { useEffect, useState } from "react";
import pluginId from "../../pluginId";
import {
  Accordion,
  AccordionContent,
  AccordionGroup,
  Button,
  FieldInput,
  Typography,
} from "@strapi/design-system";
import css from "./index.module.css";
const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [companyData, setCompanyData] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const companyDataGet = async () => {
      try {
        const response = await fetch(
          `https://cms.fujios.net/api/dokomero-companies?populate=deep`
        );
        if (!response.ok) {
          throw new Error("データの取得に失敗しました");
        }
        const result = await response.json();
        setCompanyData(result);
      } catch (error) {
      } finally {
      }
    };
    companyDataGet();
  }, []);

  const searchTextChange = (text) => {
    setSearchText(text);
  };

  const searchStation = async () => {
    try {
      const response = await fetch(
        `https://cms.fujios.net/api/dokomero-stations/?populate=deep&filters[stationName][$containsi]=${searchText}`
      );
      if (!response.ok) {
        throw new Error("データの取得に失敗しました");
      }
      const result = await response.json();
      setSearchResult(result);
    } catch (error) {
    } finally {
    }
  };
  const updatePost = async () => {
    try {
      const path = "/p/58ba3dce-ffa3-45e5-ae25-fe13a6ce0da6/3aa85b21-be7d-4cc4-bd1f-415199e32905/1";
      const response = await fetch(
        `https://test.fujios.net/webhook/station-update?path=${encodeURIComponent(path)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error("データの取得に失敗しました");
      }
  
      const result = await response.json();
      console.log(result);
  
      alert("更新が完了しました");
    } catch (error) {
      console.error("エラーが発生しました:", error); // Log the error
    }
  };
  
  
  return (
    <div className={css.main}>
      <div className={css.searchDiv}>
        <label>駅検索</label>
        <FieldInput
          onChange={(e) => {
            searchTextChange(e.target.value);
          }}
          value={searchText}
        />
        <Button
          onClick={() => {
            searchStation();
          }}
        >
          検索
        </Button>
      </div>

      <div className={css.searchResultDiv}>
        {searchResult !== null ? (
          <>
            {searchResult["data"].filter((item) => {
              return item["attributes"]["platformData"].length !== 0;
            }).length == 0 ? (
              <div className={css.searchStationCard}>
                <div></div>
                <span>対応駅が見つかりません</span>
              </div>
            ) : (
              <>
                {searchResult["data"]
                  .filter((item) => {
                    return item["attributes"]["platformData"].length !== 0;
                  })
                  .map((result, index) => {
                    const item = result.attributes;
                    let companyDataChild;
                    let companyUUID;
                    if (companyData) {
                      for (const companyChild of companyData["data"]) {
                        if (
                          companyChild["attributes"]["label"] == item["company"]
                        ) {
                          companyDataChild = companyChild;
                          companyUUID = companyChild["attributes"]["uuid"];
                        }
                      }
                    }

                    return (
                      <div className={css.searchStationCard}>
                        <div className={css.titleDiv1}>
                          <div className={css.titleDiv}>
                            <h2>{item.stationName}</h2>
                            <span>{item.company}</span>
                          </div>
                          <Button>この駅のすべてのデータを更新</Button>
                        </div>
                        <div className={css.platformDiv}>
                          {item.platformData.map((platformChild, index2) => {
                            let platform;
                            if (
                              Number.isInteger(Number(platformChild.platform))
                            ) {
                              platform = `${platformChild.platform}番線`;
                            } else if (!isNaN(platformChild.platform[0])) {
                              let platformResult = "";
                              for (const textChild of platformChild.platform) {
                                if (!isNaN(textChild)) {
                                  platformResult += textChild;
                                }
                              }
                              platform = `${platformResult}番線`;
                            } else if (
                              !isNaN(
                                platformChild.platform[
                                  platformChild.platform.length - 1
                                ]
                              )
                            ) {
                              platform = `${platformChild.platform}番線`;
                            } else if (platformChild.platform == "down") {
                              platform = "下り線";
                            } else if (platformChild.platform == "up") {
                              platform = "上り線";
                            } else if (
                              platformChild.platform == "not" ||
                              platformChild.platform == "-"
                            ) {
                              platform = "ラベルなし";
                            } else {
                              platform = platformChild.platform;
                            }

                            return (
                              <div
                                className={css.platformChild}
                                onClick={() => {
                                  updatePost();
                                }}
                              >
                                <p>
                                  {platform} {platformChild.direction}
                                </p>
                                <Button>更新</Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
