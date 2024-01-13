DROP TABLE IF EXISTS game;
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
                        gender varchar(6),
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
                        to_date DATE,
                        is_active BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE game (
                      id SERIAL PRIMARY KEY,
                      blue_side_id INT REFERENCES team(id),
                      red_side_id INT REFERENCES team(id),
                      winner_id INT REFERENCES team(id)
);

CREATE UNIQUE INDEX player_team_overlap
    ON member (player_id)
    WHERE to_date >= from_date;

INSERT INTO league (name, region, num_teams) VALUES ('League 1', 'EU', 20);

INSERT INTO team (name, league_id) VALUES ('Blue Team', 1);
INSERT INTO team (name, league_id) VALUES ('Red Team', 1);

-- CREATE 10 PLAYERS BEFOREHAND
INSERT INTO member (player_id, team_id, role, from_date, to_date, is_active) VALUES 
(1,  1, 'top',     CURRENT_DATE, null, false),
(2,  1, 'jungle',  CURRENT_DATE, null, false),
(3,  1, 'mid',     CURRENT_DATE, null, false),
(4,  1, 'bottom',  CURRENT_DATE, null, false),
(5,  1, 'support', CURRENT_DATE, null, false),
(6,  2, 'top',     CURRENT_DATE, null, false),
(7,  2, 'jungle',  CURRENT_DATE, null, false),
(8,  2, 'mid',     CURRENT_DATE, null, false),
(9,  2, 'bottom',  CURRENT_DATE, null, false),
(10, 2, 'support', CURRENT_DATE, null, false);

INSERT INTO game (blue_side_id, red_side_id, winner_id) VALUES (1, 2, 1);
                                                                      