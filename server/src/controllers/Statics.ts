import { Request, Response } from "express";
import models from "../models/Statics";
import jwt from "jsonwebtoken";

export default {
  get: (req: Request, res: Response) => {
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

    models.get(tokenData, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(result);
      }
    });
  },

  post: (req: Request, res: Response) => {
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);

    //클라에서 시작시간, 종료시간 보내줌
    //이걸로 계산해서 db에 기록

    // const { start, end } = req.body;
    // console.log(Date.parse(start));
    let start = new Date(2022, 5, 6, 21, 0, 0);
    let end = new Date(2022, 5, 7, 1, 0, 0);

    // 연도;
    let year = start.getFullYear();
    console.log("year", year);
    // 월
    let month = start.getMonth(); //1월이 0
    console.log("month", month);
    // 일
    let date = start.getDate();
    console.log("date", date);
    //기준시간
    let criterion = new Date(year, month, date, 24, 0, 0);
    console.log("기준시간", criterion);
    //요일
    let day = start.getDay();
    console.log("기준시간의 요일", day);

    //요일변환함수
    function convertDay(day) {
      switch (day) {
        case 0:
          return "sun";

        case 1:
          return "mon";

        case 2:
          return "tue";

        case 3:
          return "wed";

        case 4:
          return "thu";

        case 5:
          return "fri";

        case 6:
          return "sat";
      }
    }

    //요일이 변했는지체크
    let gap = end.getDay() - start.getDay();
    if (gap === 0) {
      let day: string | number = start.getDay();
      day = convertDay(day);
      let time = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

      //
      models.post1(day, time, tokenData, (error, result) => {
        if (error) {
          res.send({ message: "서버에러!" });
        } else {
          res.send({ message: "공부시간이 기록되었습니다." });
        }
      });
    } else if (gap === 1) {
      let today = convertDay(start.getDay()); //요일
      //올림 내림
      let todayTime = (criterion.getTime() - start.getTime()) / (1000 * 60 * 60);
      let NextDay = convertDay(end.getDay()); //요일
      let NextDayTime =
        (end.getTime() - start.getTime() - (criterion.getTime() - start.getTime())) /
        (1000 * 60 * 60);

      //
      models.post2(today, NextDay, todayTime, NextDayTime, tokenData, (error, result) => {
        if (error) {
          res.send({ message: "서버에러!" });
        } else {
          res.send({ message: "공부시간이 기록되었습니다." });
        }
      });
    }
  },
};