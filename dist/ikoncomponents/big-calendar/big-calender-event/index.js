import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Eye, SquarePen } from "lucide-react";
import { TooltipComponent as Tooltip } from "../../tooltip";
// Custom event component
export default function BigCalenderEvent({ event, extraParamsEvent }) {
    return (_jsxs("div", { className: "custom-event flex flex-row justify-between", children: [_jsx("span", { className: "truncate w-auto", children: event.title }), _jsxs("span", { className: "flex flex-row gap-1", children: [((extraParamsEvent === null || extraParamsEvent === void 0 ? void 0 : extraParamsEvent.isEditableAll) || event.isEditable) &&
                        _jsx(Tooltip, { tooltipContent: "Edit", children: _jsx("button", { className: "event-edit-button w-fit px-1", onClick: (e) => {
                                    var _a;
                                    e.stopPropagation(); // Prevent triggering other event handlers
                                    (_a = extraParamsEvent === null || extraParamsEvent === void 0 ? void 0 : extraParamsEvent.onEditEventClick) === null || _a === void 0 ? void 0 : _a.call(extraParamsEvent, event);
                                }, children: _jsx(SquarePen, { size: 16 }) }) }), _jsx(Tooltip, { tooltipContent: "View", children: _jsx("button", { className: "event-view-button w-fit px-1", onClick: (e) => {
                                var _a;
                                e.stopPropagation(); // Prevent triggering other event handlers
                                (_a = extraParamsEvent === null || extraParamsEvent === void 0 ? void 0 : extraParamsEvent.onViewEventClick) === null || _a === void 0 ? void 0 : _a.call(extraParamsEvent, event);
                            }, children: _jsx(Eye, { size: 16 }) }) })] })] }));
}
