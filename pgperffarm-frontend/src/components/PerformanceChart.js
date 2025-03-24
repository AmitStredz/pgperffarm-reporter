import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { processResultsForChart } from '../utils/helpers';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const PerformanceChart = ({ results, testType, metricName, scaleUnit, onPointClick, options: customOptions }) => {
  const chartRef = useRef(null);
  
  // Process data for Chart.js
  const datasets = processResultsForChart(results);
  
  // Base chart options
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x'
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    transitions: {
      active: {
        animation: {
          duration: 400
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          boxWidth: 10,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: `${testType} Performance Results (${metricName})`,
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        },
        color: '#336791'
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#336791',
        bodyColor: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 4,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        animation: {
          duration: 150,
          easing: 'easeOutQuad'
        },
        callbacks: {
          title: (tooltipItems) => {
            const item = tooltipItems[0];
            const dataPoint = datasets[item.datasetIndex].data[item.dataIndex];
            return `Commit: ${dataPoint.revision.substring(0, 8)}...`;
          },
          label: (tooltipItem) => {
            const dataPoint = datasets[tooltipItem.datasetIndex].data[tooltipItem.dataIndex];
            return [
              `Branch: ${datasets[tooltipItem.datasetIndex].label}`,
              `${metricName}: ${dataPoint.y.toLocaleString()}`,
              `Date: ${dataPoint.timestamp}`,
              `Scale: ${dataPoint.scale} ${scaleUnit}`,
              `Message: ${dataPoint.commit_message || 'No message'}`
            ];
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.3, // Smoother curves
        borderWidth: 2,
        fill: false,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 6,
        hoverBorderWidth: 2,
        animation: {
          duration: 1200,
          easing: 'easeOutBack'
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM d, yyyy',
          displayFormats: {
            day: 'MMM d'
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 12,
            weight: 'normal'
          },
          color: '#666'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        },
        title: {
          display: true,
          text: metricName,
          font: {
            size: 12,
            weight: 'normal'
          },
          color: '#666'
        },
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          },
          maxTicksLimit: 8
        }
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const { datasetIndex, index } = elements[0];
        const dataPoint = datasets[datasetIndex].data[index];
        
        if (onPointClick) {
          onPointClick({
            branch: datasets[datasetIndex].label,
            revision: dataPoint.revision,
            metric: dataPoint.y,
            timestamp: dataPoint.timestamp,
            scale: dataPoint.scale,
            commit_message: dataPoint.commit_message
          });
        }
      }
    }
  };
  
  // Merge base options with custom options (if provided)
  const mergedOptions = customOptions
    ? {
        ...baseOptions,
        scales: {
          ...baseOptions.scales,
          y: {
            ...baseOptions.scales.y,
            ...(customOptions.scales?.y || {})
          }
        }
      }
    : baseOptions;
  
  // Chart data
  const data = {
    datasets
  };
  
  useEffect(() => {
    // Update optimization status in chart title
    if (chartRef.current && customOptions) {
      const chart = chartRef.current;
      if (chart) {
        const title = chart.options.plugins.title;
        // Add "(Optimized)" to the title if Y-axis is optimized
        if (customOptions.scales?.y?.min !== undefined) {
          title.text = `${testType} Performance Results (${metricName}) - Optimized View`;
        } else {
          title.text = `${testType} Performance Results (${metricName})`;
        }
        chart.update();
      }
    }
  }, [customOptions, testType, metricName]);
  
  return (
    <div className="mb-8 pb-6 border-b border-gray-200 h-[500px]">
      {datasets.length > 0 ? (
        <div className="relative h-full">
          <Line ref={chartRef} data={data} options={mergedOptions} />
          {customOptions && customOptions.scales?.y?.min !== undefined && (
            <div className="absolute top-2 right-2 bg-yellow-50 px-2 py-1 rounded text-xs text-yellow-800 border border-yellow-200">
              Y-axis optimized to highlight differences
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full p-10 bg-gray-50 rounded-lg italic text-gray-500">
          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          No data available for selected criteria
        </div>
      )}
    </div>
  );
};

export default PerformanceChart; 