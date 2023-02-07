import React from "react";
import themes from "devextreme/ui/themes";
import Scheduler from "devextreme-react/scheduler";

import CustomStore from "devextreme/data/custom_store";

function getData(_ : any, requestOptions : any) {
  const PUBLIC_KEY = "AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k";
  const CALENDAR_ID = "f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com";
  const dataUrl = [
    "https://www.googleapis.com/calendar/v3/calendars/",
    CALENDAR_ID,
    "/events?key=",
    PUBLIC_KEY
  ].join("");

  return fetch(dataUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => data.items);
}

const dataSource = new CustomStore({
  load: (options: any) => getData(options, { showDeleted: false })
});

const currentDate = new Date();

class App extends React.Component {
  themes.initialized(()=>{
    render() {
      return (
        <React.Fragment>
          <div className="long-title">
            <h3>Remainder</h3>
          </div>
          <Scheduler
            dataSource={dataSource}
            views={["day" , "week" , "month"]}
            defaultCurrentView="week"
            defaultCurrentDate={currentDate}
            height={500}
            startDayHour={7}
            editing={false}
            showAllDayPanel={false}
            startDateExpr="start.dateTime"
            endDateExpr="end.dateTime"
            textExpr="summary"
            timeZone="America/Los_Angeles"
          />
        </React.Fragment>
      );
    }
  }
  })

export default App;