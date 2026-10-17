#!/usr/bin/env python3
"""Tiny daily page-view counter for ATMBlog. Standard library only.

GET /api/visit -> {"today": <count>} and increments today's counter.
The same IP is counted at most once per DEBOUNCE_SECONDS.

Only Caddy reaches this service (bound to 127.0.0.1), and Caddy passes the
real client IP in X-Forwarded-For.
"""

import json
import os
import threading
import time
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from zoneinfo import ZoneInfo

STATE_FILE = os.environ.get("VISIT_STATE_FILE", "/var/lib/atmblog-visits/counts.json")
BIND = os.environ.get("VISIT_BIND", "127.0.0.1")
PORT = int(os.environ.get("VISIT_PORT", "18081"))
TIMEZONE = ZoneInfo(os.environ.get("VISIT_TZ", "Asia/Shanghai"))
DEBOUNCE_SECONDS = 10
KEEP_DAYS = 400

_lock = threading.Lock()
_last_hit = {}


def _today():
    return datetime.now(TIMEZONE).date().isoformat()


def _load():
    try:
        with open(STATE_FILE, encoding="utf-8") as fh:
            data = json.load(fh)
        return data if isinstance(data, dict) else {}
    except (OSError, ValueError):
        return {}


def _save(counts):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    tmp = f"{STATE_FILE}.tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(counts, fh, ensure_ascii=False)
    os.replace(tmp, STATE_FILE)


def _client_ip(handler):
    forwarded = handler.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return handler.client_address[0]


class Handler(BaseHTTPRequestHandler):
    server_version = "atmblog-visit/1.0"

    def do_GET(self):
        path = self.path.split("?", 1)[0].rstrip("/") or "/"
        if path == "/healthz":
            self._json({"ok": True})
            return
        if path != "/api/visit":
            self.send_error(404)
            return

        now = time.monotonic()
        today = _today()
        ip = _client_ip(self)
        key = (ip, today)

        with _lock:
            last = _last_hit.get(key)
            if last is None or now - last >= DEBOUNCE_SECONDS:
                _last_hit[key] = now
                counts = _load()
                counts[today] = counts.get(today, 0) + 1
                if len(counts) > KEEP_DAYS:
                    for stale in sorted(counts)[:-KEEP_DAYS]:
                        counts.pop(stale, None)
                _save(counts)
                value = counts[today]
            else:
                value = _load().get(today, 0)

            if len(_last_hit) > 10000:
                cutoff = now - DEBOUNCE_SECONDS
                for stale_key in [k for k, ts in _last_hit.items() if ts < cutoff]:
                    _last_hit.pop(stale_key, None)

        self._json({"today": value})

    def _json(self, payload):
        body = json.dumps(payload).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    ThreadingHTTPServer((BIND, PORT), Handler).serve_forever()
