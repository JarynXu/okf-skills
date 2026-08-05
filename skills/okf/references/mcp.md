# OKF MCP reference for Agents

Use the OKF MCP server when it is configured for the target bundle. It exposes read-only structured operations backed by the native OKF CLI.

Typical tools validate, list, get, inspect, search, and graph the bundle.

1. Pass the narrowest arguments needed.
2. Treat tool results as structured data.
3. Use normal file-editing tools for modifications because the server is read-only.
4. After edits, validate again and compare diagnostics with the baseline.
5. If the server reports a CLI or bundle-path failure, fix configuration rather than emulating the operation.

The server handles protocol negotiation; use the tools advertised by the MCP host.
