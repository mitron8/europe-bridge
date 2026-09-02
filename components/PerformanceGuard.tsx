"use client";
import { useEffect } from 'react';

export function PerformanceGuard() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.performance !== 'undefined' && window.performance.measure) {
      const _origMeasure = window.performance.measure;
      window.performance.measure = function (
        this: any,
        measureName: string,
        startOrMeasureOptions?: string | PerformanceMeasureOptions,
        endMark?: string
      ): any {
        try {
          return _origMeasure.call(this, measureName, startOrMeasureOptions as any, endMark);
        } catch (e) {
          // Safeguard against Next.js Turbopack dev profiler negative timestamp calculation errors
        }
      } as any;
    }
  }, []);

  return null;
}
