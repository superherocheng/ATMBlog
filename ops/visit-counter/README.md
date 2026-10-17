# 今日访问次数计数器

前端 `src/components/VisitCounter.jsx` 请求 `GET /api/visit`，显示「今日访问次数：N」。
计数服务是零依赖的 Python stdlib 实现，只监听 `127.0.0.1:18081`，由 Caddy 反代暴露。

## 计数口径

- 每次页面加载计 1 次（PV）；同一 IP 10 秒内只计 1 次。
- 只有执行 JS 的浏览器会请求该接口，扫描器/爬虫不会计数。
- 按 `Asia/Shanghai` 划分日期；计数保存在 `/var/lib/atmblog-visits/counts.json`。

## 安装（VPS，root）

```sh
sudo sh ops/visit-counter/install.sh
```

## Caddy

在站点 `home.gaodeqingchuda.icu` 的 `handle` 之前加入：

```
	handle /api/visit {
		reverse_proxy 127.0.0.1:18081
	}
```

改完执行 `caddy validate --config /etc/caddy/Caddyfile` 再 `systemctl reload caddy`。

## 运维

```sh
systemctl status atmblog-visit
journalctl -u atmblog-visit -n 50
```
