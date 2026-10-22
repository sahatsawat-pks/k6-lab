# K6 lab results
## Part 0
- Step 0.1, http_req_duration: avg=454.52ms min=454.52ms med=454.52ms max=454.52ms p(90)=454.52ms p(95)=454.52ms
- Step 0.2, requests, rate and p(95), and why the rate stays below 5: 73 requests, Rate: 3.52 requests per second, p(95)=443.89ms. The reason that the rate stays below 5 requests per second because from each VU, it have omly 0.44 requests per second (From results in step 0.1). Which means total max rate will be impossible to exceed 5 requests per second (0.44 * 5 = ~2.2 requests per second). But when you run 5 VUs, it got better results than expected a bit.
- Step 0.6, exit code of the normal run and of the run with P95=300: Normal run: 0, Run with P95=300: 99
- Step 0.7, rules that passed, p(95), p(99), exit code after your change: 
- Step 0.8, what was wrong, and how the checks showed it:
## Part A results
| Step | Test type | Users | Req/s | p(95) | Max | Failed | Checks |
| ---- | ------------ | ----- | ----- | ----- | --- | ------ | ------ |
| A1 | Smoke | 1 | | | | | |
| A2 | Average load | 3 | | | | | |
| A3 | Stress | 5 | | | | | |
| A4 | Spike | 5 | | | | | |
| A5 | Soak | 2 | | | | | |
## Part B
1.
2.
3.
4.
5.
6.
7.
8.
9.