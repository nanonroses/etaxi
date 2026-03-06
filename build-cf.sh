#!/bin/bash
# Force fresh code from GitHub
git fetch origin main
git reset --hard origin/main

# Install dependencies fresh
npm install --legacy-peer-deps
npm install @opennextjs/cloudflare@latest wrangler@latest --legacy-peer-deps

cat > open-next.config.ts << 'EOF'
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
EOF

cat > wrangler.jsonc << 'EOF'
{
  "name": "etaxi",
  "main": ".open-next/worker.js",
  "compatibility_date": "2024-12-30",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  }
}
EOF

npx opennextjs-cloudflare build
