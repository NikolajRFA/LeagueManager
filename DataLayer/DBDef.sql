DROP TABLE IF EXISTS participation;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS league;

DROP TYPE IF EXISTS role;
--CREATE TYPE role as ENUM ('top', 'jungle', 'mid', 'bottom', 'support');

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
                        role VARCHAR(10) NOT NULL DEFAULT ('benched'),
                        from_date DATE,
                        to_date DATE
);

CREATE TABLE game (
                      id SERIAL PRIMARY KEY,
                      blue_side_id INT REFERENCES team(id) NOT NULL,
                      red_side_id INT REFERENCES team(id) NOT NULL,
                      winner_id INT REFERENCES team(id),
                      date DATE NOT NULL
);

CREATE TABLE participation (
    game_id INT REFERENCES game (id) NOT NULL,
    player_id INT REFERENCES player (id) NOT NULL,
    role VARCHAR(10) NOT NULL,
    team_id INT REFERENCES team (id),
    PRIMARY KEY (game_id, player_id)
);

CREATE UNIQUE INDEX player_team_overlap
    ON member (player_id)
    WHERE to_date >= from_date;

INSERT INTO league (name, region, num_teams) VALUES ('League 1', 'EU', 20);

INSERT INTO team (name, league_id) VALUES ('Blue Team', 1);
INSERT INTO team (name, league_id) VALUES ('Red Team', 1);

INSERT INTO player (id, first_name, last_name, alias, age, gender, nationality, game_sense, team_fighting, dueling, jgl_pathing, wave_mgmt, farming) VALUES (1, 'Alex', 'Brown', 'crazycat109', 22, 'Male', 'NZ', 66, 64, 95, 73, 72, 69);
INSERT INTO player (id, first_name, last_name, alias, age, gender, nationality, game_sense, team_fighting, dueling, jgl_pathing, wave_mgmt, farming) VALUES (2, 'Virginia', 'Téllez', 'angrytiger613', 20, 'Female', 'MX', 75, 92, 88, 99, 95, 73);
INSERT INTO player (id, first_name, last_name, alias, age, gender, nationality, game_sense, team_fighting, dueling, jgl_pathing, wave_mgmt, farming) VALUES (3, 'Zeilane', 'da Cruz', 'bluecat471', 24, 'Female', 'BR', 57, 85, 70, 90, 69, 73);
INSERT INTO player (id, first_name, last_name, alias, age, gender, nationality, game_sense, team_fighting, dueling, jgl_pathing, wave_mgmt, farming) VALUES (4, 'Eckehard', 'Wolf', 'angryladybug611', 15, 'Male', 'DE', 67, 73, 76, 51, 81, 73);
INSERT INTO player (id, first_name, last_name, alias, age, gender, nationality, game_sense, team_fighting, dueling, jgl_pathing, wave_mgmt, farming) VALUES (5, 'Alessio', 'Leroy', 'bigswan216', 24, 'Male', 'FR', 69, 92, 93, 55, 82, 90);
INSERT INTO player (id, first_name, last_name, alias, age, gender, nationality, game_sense, team_fighting, dueling, jgl_pathing, wave_mgmt, farming) VALUES (6, 'Runa', 'Salvesen', 'bigmeercat861', 31, 'Female', 'NO', 69, 66, 84, 75, 72, 73);
INSERT INTO player (id, first_name, last_name, alias, age, gender, nationality, game_sense, team_fighting, dueling, jgl_pathing, wave_mgmt, farming) VALUES (7, 'Yasmina', 'Rijpkema', 'blacktiger316', 21, 'Female', 'NL', 74, 58, 61, 81, 62, 98);
INSERT INTO player (id, first_name, last_name, alias, age, gender, nationality, game_sense, team_fighting, dueling, jgl_pathing, wave_mgmt, farming) VALUES (8, 'Marcus', 'Rasmussen', 'tinypeacock861', 21, 'Male', 'DK', 70, 66, 71, 83, 51, 92);
INSERT INTO player (id, first_name, last_name, alias, age, gender, nationality, game_sense, team_fighting, dueling, jgl_pathing, wave_mgmt, farming) VALUES (9, 'Tony', 'Rey', 'purplerabbit174', 30, 'Male', 'FR', 97, 66, 50, 70, 92, 80);
INSERT INTO player (id, first_name, last_name, alias, age, gender, nationality, game_sense, team_fighting, dueling, jgl_pathing, wave_mgmt, farming) VALUES (10, 'Dobrivoje', 'Mišković', 'organiclion133', 25, 'Male', 'RS', 78, 91, 97, 60, 99, 94);


INSERT INTO member (player_id, team_id, role, from_date, to_date) VALUES 
(1,  1, 'top',     CURRENT_DATE, null),
(2,  1, 'jungle',  CURRENT_DATE, null),
(3,  1, 'mid',     CURRENT_DATE, null),
(4,  1, 'bottom',  CURRENT_DATE, null),
(5,  1, 'support', CURRENT_DATE, null),
(6,  2, 'top',     CURRENT_DATE, null),
(7,  2, 'jungle',  CURRENT_DATE, null),
(8,  2, 'mid',     CURRENT_DATE, null),
(9,  2, 'bottom',  CURRENT_DATE, null),
(10, 2, 'support', CURRENT_DATE, null);

INSERT INTO game (blue_side_id, red_side_id, winner_id, date) VALUES (1, 2, 1, now());

INSERT INTO participation (game_id, player_id, role, team_id)
VALUES (1, 1, 'top', 1),
       (1, 2, 'jungle', 1),
       (1, 3, 'mid', 1),
       (1, 4, 'bottom', 1),
       (1, 5, 'support', 1),
       (1, 6, 'top', 2),
       (1, 7, 'jungle', 2),
       (1, 8, 'mid', 2),
       (1, 9, 'bottom', 2),
       (1, 10, 'support', 2);


CREATE OR REPLACE FUNCTION get_total_player_skill(player_id INT)
    RETURNS int
    LANGUAGE plpgsql
AS
$$
DECLARE
    total_skill INT;
BEGIN
    SELECT game_sense + team_fighting + dueling + jgl_pathing + wave_mgmt + farming
    INTO total_skill
    FROM player
    WHERE id = player_id;

    RETURN total_skill;
end;
$$;