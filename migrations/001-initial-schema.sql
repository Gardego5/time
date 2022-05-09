-- Up

CREATE TABLE time (
    "id" INTEGER PRIMARY KEY,
    "date" TEXT NOT NULL UNIQUE,
    "hours" REAL,
    "placements" INTEGER,
    "videos" INTEGER,
    "return visits" INTEGER,
    "studies" INTEGER
);

-- Down

DROP TABLE time;
