'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import BigCalenderToolbar from "./big-calender-toolbar";
import BigCalenderEvent from "./big-calender-event";
import { enUS } from 'date-fns/locale';
// Localization settings
const locales = {
    "en-US": enUS,
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
export function BigCalendar({ events, extraParamsEvent, extraTools }) {
    const [view, setView] = useState((extraParamsEvent === null || extraParamsEvent === void 0 ? void 0 : extraParamsEvent.defaultView) === "day" ? Views.DAY :
        (extraParamsEvent === null || extraParamsEvent === void 0 ? void 0 : extraParamsEvent.defaultView) === "week" ? Views.WEEK :
            (extraParamsEvent === null || extraParamsEvent === void 0 ? void 0 : extraParamsEvent.defaultView) === "month" ? Views.MONTH :
                (extraParamsEvent === null || extraParamsEvent === void 0 ? void 0 : extraParamsEvent.defaultView) === "work week" ? Views.WORK_WEEK :
                    (extraParamsEvent === null || extraParamsEvent === void 0 ? void 0 : extraParamsEvent.defaultView) === "agenda" ? Views.AGENDA : Views.MONTH);
    const [date, setDate] = useState(new Date());
    return (_jsx(Calendar, { localizer: localizer, events: events || [], startAccessor: "start", endAccessor: "end", views: [Views.DAY, Views.WEEK, Views.MONTH], view: view, onView: (view) => setView(view), date: date, onNavigate: (date) => setDate(date), components: {
            event: (props) => _jsx(BigCalenderEvent, { event: props.event, extraParamsEvent: extraParamsEvent }),
            toolbar: (props) => _jsx(BigCalenderToolbar, Object.assign({}, props, { extraTools: extraTools, view: view })),
        }, style: {
            height: (extraParamsEvent === null || extraParamsEvent === void 0 ? void 0 : extraParamsEvent.height) || "100%",
            margin: (extraParamsEvent === null || extraParamsEvent === void 0 ? void 0 : extraParamsEvent.margin) || "0px",
        } }));
}
