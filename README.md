# Performance Testing with Grafana k6 (`k6-lab`)

**Course:** ITCS386 Software Verification and Validation  
**Student Name (ID):** Sahatsawat Nitjaphant (6688249)
**Target Application:** [QuickPizza Demo](https://quickpizza.grafana.com)  
**Tooling:** Grafana k6, JavaScript (ES6), Git

---

## Overview

This repository contains performance testing scripts, execution reports, and analytical results conducted using **Grafana k6** against the QuickPizza public demonstration service. 

The lab covers:
1. **Core k6 Mechanics (Part 0):** Script lifecycle, virtual user (VU) scheduling, HTTP/REST API assertions (`check`), security-oriented status validation, thresholds, and bug diagnosis.
2. **User Journey & Test Profiles (Part A):** Defining multi-step user scenarios and running Smoke, Average-Load, Stress, Spike, and Soak test workloads.
3. **Analysis & Reflection (Part B):** Interpreting percentiles ($p95$), system throughput bounds, recovery latencies, and operational envelopes under varying concurrency levels.

---

## Repository Structure

```text
k6-lab/
├── README.md                 # Project documentation and instructions
├── RESULTS.md                # Quantitative metrics and analysis write-up
├── 01-first-test.js          # Step 0.1–0.3: Basic HTTP GET and concurrency baseline
├── 04-pizza-api.js           # Step 0.4: POST requests with JSON payload and header auth
├── 05-no-token.js            # Step 0.5: Validation of 401 Unauthorized handling
├── 06-thresholds.js          # Step 0.6: Pass/fail SLA enforcement via thresholds
├── 07-requirement.js         # Step 0.7: SLA thresholds mapping to requirements
├── 08-bug-hunt.js            # Step 0.8: Fixed business logic assertion script
├── explore.js                # API discovery script for ingredients/tools
├── journey.js                # Modular user journey scenario (Home -> Quotes -> Recommendation)
├── a1-smoke.js               # Smoke test (1 VU, 30s)
├── a2-average.js             # Average load test (Ramp to 3 VUs, hold 2m, ramp down)
├── a3-stress.js              # Stress test (Ramp to 5 VUs, hold 2m, ramp down)
├── a4-spike.js               # Spike test (1 VU -> 5 VUs in 5s, hold 30s, recover)
├── a5-soak.js                # Soak test (2 VUs sustained for 10m)
└── reports/                  # Generated HTML performance dashboards
    ├── a2-average.html
    ├── a3-stress.html
    ├── a4-spike.html
    └── a5-soak.html
```

---

## Test Profiles & Workload Design

All tests in **Part A** execute the shared transaction journey defined in `journey.js`:
1. `group('home')`: Navigates to `/` and validates HTTP 200.
2. Variable sleep (1–3s think time).
3. `group('quotes')`: Retrieves `/api/quotes` and validates quote array non-emptiness.
4. Static sleep (1s think time).
5. `group('recommendation')`: Submits POST request to `/api/pizza` and validates recommendation delivery.
6. Variable sleep (1–3s think time).

### Workload Characteristics

| Step | Type | Target VUs | Stages / Execution Duration | Primary Verification Objective |
| :--- | :--- | :--- | :--- | :--- |
| **A1** | **Smoke** | 1 | 30s flat | Verify script syntax and functional health. |
| **A2** | **Average Load** | 3 | 30s ramp $\rightarrow$ 2m hold $\rightarrow$ 30s down | Baseline performance under typical traffic. |
| **A3** | **Stress** | 5 | 30s ramp $\rightarrow$ 2m hold $\rightarrow$ 30s down | Performance at maximum permitted concurrency. |
| **A4** | **Spike** | 5 | 30s @ 1 $\rightarrow$ 5s jump to 5 $\rightarrow$ 30s @ 5 $\rightarrow$ 5s drop $\rightarrow$ 1m @ 1 | Evaluate latency impact and recovery duration. |
| **A5** | **Soak** | 2 | 30s ramp $\rightarrow$ 10m hold $\rightarrow$ 30s down | Check for memory leaks and latency creep over time. |

---

## Setup & Execution

### 1. Prerequisites
Verify k6 installation:
```bash
k6 version
```

### 2. Running Individual Scripts
Execute basic test scripts:
```bash
k6 run 01-first-test.js
k6 run --vus 5 --duration 20s 01-first-test.js
k6 run 04-pizza-api.js
```

### 3. Running with Threshold Overrides
Test exit code triggers using environment variables:
```bash
# Normal execution (passes with exit code 0)
k6 run 06-thresholds.js

# Stricter SLA (fails with exit code 99)
k6 run -e P95=300 06-thresholds.js
```

### 4. Running Workload Suites with Dashboard Reports
Generate exportable HTML summary dashboards into the `reports/` folder:
```bash
# Average Load Test
k6 run --out web-dashboard=export=reports/a2-average.html a2-average.js

# Stress Test
k6 run --out web-dashboard=export=reports/a3-stress.html a3-stress.js

# Spike Test
k6 run --out web-dashboard=export=reports/a4-spike.html a4-spike.js

# Soak Test
k6 run --out web-dashboard=export=reports/a5-soak.html a5-soak.js
```

---

## Operational Constraints & Ethical Testing

QuickPizza is a shared public test infrastructure maintained by Grafana. Testing adheres strictly to these parameters:
* Concurrency is hard-capped at a maximum of **5 Virtual Users**.
* Test durations are capped at **$\le 3$ minutes** for general tests and **10 minutes** for the soak test.
* Breakpoint tests and heavy concurrency load (> 100 VUs) are intentionally excluded to prevent Denial of Service (DoS) and shared resource starvation.

Detailed metric recordings, table comparisons, and architectural questions are documented in **[RESULTS.md](./RESULTS.md)**.