# Task: Fix 404 Errors in CryptoWise App

## Steps to Complete

- [x] Update BASE_URL in src/api/api.js to point to CoinGecko API.
- [x] Remove unused getExchangeRates() call in src/components/converter.js to eliminate unnecessary 404.
- [x] Test the application locally (run `npm run dev` and check browser console for no 404s; verify data loads in tracker, converter, and chart).
- [x] Update TODO.md to mark steps complete and confirm fixes.
- [ ] If needed, re-deploy to hosted link and verify.

## Notes
- Changes are minimal and targeted to resolve the specific 404 errors without altering functionality.
- After edits, all fetches should succeed using CoinGecko's public API.
