# MTB Wiki - Plan Improvements TODO Tracker

## 🟢 High-Impact, Actionable Improvements

### 1. **Parallelize Early Phases**
- [x] Allow admin interface and GraphQL API to be developed in parallel after initial schema is defined
- [x] Enable iterative feedback between API and admin UI

### 2. **Testing Strategy**
- [x] Add explicit unit/integration/e2e test steps to each phase
- [x] Define minimum test coverage goals for each package
- [x] Add contract tests for GraphQL API

### 3. **Dev Experience & Tooling**
- [x] Add a single command for local dev setup (`npm run dev:all`)
- [x] Document how to run/test each service locally

### 4. **Secrets Management**
- [x] Add AWS Secrets Manager setup to early infra phase
- [x] Document local/dev/prod secrets handling

### 5. **Monitoring & Observability**
- [x] Add basic logging/monitoring hooks (CloudWatch, Sentry) from the start
- [x] Ensure error tracking is available in dev and beta

### 6. **Data Migration & Versioning**
- [x] Add process for versioning and updating enumeration seed data
- [x] Add migration scripts for enum changes (e.g., new tags, new regions)
- [x] Document schema versioning and migration process

### 7. **User/Contributor Onboarding**
- [x] Add a "Getting Started" section for new contributors (devs and content editors)
- [x] Document how to add new enumerations, seed data, or content types

### 8. **Review Checkpoints**
- [x] Add explicit review checkpoint after each major phase (local dev, beta deploy, prod deploy)
- [x] Checklist for what to review at each checkpoint (tests, docs, infra, data integrity)

### 9. **Backup & Recovery (Simple Model)**
- [x] Add automated daily snapshot for Aurora (retention: 7 days)
- [x] Add S3 versioning and lifecycle policy for admin interface and docs
- [x] Document manual recovery steps (restore snapshot, re-deploy infra)

### 10. **Internationalization (l11n/i18n)**
- [x] Add i18n support to admin interface from the start (Next.js i18n routing)
- [x] Add language field to all user-facing content tables (e.g., System, Route, Guide)
- [x] Document how to add new languages and translate content

### 11. **Data Schema Versioning**
- [x] Add schema version field to all major tables (e.g., System, Route, Trail)
- [x] Document schema versioning policy (how to bump, how to migrate)
- [x] Add migration scripts for schema changes

### 12. **Remove Transient Data**
- [x] Remove transient/ephemeral data (e.g., weather updates, real-time trail status) from the data model
- [x] Ensure data model focuses on durable, long-lived content

### 13. **Trail Status Sourcing**
- [x] Trail status should reference Trailforks as the authoritative source
- [x] Do not store trail status as durable data; link to Trailforks for current status

---

## 📋 **Summary Table**
| Area                | Improvement/Task                                      | Status |
|---------------------|-------------------------------------------------------|--------|
| Parallel Dev        | Parallelize admin & API after schema                  | [x]    |
| Testing             | Add unit/integration/e2e/contract tests to all phases | [x]    |
| Dev Experience      | One-command dev setup, local run docs                 | [x]    |
| Secrets             | AWS Secrets Manager, doc local/prod handling          | [x]    |
| Monitoring          | Add logging/monitoring from start                     | [x]    |
| Data Versioning     | Version/track enum seed data, schema version fields   | [x]    |
| Onboarding          | Getting Started + content addition docs               | [x]    |
| Review Checkpoints  | Add review after each phase, with checklist           | [x]    |
| Backup/Recovery     | Aurora snapshots, S3 versioning, manual restore docs  | [x]    |
| i18n/l11n           | i18n in admin UI, language fields, translation docs   | [x]    |
| Schema Versioning   | Schema version fields, migration scripts, docs        | [x]    |
| Remove Transient Data | Remove weather/trail status from data model           | [x]    |
| Trail Status Sourcing | Reference Trailforks for trail status, not local data | [x]    |

---

## 🟢 Notes
- All new tests (unit, integration, e2e, contract) must run automatically on push and deploy via CI/CD (GitHub Actions).
- This tracker is temporary and will be merged into the main execution plan after review.
- All tasks are actionable and technical; "soft" tasks (e.g., stakeholder review) are omitted.
- Solutions are kept simple and cost-effective (e.g., Aurora snapshots, S3 versioning, manual restore docs).
- Data schema versioning and i18n are included from the start for future-proofing. 