# Benchmarks

100 concurrent connections for 30 seconds
`autocannon -c 100 -d 30 https://xcnt6h5ywd.execute-api.us-east-1.amazonaws.com/`

Tests are run immediately after a deploy, so will include cold starts (~100 per test)

## Not minified, no sourcemaps

┌─────────────┬────────────────┬─────────────────┐
│ Bundle Size │ SourceMap Size │ Function Memory │
├─────────────┼────────────────┼─────────────────┤
│ 1.2MB       │ N/A            │ 512 MB          │
└─────────────┴────────────────┴─────────────────┘

[Power Tuning Results](https://lambda-power-tuning.show/#gAAAAQACAAQACMAL;RNQiRCxpnENjiRBDp42jQjDWjEIwFolC;VsSUNaLVjjW0VoQ1+62VNcOZATYr/Tg2)

```bash
% autocannon -c 100 -d 30 https://xcnt6h5ywd.execute-api.us-east-1.amazonaws.com/
Running 30s test @ https://xcnt6h5ywd.execute-api.us-east-1.amazonaws.com/
100 connections

┌─────────┬───────┬───────┬───────┬───────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼──────────┼────────┤
│ Latency │ 36 ms │ 44 ms │ 71 ms │ 90 ms │ 46.99 ms │ 27.84 ms │ 914 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴──────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬─────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg     │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼─────────┼─────────┼────────┤
│ Req/Sec   │ 675    │ 675    │ 2171   │ 2245   │ 2106.64 │ 273.6   │ 675    │
├───────────┼────────┼────────┼────────┼────────┼─────────┼─────────┼────────┤
│ Bytes/Sec │ 142 kB │ 142 kB │ 458 kB │ 474 kB │ 444 kB  │ 57.7 kB │ 142 kB │
└───────────┴────────┴────────┴────────┴────────┴─────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.

63k requests in 30.07s, 13.3 MB read
```

## Minified, no sourcemaps

┌─────────────┬────────────────┬─────────────────┐
│ Bundle Size │ SourceMap Size │ Function Memory │
├─────────────┼────────────────┼─────────────────┤
│ 534.8kb     │ N/A            │ 512 MB          │
└─────────────┴────────────────┴─────────────────┘

[Power Tuning Results](https://lambda-power-tuning.show/#gAAAAQACAAQACMAL;j/ocRFlylENcTxFDNxCXQlXVhkK1AYZC;dUqPNXeIhzVZQIU1OrqKNcY/+DXVTjY2)

```bash
% autocannon -c 100 -d 30 https://xcnt6h5ywd.execute-api.us-east-1.amazonaws.com/
Running 30s test @ https://xcnt6h5ywd.execute-api.us-east-1.amazonaws.com/
100 connections

┌─────────┬───────┬───────┬───────┬───────┬──────────┬──────────┬─────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev    │ Max     │
├─────────┼───────┼───────┼───────┼───────┼──────────┼──────────┼─────────┤
│ Latency │ 36 ms │ 44 ms │ 73 ms │ 90 ms │ 47.83 ms │ 32.72 ms │ 1010 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴──────────┴─────────┘
┌───────────┬────────┬────────┬────────┬────────┬─────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg     │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼─────────┼─────────┼────────┤
│ Req/Sec   │ 556    │ 556    │ 2183   │ 2247   │ 2069.67 │ 315.81  │ 556    │
├───────────┼────────┼────────┼────────┼────────┼─────────┼─────────┼────────┤
│ Bytes/Sec │ 117 kB │ 117 kB │ 461 kB │ 474 kB │ 437 kB  │ 66.6 kB │ 117 kB │
└───────────┴────────┴────────┴────────┴────────┴─────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.

62k requests in 30.06s, 13.1 MB read
```

## Minified with sourcemaps

┌─────────────┬────────────────┬─────────────────┐
│ Bundle Size │ SourceMap Size │ Function Memory │
├─────────────┼────────────────┼─────────────────┤
│ 534.8kb     │ 1.5MB          │ 512 MB          │
└─────────────┴────────────────┴─────────────────┘

[Power Tuning Results](https://lambda-power-tuning.show/#gAAAAQACAAQACMAL;GKsVROyxjENmZglDyW+UQqTwekLawH9C;hqyINR6wgDVb5ns17+aINdn+5TV9lSs2)

```bash
% autocannon -c 100 -d 30 https://xcnt6h5ywd.execute-api.us-east-1.amazonaws.com/
Running 30s test @ https://xcnt6h5ywd.execute-api.us-east-1.amazonaws.com/
100 connections

┌─────────┬───────┬───────┬───────┬───────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼──────────┼────────┤
│ Latency │ 36 ms │ 44 ms │ 67 ms │ 82 ms │ 46.52 ms │ 29.32 ms │ 968 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴──────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬─────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg     │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼─────────┼─────────┼────────┤
│ Req/Sec   │ 588    │ 588    │ 2185   │ 2249   │ 2127.77 │ 290.97  │ 588    │
├───────────┼────────┼────────┼────────┼────────┼─────────┼─────────┼────────┤
│ Bytes/Sec │ 124 kB │ 124 kB │ 461 kB │ 474 kB │ 449 kB  │ 61.4 kB │ 124 kB │
└───────────┴────────┴────────┴────────┴────────┴─────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.

64k requests in 30.07s, 13.5 MB read
```
