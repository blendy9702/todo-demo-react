import { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./schedule.css";

const Schedule = () => {
  // 선택된 날짜 기록
  const [date, setDate] = useState(new Date());
  // 일정 자료

  // 선택된 스케쥴 화면에 상세내용 보여주기
  const [selectSchedule, setSelectSchedule] = useState(null);
  // 샘플 일정
  const scheduleData = {
    "2024-12-13": [
      {
        id: 1,
        title: "오후 미팅",
        desc: "프로젝트 진행을 위한 기획 미팅",
        time: "16:00",
      },
      { id: 3, title: "저녁 약속", desc: "주말에 친구 약속", time: "18:00" },
    ],
  };

  const handleClickSchedule = item => {
    setSelectSchedule(item);
  };

  // 날짜 요일 출력
  const weekName = ["일", "월", "화", "수", "목", "금", "토"];
  const formatShortWeekday = (locale, date) => {
    return weekName[date.getDay()];
  };
  // 타일에 내용 출력
  const tileContent = e => {
    const { date, view } = e;
    // date : "2024-11-23T15:00:00.000Z",
    // view : "month",

    if (view === "month") {
      // 우리데이터 : "2024-12-13"
      const formatedDate = date.toLocaleDateString("en-CA");
      //  ["2024-11-13", "15:00:00.000Z"]
      const sechdules = scheduleData[formatedDate];
      if (sechdules) {
        return (
          <div className="schedule-content">
            {sechdules.map(item => (
              <div
                key={item.id}
                className="schedule-item"
                onClick={() => handleClickSchedule(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        );
      }
    }
  };

  useEffect(() => {}, [date]);
  return (
    <div>
      <h1>Schedule</h1>
      <div>
        <Calendar
          // 날짜·요일·한국어 표현
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          // 선택된 날짜 기록
          value={date}
          // 변경된 날짜 보관
          onChange={e => setDate(e)}
          // 각 날짜의 타일에 일정 출력하기
          tileContent={e => tileContent(e)}
        />
        <div>
          {selectSchedule && (
            <div
              className="schedule-detail"
              onClick={() => {
                setSelectSchedule(null);
              }}
            >
              <div
                className="schedule-box"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <h2>선택된 스케쥴</h2>
                <h3>제목: {selectSchedule.title}</h3>
                <p>시간: {selectSchedule.time}</p>
                <p>내용: {selectSchedule.desc}</p>

                <button
                  className="bt-close-1"
                  onClick={() => {
                    setSelectSchedule(null);
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
