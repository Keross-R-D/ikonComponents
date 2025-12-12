import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Views } from "react-big-calendar";
import { Fragment, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../../../shadcn/toggle-group";
// Custom toolbar component
export default function BigCalenderToolbar({ onNavigate, onView, label, extraTools, view }) {
    const [calViewsValue, setValue] = useState(view === Views.DAY ? "DAY" : view === Views.WEEK ? "WEEK" : "MONTH");
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-3", children: [_jsxs(ToggleGroup, { type: "single", variant: 'outline', onValueChange: (value) => {
                        switch (value) {
                            case "PREV":
                                onNavigate("PREV");
                                break;
                            case "NEXT":
                                onNavigate("NEXT");
                                break;
                            case "TODAY":
                                onNavigate("TODAY");
                                break;
                            default:
                                break;
                        }
                    }, children: [_jsx(ToggleGroupItem, { className: "rounded-e-none", value: "PREV", children: _jsx(ChevronLeft, { size: 16 }) }), _jsx(ToggleGroupItem, { className: "rounded-none border-x", value: "NEXT", children: _jsx(ChevronRight, { size: 16 }) }), _jsx(ToggleGroupItem, { className: "rounded-s-none", value: "TODAY", children: "Today" })] }), _jsx("span", { className: "rbc-toolbar-label", children: label }), _jsxs("div", { className: "flex flex-row gap-2", children: [_jsxs(ToggleGroup, { type: "single", variant: 'outline', value: calViewsValue, onValueChange: (value) => {
                                setValue(value);
                                switch (value) {
                                    case "DAY":
                                        onView(Views.DAY);
                                        break;
                                    case "WEEK":
                                        onView(Views.WEEK);
                                        break;
                                    case "MONTH":
                                        onView(Views.MONTH);
                                        break;
                                    default:
                                        break;
                                }
                            }, children: [_jsx(ToggleGroupItem, { className: 'rounded-e-none', value: "MONTH", children: "Month" }), _jsx(ToggleGroupItem, { className: 'rounded-none border-x-0', value: "WEEK", children: "Week" }), _jsx(ToggleGroupItem, { className: "rounded-s-none", value: "DAY", children: "Day" })] }), extraTools === null || extraTools === void 0 ? void 0 : extraTools.map((tool, index) => _jsx(Fragment, { children: tool }, index))] })] }) }));
}
