DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS league;

DROP TYPE role;
CREATE TYPE role as ENUM ('top', 'jungle', 'mid', 'bottom', 'support');

CREATE TABLE player (
                        id SERIAL PRIMARY KEY,
                        first_name VARCHAR(50),
                        last_name VARCHAR(50),
                        alias VARCHAR(50),
                        age INTEGER,
                        nationality VARCHAR(5),
                        game_sense INTEGER,
                        team_fighting INTEGER,
                        dueling INTEGER,
                        jgl_pathing INTEGER,
                        wave_mgmt INTEGER,
                        farming INTEGER
);

CREATE TABLE league (
                        id SERIAL PRIMARY KEY,
                        name varchar(100),
                        region VARCHAR(50),
                        num_teams INTEGER
);

CREATE TABLE team (
                      id SERIAL PRIMARY KEY,
                      name VARCHAR(100),
                      league_id INTEGER REFERENCES league(id)
);

CREATE TABLE member (
                        player_id INTEGER REFERENCES player(id),
                        team_id INTEGER REFERENCES team(id),
                        role ROLE,
                        from_date DATE,
                        to_date DATE
);

CREATE UNIQUE INDEX player_team_overlap
    ON member (player_id)
    WHERE to_date >= from_date;


