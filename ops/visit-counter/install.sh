#!/bin/sh
# Install/update the ATMBlog visit counter on the VPS. Run as root.
set -eu

HERE=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

install -d -o ubuntu -g ubuntu -m 0755 /var/lib/atmblog-visits
install -d -m 0755 /usr/local/lib/atmblog-visit
install -m 0644 "$HERE/server.py" /usr/local/lib/atmblog-visit/server.py
install -m 0644 "$HERE/atmblog-visit.service" /etc/systemd/system/atmblog-visit.service

systemctl daemon-reload
systemctl enable --now atmblog-visit
systemctl restart atmblog-visit
systemctl --no-pager --lines=0 status atmblog-visit
