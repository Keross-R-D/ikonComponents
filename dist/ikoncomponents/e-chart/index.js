'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { getInstanceByDom, init } from 'echarts';
function validateOption(option) {
    if (option === undefined || option === null || typeof option !== 'object') {
        option = {};
    }
    const validatedOption = Object.assign({}, option);
    if (validatedOption.toolbox === undefined ||
        validatedOption.toolbox === null ||
        typeof validatedOption.toolbox !== 'object') {
        validatedOption.toolbox = {};
    }
    if (validatedOption.toolbox.feature === undefined ||
        validatedOption.toolbox.feature === null ||
        typeof validatedOption.toolbox.feature !== 'object') {
        validatedOption.toolbox.feature = {};
    }
    return validatedOption;
}
export const EChart = forwardRef(({ parentDivProps = {}, option = {}, style = {}, settings = {}, loading = true, theme, isConfigurable = false, resizeKey, onClick = () => { }, onConfigure = () => { } }, ref) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const validatedOption = validateOption(option);
    if (isConfigurable) {
        validatedOption.toolbox.feature = Object.assign(Object.assign({}, validatedOption.toolbox.feature), { myConfigureChartTool: {
                show: true,
                title: 'Configure Chart',
                icon: 'image://data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNldHRpbmdzLTIiPjxwYXRoIGQ9Ik0yMCA3aC05Ii8+PHBhdGggZD0iTTE0IDE3SDUiLz48Y2lyY2xlIGN4PSIxNyIgY3k9IjE3IiByPSIzIi8+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjMiLz48L3N2Zz4=',
                onclick: () => onConfigure === null || onConfigure === void 0 ? void 0 : onConfigure()
            } });
    }
    useImperativeHandle(ref, () => {
        return {
            getChartObject: () => {
                return chartRef.current ? getInstanceByDom(chartRef.current) : null;
            },
            setOption: (validatedOption, settings) => {
                if (!chartRef.current) {
                    return;
                }
                const chart = getInstanceByDom(chartRef.current);
                chart === null || chart === void 0 ? void 0 : chart.setOption(validatedOption, settings);
            },
            resize: (secondResizeDelay = 0) => {
                if (!chartRef.current) {
                    return;
                }
                const chart = getInstanceByDom(chartRef.current);
                chart === null || chart === void 0 ? void 0 : chart.resize();
                if (secondResizeDelay) {
                    setTimeout(() => chart === null || chart === void 0 ? void 0 : chart.resize(), secondResizeDelay);
                }
            },
            loadingVisible: (visibility) => {
                if (!chartRef.current) {
                    return;
                }
                const chart = getInstanceByDom(chartRef.current);
                visibility ? chart === null || chart === void 0 ? void 0 : chart.showLoading() : chart === null || chart === void 0 ? void 0 : chart.hideLoading();
            },
            dispose: () => {
                if (!chartRef.current) {
                    return;
                }
                const chart = getInstanceByDom(chartRef.current);
                chart === null || chart === void 0 ? void 0 : chart.dispose();
            },
            on: (eventName, callback) => {
                if (!chartRef.current) {
                    return;
                }
                const chart = getInstanceByDom(chartRef.current);
                chart === null || chart === void 0 ? void 0 : chart.on(eventName, callback);
            }
        };
    });
    useEffect(() => {
        if (chartRef.current) {
            chartInstanceRef.current = init(chartRef.current, theme);
        }
        const resizeCallback = () => { var _a, _b; return (_b = (_a = chartInstanceRef.current) === null || _a === void 0 ? void 0 : _a.resize) === null || _b === void 0 ? void 0 : _b.call(_a); };
        window.addEventListener('resize', resizeCallback);
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose();
                chartInstanceRef.current = null;
            }
            window.removeEventListener('resize', resizeCallback);
        };
    }, [theme]);
    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.setOption(validatedOption, settings);
        }
        if (chartInstanceRef.current) {
            chartInstanceRef.current.on('click', onClick);
        }
    }, [option, settings, theme]);
    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.resize();
        }
    }, [resizeKey]);
    useEffect(() => {
        if (chartInstanceRef.current) {
            setTimeout(() => {
                var _a;
                (_a = chartInstanceRef.current) === null || _a === void 0 ? void 0 : _a.resize();
            }, 500);
        }
    }, []);
    return (_jsx("div", Object.assign({ ref: chartRef }, parentDivProps, { style: Object.assign({ width: '100%', height: '100%' }, style) })));
});
