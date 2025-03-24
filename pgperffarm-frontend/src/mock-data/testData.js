// Test data for development
export const testTypes = [
  { id: 'dbt2', name: 'DBT-2', description: 'OLTP Benchmark' },
  { id: 'dbt3', name: 'DBT-3', description: 'Decision Support Benchmark' },
  { id: 'dbt5', name: 'DBT-5', description: 'Financial Services OLTP Benchmark' },
  { id: 'dbt7', name: 'DBT-7', description: 'Web Services Decision Support Benchmark' }
];

export const plantsList = {
  'dbt2': [
    { name: 'vanillaleaf', admin: 'admin@pgperffarm.org', host: 'vanillaleaf.pgperffarm.org', results: 42 },
    { name: 'powerleaf', admin: 'admin@pgperffarm.org', host: 'powerleaf.pgperffarm.org', results: 35 }
  ],
  'dbt3': [
    { name: 'vanillaleaf', admin: 'admin@pgperffarm.org', host: 'vanillaleaf.pgperffarm.org', results: 28 },
    { name: 'greenleaf', admin: 'admin@pgperffarm.org', host: 'greenleaf.pgperffarm.org', results: 19 }
  ]
};

export const branchesList = ['master', 'REL_12_STABLE', 'REL_13_STABLE', 'REL_14_STABLE', 'REL_15_STABLE', 'REL_16_STABLE', 'REL_17_STABLE'];

// Current time in seconds minus days
const now = Math.floor(Date.now() / 1000);
const oneDay = 24 * 60 * 60;
// Create data points for the last month with 4-day intervals
const dates = Array.from({ length: 8 }, (_, i) => now - (i * 4 * oneDay));

export const testResults = {
  'dbt2': {
    'vanillaleaf': [
      {
        "branch": "master",
        "tests": [
          {
            "revision": "m1850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[0],
            "metric": 33500,
            "complete_at": now,
            "commit_message": "Improve query planner for complex joins"
          },
          {
            "revision": "m2061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[1],
            "metric": 33300,
            "complete_at": now,
            "commit_message": "Optimize index scan for large tables"
          },
          {
            "revision": "m3ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[2],
            "metric": 33000,
            "complete_at": now,
            "commit_message": "Fix concurrency bug in buffer manager"
          },
          {
            "revision": "m4850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[3],
            "metric": 33800,
            "complete_at": now,
            "commit_message": "Enhance parallel query execution"
          },
          {
            "revision": "m5061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[4],
            "metric": 34000,
            "complete_at": now,
            "commit_message": "Optimize memory usage for shared buffers"
          },
          {
            "revision": "m6ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[5],
            "metric": 33600,
            "complete_at": now,
            "commit_message": "Improve vacuum performance"
          },
          {
            "revision": "m7850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[6],
            "metric": 33200,
            "complete_at": now,
            "commit_message": "Update statistics collection mechanism"
          },
          {
            "revision": "m8061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[7],
            "metric": 32900,
            "complete_at": now,
            "commit_message": "Fix locking issue in concurrent operations"
          }
        ]
      },
      {
        "branch": "REL_12_STABLE",
        "tests": [
          {
            "revision": "c1850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[0],
            "metric": 20500,
            "complete_at": now,
            "commit_message": "Fix buffer manager issue"
          },
          {
            "revision": "c2061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[1],
            "metric": 20700,
            "complete_at": now,
            "commit_message": "Optimize vacuum process"
          },
          {
            "revision": "c3ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[2],
            "metric": 20900,
            "complete_at": now,
            "commit_message": "Improve index scan performance"
          },
          {
            "revision": "c4850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[3],
            "metric": 20800,
            "complete_at": now,
            "commit_message": "Update statistics collection mechanism"
          },
          {
            "revision": "c5061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[4],
            "metric": 21000,
            "complete_at": now,
            "commit_message": "Fix locking issue in concurrent operations"
          },
          {
            "revision": "c6ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[5],
            "metric": 20600,
            "complete_at": now,
            "commit_message": "Optimize memory usage"
          },
          {
            "revision": "c7850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[6],
            "metric": 20500,
            "complete_at": now,
            "commit_message": "Fix bug in vacuum process"
          },
          {
            "revision": "c8061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[7],
            "metric": 20800,
            "complete_at": now,
            "commit_message": "Enhance parallel query execution"
          }
        ]
      },
      {
        "branch": "REL_13_STABLE",
        "tests": [
          {
            "revision": "a1efcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[0],
            "metric": 24500,
            "complete_at": now,
            "commit_message": "Update statistics collection mechanism"
          },
          {
            "revision": "a291fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[1],
            "metric": 24800,
            "complete_at": now,
            "commit_message": "Fix locking issue in concurrent operations"
          },
          {
            "revision": "a3ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[2],
            "metric": 25200,
            "complete_at": now,
            "commit_message": "Optimize memory usage"
          },
          {
            "revision": "a4ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[3],
            "metric": 24900,
            "complete_at": now,
            "commit_message": "Fix bug in vacuum process"
          },
          {
            "revision": "a5efcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[4],
            "metric": 25500,
            "complete_at": now,
            "commit_message": "Improve query planner for complex joins"
          },
          {
            "revision": "a691fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[5],
            "metric": 25800,
            "complete_at": now,
            "commit_message": "Optimize vacuum process"
          },
          {
            "revision": "a7ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[6],
            "metric": 26200,
            "complete_at": now,
            "commit_message": "Improve index scan performance"
          },
          {
            "revision": "a8ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[7],
            "metric": 26500,
            "complete_at": now,
            "commit_message": "Fix buffer manager issue"
          }
        ]
      },
      {
        "branch": "REL_14_STABLE",
        "tests": [
          {
            "revision": "e1850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[0],
            "metric": 28000,
            "complete_at": now,
            "commit_message": "Improve index scan performance"
          },
          {
            "revision": "e2061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[1],
            "metric": 28300,
            "complete_at": now,
            "commit_message": "Update statistics collection mechanism"
          },
          {
            "revision": "e3ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[2],
            "metric": 28500,
            "complete_at": now,
            "commit_message": "Fix bug in vacuum process"
          },
          {
            "revision": "e4850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[3],
            "metric": 28800,
            "complete_at": now,
            "commit_message": "Enhance parallel query execution"
          },
          {
            "revision": "e5061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[4],
            "metric": 29200,
            "complete_at": now,
            "commit_message": "Fix locking issue in concurrent operations"
          },
          {
            "revision": "e6ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[5],
            "metric": 28900,
            "complete_at": now,
            "commit_message": "Optimize memory usage"
          },
          {
            "revision": "e7850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[6],
            "metric": 29400,
            "complete_at": now,
            "commit_message": "Improve query planner for complex joins"
          },
          {
            "revision": "e8061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[7],
            "metric": 29700,
            "complete_at": now,
            "commit_message": "Optimize vacuum process"
          }
        ]
      },
      {
        "branch": "REL_15_STABLE",
        "tests": [
          {
            "revision": "g1850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[0],
            "metric": 31200,
            "complete_at": now,
            "commit_message": "Enhance parallel query execution"
          },
          {
            "revision": "g2061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[1],
            "metric": 30900,
            "complete_at": now,
            "commit_message": "Fix locking issue in concurrent operations"
          },
          {
            "revision": "g3ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[2],
            "metric": 31100,
            "complete_at": now,
            "commit_message": "Update statistics collection mechanism"
          },
          {
            "revision": "g4850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[3],
            "metric": 31500,
            "complete_at": now,
            "commit_message": "Improve index scan performance"
          },
          {
            "revision": "g5061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[4],
            "metric": 31800,
            "complete_at": now,
            "commit_message": "Fix bug in vacuum process"
          },
          {
            "revision": "g6ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[5],
            "metric": 32100,
            "complete_at": now,
            "commit_message": "Enhance parallel query execution"
          },
          {
            "revision": "g7850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[6],
            "metric": 32400,
            "complete_at": now,
            "commit_message": "Optimize memory usage"
          },
          {
            "revision": "g8061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[7],
            "metric": 32700,
            "complete_at": now,
            "commit_message": "Improve query planner for complex joins"
          }
        ]
      },
      {
        "branch": "REL_16_STABLE",
        "tests": [
          {
            "revision": "k1850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[0],
            "metric": 35800,
            "complete_at": now,
            "commit_message": "Enhance parallel query execution"
          },
          {
            "revision": "k2061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[1],
            "metric": 35500,
            "complete_at": now,
            "commit_message": "Fix locking issue in concurrent operations"
          },
          {
            "revision": "k3ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[2],
            "metric": 35200,
            "complete_at": now,
            "commit_message": "Update statistics collection mechanism"
          },
          {
            "revision": "k4850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[3],
            "metric": 35900,
            "complete_at": now,
            "commit_message": "Improve index scan performance"
          },
          {
            "revision": "k5061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[4],
            "metric": 36200,
            "complete_at": now,
            "commit_message": "Fix bug in vacuum process"
          },
          {
            "revision": "k6ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[5],
            "metric": 36400,
            "complete_at": now,
            "commit_message": "Enhance parallel query execution"
          },
          {
            "revision": "k7850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[6],
            "metric": 36100,
            "complete_at": now,
            "commit_message": "Optimize memory usage"
          },
          {
            "revision": "k8061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[7],
            "metric": 36700,
            "complete_at": now,
            "commit_message": "Improve query planner for complex joins"
          }
        ]
      },
      {
        "branch": "REL_17_STABLE",
        "tests": [
          {
            "revision": "n1850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[0],
            "metric": 38300,
            "complete_at": now,
            "commit_message": "Improve query planner for complex joins"
          },
          {
            "revision": "n2061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[1],
            "metric": 38000,
            "complete_at": now,
            "commit_message": "Enhance parallel query execution"
          },
          {
            "revision": "n3ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[2],
            "metric": 37800,
            "complete_at": now,
            "commit_message": "Fix locking issue in concurrent operations"
          },
          {
            "revision": "n4850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[3],
            "metric": 38500,
            "complete_at": now,
            "commit_message": "Update statistics collection mechanism"
          },
          {
            "revision": "n5061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[4],
            "metric": 38800,
            "complete_at": now,
            "commit_message": "Improve index scan performance"
          },
          {
            "revision": "n6ca9de9a0adf3fb47aaa6310cc022a78eee8a",
            "scale": 1,
            "ctime": dates[5],
            "metric": 39100,
            "complete_at": now,
            "commit_message": "Fix bug in vacuum process"
          },
          {
            "revision": "n7850fcca69b5db0694ceb5d1134699dc247f201e",
            "scale": 1,
            "ctime": dates[6],
            "metric": 38900,
            "complete_at": now,
            "commit_message": "Enhance parallel query execution"
          },
          {
            "revision": "n8061fd23c28faebcb29bdfb262975639715975c0",
            "scale": 1,
            "ctime": dates[7],
            "metric": 39300,
            "complete_at": now,
            "commit_message": "Optimize memory usage"
          }
        ]
      }
    ]
  }
};

export const metricNames = {
  'dbt2': 'New Orders / Minute',
  'dbt3': 'Queries per Hour',
  'dbt5': 'Trade Results per Second',
  'dbt7': 'Queries per Hour'
};

export const scaleUnits = {
  'dbt2': 'Warehouses',
  'dbt3': 'Scale Factor',
  'dbt5': 'Customers',
  'dbt7': 'Scale Factor'
}; 