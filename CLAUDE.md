# Omega Dental — instructions for AI sessions

Before changing anything, read `RULES.md` and `MEMORY.md`. Use `ARCHITECTURE.md` and `DESIGN.md`
for how things work and look, `TASKS.md` for what to do next, `PRD.md` for why the site exists.

`main` is live: GitHub Actions deploys every push to it in about a minute. Work on a branch and
let the owner merge. The whole repo is public, including these files — never write secrets or
personal data into them.

Prices are typed once, in `assets/content.js`. After changing it, run
`node tools/sync-prices.js` so the service pages and treatments page follow (the deploy runs it
too).

After any change, add a dated line to `MEMORY.md` and tick the task in `TASKS.md`.
