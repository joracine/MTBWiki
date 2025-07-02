# MTB Wiki - Plan Improvements TODO Tracker

## 🟢 High-Impact, Actionable Improvements

### 1. **Parallelize Early Phases**
- [ ] Allow admin interface and GraphQL API to be developed in parallel after initial schema is defined
- [ ] Enable iterative feedback between API and admin UI

### 2. **Testing Strategy**
- [ ] Add explicit unit/integration/e2e test steps to each phase
- [ ] Define minimum test coverage goals for each package
- [ ] Add contract tests for GraphQL API

### 3. **Dev Experience & Tooling**
- [ ] Add a single command for local dev setup (`npm run dev:all`)
- [ ] Document how to run/test each service locally
- [ ] Consider Nx or Turborepo for monorepo management (optional)

### 4. **Secrets Management**
- [ ] Add AWS Secrets Manager setup to early infra phase
- [ ] Document local/dev/prod secrets handling

### 5. **Monitoring & Observability**
- [ ] Add basic logging/monitoring hooks (CloudWatch, Sentry) from the start
- [ ] Ensure error tracking is available in dev and beta

### 6. **Data Migration & Versioning**
- [ ] Add process for versioning and updating enumeration seed data
- [ ] Add migration scripts for enum changes (e.g., new tags, new regions)
- [ ] Document schema versioning and migration process

### 7. **User/Contributor Onboarding**
- [ ] Add a "Getting Started" section for new contributors (devs and content editors)
- [ ] Document how to add new enumerations, seed data, or content types

### 8. **Review Checkpoints**
- [ ] Add explicit review checkpoint after each major phase (local dev, beta deploy, prod deploy)
- [ ] Checklist for what to review at each checkpoint (tests, docs, infra, data integrity)

### 9. **Backup & Recovery (Simple Model)**
- [ ] Add automated daily snapshot for Aurora (retention: 7 days)
- [ ] Add S3 versioning and lifecycle policy for admin interface and docs
- [ ] Document manual recovery steps (restore snapshot, re-deploy infra)

### 10. **Internationalization (l11n/i18n)**
- [ ] Add i18n support to admin interface from the start (Next.js i18n routing)
- [ ] Add language field to all user-facing content tables (e.g., System, Route, Guide)
- [ ] Document how to add new languages and translate content

### 11. **Data Schema Versioning**
- [ ] Add schema version field to all major tables (e.g., System, Route, Trail)
- [ ] Document schema versioning policy (how to bump, how to migrate)
- [ ] Add migration scripts for schema changes

---

## 📋 **Summary Table**
| Area                | Improvement/Task                                      | Status |
|---------------------|-------------------------------------------------------|--------|
| Parallel Dev        | Parallelize admin & API after schema                  | [ ]    |
| Testing             | Add unit/integration/e2e/contract tests to all phases | [ ]    |
| Dev Experience      | One-command dev setup, local run docs                 | [ ]    |
| Secrets             | AWS Secrets Manager, doc local/prod handling          | [ ]    |
| Monitoring          | Add logging/monitoring from start                     | [ ]    |
| Data Versioning     | Version/track enum seed data, schema version fields   | [ ]    |
| Onboarding          | Getting Started + content addition docs               | [ ]    |
| Review Checkpoints  | Add review after each phase, with checklist           | [ ]    |
| Backup/Recovery     | Aurora snapshots, S3 versioning, manual restore docs  | [ ]    |
| i18n/l11n           | i18n in admin UI, language fields, translation docs   | [ ]    |
| Schema Versioning   | Schema version fields, migration scripts, docs        | [ ]    |

---

## 📝 Notes
- This tracker is temporary and will be merged into the main execution plan after review.
- All tasks are actionable and technical; "soft" tasks (e.g., stakeholder review) are omitted.
- Solutions are kept simple and cost-effective (e.g., Aurora snapshots, S3 versioning, manual restore docs).
- Data schema versioning and i18n are included from the start for future-proofing. 