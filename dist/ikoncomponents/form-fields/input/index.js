var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../shadcn/form';
import { Input } from '../../../shadcn/input';
export function FormInput(_a) {
    var { formControl, label, formDescription, extraFormComponent, name } = _a, inputProps = __rest(_a, ["formControl", "label", "formDescription", "extraFormComponent", "name"]);
    return (_jsx(_Fragment, { children: _jsx(FormField, { control: formControl, name: name, render: ({ field }) => (_jsxs(FormItem, { children: [label && _jsx(FormLabel, { children: label }), _jsx(FormControl, { children: _jsx(Input, Object.assign({}, field, inputProps)) }), extraFormComponent && extraFormComponent(field.value), formDescription && _jsx(FormDescription, { children: formDescription }), _jsx(FormMessage, {})] })) }) }));
}
