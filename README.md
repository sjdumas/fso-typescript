# Full Stack Open TypeScript

This repository contains the assignments for the University of Helsinki [Full Stack Open](https://fullstackopen.com/en/) course - [Part 9: TypeScript](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-typescript).

## Projects

| Folder                    | What it is                                                                 | Address                  |
| ------------------------- | -------------------------------------------------------------------------- | ------------------------ |
| `healthapp/`              | BMI and exercise calculators, as command-line scripts and an Express API   | <http://localhost:3000>  |
| `course/`                 | React app that lists course parts, using union types and exhaustive checks | <http://localhost:5173>  |
| `flightdiaries/backend/`  | Express API for flight diary entries, validated with Zod                   | <http://localhost:3000>  |
| `flightdiaries/frontend/` | React app for viewing and adding flight diary entries                      | <http://localhost:5173>  |
| `patientor/backend/`      | Express API for patients, diagnoses, and patient entries                   | <http://localhost:3001>  |
| `patientor/frontend/`     | React and Material UI app for managing patients and their entries          | <http://localhost:5173>  |
| `healthapp-tests/`        | Playwright API tests for `healthapp`                                       |                          |
| `patientor-api-tests/`    | Playwright API tests for the Patientor backend                             |                          |
| `patientor-tests/`        | Playwright end-to-end tests for the full Patientor app                     |                          |

Each project is separate, with its own `package.json`, so run `npm install` inside a folder before using it.

`healthapp` and the Flight Diaries backend both use port 3000, and the Vite frontends all use port 5173, so run only one of each at a time.

## Requirements

- Node.js 24 (used in CI). The Flight Diaries backend runs TypeScript directly with Node's `--experimental-transform-types` flag, which older versions do not support.
- No database is needed. All of the backends keep their data in memory, so changes are lost when the server restarts.

## healthapp

```bash
cd healthapp
npm install
npm run dev        # start the API with automatic restarts
npm start          # start the API
```

The calculators can also be run from the command line:

```bash
npm run calculateBmi 180 74                     # height (cm) and weight (kg)
npm run calculateExercises 2 1 0 2 4.5 0 3 1    # daily target (hours), then each day's hours
```

| Method | Path         | Description                                                                         |
| ------ | ------------ | ----------------------------------------------------------------------------------- |
| `GET`  | `/hello`     | Returns `Hello Full Stack!`                                                         |
| `GET`  | `/bmi`       | BMI for `?height=180&weight=74`                                                     |
| `POST` | `/exercises` | Exercise statistics for a body like `{ "daily_exercises": [1, 0, 2], "target": 2 }` |

Missing or non-numeric values return `400` with an `error` message.

## course

```bash
cd course
npm install
npm run dev
```

## Flight Diaries

Start the backend, then the frontend in a second terminal:

```bash
cd flightdiaries/backend
npm install
npm run dev
```

```bash
cd flightdiaries/frontend
npm install
npm run dev
```

| Method | Path               | Description                                                                 |
| ------ | ------------------ | --------------------------------------------------------------------------- |
| `GET`  | `/ping`            | Returns `pong`                                                              |
| `GET`  | `/api/diaries`     | All entries, without their comments                                         |
| `GET`  | `/api/diaries/:id` | One entry, including its comment                                            |
| `POST` | `/api/diaries`     | Add an entry. Invalid data returns `400` with the validation errors         |

## Patientor

Start the backend, then the frontend in a second terminal:

```bash
cd patientor/backend
npm install --legacy-peer-deps
npm run dev
```

```bash
cd patientor/frontend
npm install --legacy-peer-deps
npm run dev
```

CI installs both Patientor projects with `--legacy-peer-deps`, so use it locally too to get the same dependencies. To run the backend's production build instead, use `npm run build` and then `npm start`.

| Method | Path                        | Description                                                     |
| ------ | --------------------------- | --------------------------------------------------------------- |
| `GET`  | `/api/ping`                 | Returns `pong`                                                  |
| `GET`  | `/api/diagnoses`            | All diagnoses                                                   |
| `GET`  | `/api/patients`             | All patients, without social security numbers or entries        |
| `GET`  | `/api/patients/:id`         | One patient, including their entries                            |
| `POST` | `/api/patients`             | Add a patient                                                   |
| `POST` | `/api/patients/:id/entries` | Add an entry for a patient                                      |

Entries have one of three types: `HealthCheck`, `Hospital`, or `OccupationalHealthcare`. Invalid data returns `400` with the validation errors, and an unknown patient id returns `404`.

## Tests

Each test folder runs Playwright against a server that is already running, so start the app first (see above). Then:

```bash
cd healthapp-tests        # or patientor-api-tests, or patientor-tests
npm install
npx playwright install chromium
npm test
```

| Test folder            | Start first                                         |
| ---------------------- | --------------------------------------------------- |
| `healthapp-tests`      | `healthapp` on port 3000                            |
| `patientor-api-tests`  | Patientor backend on port 3001                      |
| `patientor-tests`      | Patientor backend on port 3001 and frontend on 5173 |

Each test folder also has `npm run test:ui` (interactive mode), `npm run test:headed` (shows the browser), and `npm run report` (opens the last HTML report).

### Continuous Integration

On every push to `main` or `master`, GitHub Actions runs three workflows:

- **Health app E2E Tests** (`healthapp-e2e-tests.yml`): lints `healthapp`, starts it, and runs `healthapp-tests`.
- **Patientor API Tests** (`patientor-api-tests.yml`): lints and builds the Patientor backend, starts it, and runs `patientor-api-tests`.
- **Patientor E2E Tests** (`patientor-e2e-tests.yml`): builds and starts the Patientor backend and frontend, and runs `patientor-tests`.

Each workflow uploads its Playwright report as an artifact.
