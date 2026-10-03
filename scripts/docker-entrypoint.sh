#!/bin/sh
set -eu

password="${AIUSAGE_DASHBOARD_PASSWORD:-}"
case "$password" in
  ''|'change-me'|'changeme'|'password'|'password123'|'admin'|'admin123'|'123456'|'12345678'|'aiusage'|'secret'|'default'|'letmein')
    echo "Refusing to start: Docker publishes the dashboard on 0.0.0.0." >&2
    echo "Set AIUSAGE_DASHBOARD_PASSWORD to a unique value of at least 12 characters." >&2
    echo "Placeholder passwords such as change-me are rejected." >&2
    exit 1
    ;;
esac
if [ "${#password}" -lt 12 ]; then
  echo "Refusing to start: AIUSAGE_DASHBOARD_PASSWORD must be at least 12 characters." >&2
  exit 1
fi

exec "$@"
