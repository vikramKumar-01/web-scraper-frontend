# Web Scraper Backend

Production-ready Express and MongoDB scraper service for a MERN assignment. This backend fetches the top 10 Hacker News stories, parses them with Cheerio, validates and transforms the data, stores the results in MongoDB, runs automatically on server startup, and can be triggered manually with `POST /api/scrape`.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- Cheerio

## Folder Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── scraper/
│   │   ├── hackerNewsScraper.js
│   │   ├── httpClient.js
│   │   ├── parser.js
│   │   ├── storyRepository.js
│   │   ├── transformer.js
│   │   └── validators.js
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## Why Axios + Cheerio

Hacker News serves static server-rendered HTML. That means there is no need to spin up a browser, execute client-side JavaScript, or pay the memory and CPU cost of browser automation. `Axios` is sufficient for fetching the page HTML, and `Cheerio` is sufficient for traversing and extracting the DOM structure. This is lighter, faster, and easier to maintain than Puppeteer for this use case.

## Cheerio Parsing Explanation

`Cheerio` loads raw HTML and exposes a jQuery-like API:

1. `const $ = cheerio.load(html)` creates a traversable DOM snapshot.
2. Selectors such as `$("tr.athing")` find story rows.
3. Traversal methods like `.next()` move from a story row to its metadata row.
4. Selectors like `.find(".score")` and `.find(".hnuser")` extract points and author.

This works well on Hacker News because the markup is predictable: each story is stored in a `tr.athing` row followed by a sibling row containing the score, user, and age metadata.

## Scraper Execution Flow

```text
User / Startup Trigger
        ↓
executeScraper()
        ↓
Axios fetches Hacker News HTML
        ↓
Cheerio parses HTML into DOM
        ↓
Parser extracts top 10 story rows
        ↓
Transformer cleans and normalizes fields
        ↓
Validators reject malformed stories
        ↓
Repository upserts stories into MongoDB
        ↓
API returns success summary
```

## Step-by-Step Lifecycle

### 1. Fetch HTML

`src/scraper/httpClient.js` creates a reusable Axios instance with:

- timeout protection
- request headers
- async/await flow
- centralized request error handling

If Hacker News is slow or unavailable, the scraper throws a structured `AppError`.

### 2. Load HTML into Cheerio

`src/scraper/parser.js` calls `cheerio.load(html)`.

This allows selector-based traversal without a browser. Since Hacker News is static HTML, we can directly query:

- `tr.athing` for each story row
- `.titleline a` for title and URL
- `.score` for points
- `.hnuser` for author
- `.age` for posted time

### 3. Extract Top 10 Stories

The parser slices the story rows to the configured limit. Only the top 10 are processed. Each extracted item is kept as a simple raw object before validation.

### 4. Clean and Validate Data

`src/scraper/transformer.js`:

- trims whitespace
- converts points text into a number
- normalizes relative URLs using `new URL()`
- fills fallback values for missing author or time

`src/scraper/validators.js` ensures the final object has:

- valid non-empty title
- valid HTTP/HTTPS URL
- numeric points
- non-empty author
- non-empty postedAt

Invalid stories are skipped instead of crashing the entire scrape.

### 5. Store in MongoDB

`src/scraper/storyRepository.js` uses Mongoose `bulkWrite()` with `upsert: true`.

This gives:

- bulk insert/update optimization
- duplicate avoidance using unique `url`
- safe updates when the same story already exists

The scraper logs how many documents were inserted, updated, and detected as duplicates.

### 6. Startup Execution

`src/server.js` boot flow:

1. connect MongoDB
2. run the scraper once
3. start the Express server

If MongoDB or scraping fails during bootstrap, the process exits instead of starting in a broken state.

### 7. Manual Scrape API

`POST /api/scrape` triggers the exact same reusable scraper service. This avoids duplicate logic and keeps manual and startup flows consistent.

Successful response:

```json
{
  "success": true,
  "message": "Stories scraped successfully",
  "count": 10
}
```

The actual response also includes persistence details to help with debugging.

## Debug Logs Included

The service logs:

- scraper start
- request success
- parsing success
- validation skips
- database save success
- duplicate detection
- scraper completion
- request failures

## Environment Variables

Copy `.env.example` to `.env`.

```env
PORT=4500
MONGODB_URI=mongodb://127.0.0.1:27017/web-scraper
CLIENT_URL=http://localhost:5173
SCRAPER_SOURCE_URL=https://news.ycombinator.com
SCRAPER_TIMEOUT_MS=10000
SCRAPER_STORY_LIMIT=10
```

## Run Locally

1. Open the `backend/` folder.
2. Create `.env` from `.env.example`.
3. Run `npm install`.
4. Start MongoDB locally.
5. Run `npm run dev` or `npm start`.
6. Confirm the startup scrape completes in the terminal logs.

## API Testing

### Postman

1. Start the backend.
2. Send `POST http://localhost:4500/api/scrape`.
3. Expect a `200 OK` response with a success payload.

### MongoDB Compass

1. Connect to `mongodb://127.0.0.1:27017`.
2. Open the `web-scraper` database.
3. Inspect the `stories` collection.
4. Confirm documents contain `title`, `url`, `points`, `author`, `postedAt`, `createdAt`, and `updatedAt`.

### Health Endpoint

Call `GET http://localhost:4500/api/health` to verify the API is live.

## Key Interview Talking Points

- Static HTML target means browser automation is unnecessary.
- Axios + Cheerio reduces memory usage and execution time.
- `bulkWrite` with `upsert` avoids duplicate inserts and supports updates.
- Startup scrape and API scrape both use one shared service for consistency.
- Validation and structured errors prevent malformed source data from polluting MongoDB.
