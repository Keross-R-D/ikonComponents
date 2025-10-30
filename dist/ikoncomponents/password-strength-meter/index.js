import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Progress } from "../../shadcn/progress";
import zxcvbn from "zxcvbn";
export const PasswordStrengthMeter = ({ value }) => {
    const testResult = zxcvbn(value);
    const num = (testResult.score * 100) / 4;
    const createPassLabel = () => {
        switch (testResult.score) {
            case 0:
                return "Very weak";
            case 1:
                return "Weak";
            case 2:
                return "Fair";
            case 3:
                return "Good";
            case 4:
                return "Strong";
            default:
                return "";
        }
    };
    const funcProgressColor = () => {
        switch (testResult.score) {
            case 0:
                return "#828282";
            case 1:
                return "#EA1111";
            case 2:
                return "#FFAD00";
            case 3:
                return "#9bc158";
            case 4:
                return "#00b500";
            default:
                return "";
        }
    };
    return (_jsx(_Fragment, { children: _jsx(Progress, { value: num, indicatorColor: funcProgressColor() }) }));
};
