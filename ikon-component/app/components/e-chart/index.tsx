'use client';

import { ForwardedRef, forwardRef, JSX, useEffect, useImperativeHandle, useRef } from 'react';
import { EChartsType, getInstanceByDom, init, ResizeOpts } from 'echarts';

interface Props {
  parentDivProps?: any;
  option?: Record<string | number, any>;
  style?: Record<string, string>;
  settings?: Record<string, any>;
  loading?: boolean;
  theme?: string | object | null;
  isConfigurable?: boolean;
  resizeKey?: null | boolean | number | string;
  onClick?: (...args: any) => void;
  onConfigure?: (...args: any) => void;
}

function validateOption(option?: null | Record<string, any>): Record<string, any> {
  if (option === undefined || option === null || typeof option !== 'object') {
    option = {};
  }

  const validatedOption = { ...option };

  if (
    validatedOption.toolbox === undefined ||
    validatedOption.toolbox === null ||
    typeof validatedOption.toolbox !== 'object'
  ) {
    validatedOption.toolbox = {};
  }

  if (
    validatedOption.toolbox.feature === undefined ||
    validatedOption.toolbox.feature === null ||
    typeof validatedOption.toolbox.feature !== 'object'
  ) {
    validatedOption.toolbox.feature = {};
  }

  return validatedOption;
}

const EChart = forwardRef<HTMLElement, Props>((
  {
    parentDivProps = {},
    option = {},
    style = {},
    settings = {},
    loading = true,
    theme,
    isConfigurable = false,
    resizeKey,
    onClick = () => { },
    onConfigure = () => { }
  },
  ref
) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<EChartsType | null>(null);

  const validatedOption = validateOption(option);

  if (isConfigurable) {
    validatedOption.toolbox.feature = {
      ...validatedOption.toolbox.feature,
      myConfigureChartTool: {
        show: true,
        title: 'Configure Chart',
        icon: 'image://data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNldHRpbmdzLTIiPjxwYXRoIGQ9Ik0yMCA3aC05Ii8+PHBhdGggZD0iTTE0IDE3SDUiLz48Y2lyY2xlIGN4PSIxNyIgY3k9IjE3IiByPSIzIi8+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjMiLz48L3N2Zz4=',
        onclick: () => onConfigure?.()
      }
    };
  }

  useImperativeHandle<HTMLElement, any>(ref, () => {
    return {
      getChartObject: () => {
        return chartRef.current ? getInstanceByDom(chartRef.current) : null;
      },

      setOption: (validatedOption: any, settings: any) => {
        if (!chartRef.current) {
          return;
        }

        const chart = getInstanceByDom(chartRef.current);
        chart?.setOption(validatedOption, settings);
      },

      resize: (secondResizeDelay = 0) => {
        if (!chartRef.current) {
          return;
        }

        const chart = getInstanceByDom(chartRef.current);
        chart?.resize();

        if (secondResizeDelay) {
          setTimeout(() => chart?.resize(), secondResizeDelay);
        }
      },

      loadingVisible: (visibility?: boolean) => {
        if (!chartRef.current) {
          return;
        }

        const chart = getInstanceByDom(chartRef.current);
        visibility ? chart?.showLoading() : chart?.hideLoading();
      },

      dispose: () => {
        if (!chartRef.current) {
          return;
        }

        const chart = getInstanceByDom(chartRef.current);
        chart?.dispose();
      },

      on: (eventName: string, callback: (...args: any) => void) => {
        if (!chartRef.current) {
          return;
        }

        const chart = getInstanceByDom(chartRef.current);
        chart?.on(eventName, callback);
      }
    };
  });

  useEffect(() => {
    if (chartRef.current) {
      chartInstanceRef.current = init(chartRef.current, theme);
    }

    const resizeCallback = () => chartInstanceRef.current?.resize?.();
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
        chartInstanceRef.current?.resize();
      }, 500);
    }
  }, []);

  return (
    <div
      ref={chartRef}
      {...parentDivProps}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
});

export default EChart;
