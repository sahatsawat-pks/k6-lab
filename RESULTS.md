# K6 lab results
## Part 0
- **Step 0.1, http_req_duration:** avg=454.52ms min=454.52ms med=454.52ms max=454.52ms p(90)=454.52ms p(95)=454.52ms
- **Step 0.2, requests, rate and p(95), and why the rate stays below 5: 73 requests, Rate:** 3.52 requests per second, p(95)=443.89ms. The reason that the rate stays below 5 requests per second because from each VU, it have omly 0.44 requests per second (From results in step 0.1). Which means total max rate will be impossible to exceed 5 requests per second (0.44 * 5 = ~2.2 requests per second). But when you run 5 VUs, it got better results than expected a bit.
- **Step 0.6, exit code of the normal run and of the run with P95=300: Normal run:** 0, Run with P95=300: 99
- **Step 0.7, rules that passed, p(95), p(99), exit code after your change:** All rules passed (Succeed rate, Failed rate, P(95), P(99)) with exit code 0. After that, I've changed P(99) from 1500 to 400 (0.4 seconds) and the test fails with exit code 99.
- **Step 0.8, what was wrong, and how the checks showed it:** The code was wrong on 2 points:
  - On `pizza.ingredients` part, it's conditional statement is wrong. So, I fixed it by moved `!` (not) from above to inside `i.name !== 'Pepperoni'`
  - `pizza.tool` is actually `pizza.tools`. So, I fixed it by add "s".
## Part A results
| Step | Test type | Users | Req/s | p(95) | Max | Failed | Checks |
| ---- | ------------ | ----- | ----- | ----- | --- | ------ | ------ |
| A1 | Smoke | 1 | 0.643543/s | 380.77ms | 387.73ms | 0 (0.00%) | 20 (100.00%) |
| A2 | Average load | 3 | 1.700493/s | 426.05ms | 602.41ms | 0 (0.00%) | 308 (100.00%) |
| A3 | Stress | 5 | 2.800788/s | 416.6ms | 450.78ms | 0 (0.00%) | 520 (100.00%) |
| A4 | Spike | 5 | 1.37144/s | 415.78ms | 489.05ms | 0 (0.00%) | 196 (100.00%) |
| A5 | Soak | 2 | | | | | |
## Part B
1. Take a look in above table.
2. The reason that the rate stays below 5 requests per second because from each VU, it have omly 0.44 requests per second (From results in step 0.1). Which means total max rate will be impossible to exceed 5 requests per second (0.44 * 5 = ~2.2 requests per second).
3. The response time did not noticeably degrade; in fact, it remained steady around ~416–426 ms. Within the operational envelope (the workload zone where system resources like CPU, memory, and thread pools remain well below saturation), throughput scales linearly with load while latency remains flat.
4. During the sharp ramp-up to 5 users, response time had a brief transient peak up to 489.05 ms (max).
5. No, neither worsened. Over the 11-minute run (212 iterations, 636 HTTP requests, 848 checks), the error rate remained at 0.00% (100% check pass rate), the average duration remained steady at 353.67 ms, and the p(95) was 440.74 ms (with the single isolated max of $1.56\text{ s}$ reflecting an isolated network blip rather than progressive degradation).
  - A soak test is specifically designed to uncover memory leaks (or unclosed resource handles like database connection leaks and file descriptor leaks). Over many continuous hours, uncollected objects accumulate in heap memory, triggering increasingly severe Garbage Collection pauses before ultimately crashing the process with an Out-of-Memory (java.lang.OutOfMemoryError or process OOM kill) exception.
6. Using p(95) (95th percentile) guarantees that 95% of all user requests were faster than the threshold value, directly representing the actual tail latency experienced by the vast majority of real users.
7. 
  - **Public Internet Routing and Jitter:** Public requests traverse multiple commercial ISPs, edge gateways, and shared CDNs subject to variable latency, packet loss, and routing hops. A dedicated lab network has sub-millisecond local LAN latency and no public internet congestion.
  - **Shared Multitenancy / Noisy Neighbors:** The public site is shared with other users, background cron jobs, and concurrent learners. In contrast, an isolated lab environment runs on dedicated hardware with predictable CPU, memory, and database states.
8. Running uncoordinated high-concurrency tests against third-party systems is classified as an unauthorized Denial of Service (DoS) attack. 
9.
### Vague Requirement (Spotify / Music Streaming App):

"The song search page should feel fast and not fail when lots of people search."

### Testable Requirement:

"Under a sustained load of 50 concurrent users, at least 99% of search requests must complete successfully (HTTP 200), and 95% of search requests must return within 500 ms, with 99% returning within 1,200 ms."

### K6 Thresholds:
```

export const options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '3m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    // 99% of requests must not fail
    http_req_failed: ['rate<0.01'],
    // 95% of search requests under 500ms, 99% under 1200ms
    'http_req_duration{endpoint:search}': ['p(95)<500', 'p(99)<1200'],
    // 99% of functional checks must pass
    checks: ['rate>0.99'],
  },
};
```