CREATE EXTENSION IF NOT EXISTS pg_trgm;
SET pg_trgm.similarity_threshold = 0.15;

DROP TABLE IF EXISTS participation;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS player_name_wi;
DROP TABLE IF EXISTS player;
--DROP TABLE IF EXISTS league;
DROP TABLE IF EXISTS event;

DROP TYPE IF EXISTS role;
--CREATE TYPE role as ENUM ('top', 'jungle', 'mid', 'bottom', 'support');

CREATE TABLE player
(
    id            SERIAL PRIMARY KEY,
    first_name    VARCHAR(50),
    last_name     VARCHAR(50),
    alias         VARCHAR(50),
    age           INTEGER,
    gender        varchar(6),
    nationality   VARCHAR(5),
    game_sense    INTEGER,
    team_fighting INTEGER,
    dueling       INTEGER,
    jgl_pathing   INTEGER,
    wave_mgmt     INTEGER,
    farming       INTEGER
);

CREATE TABLE player_name_wi
(
    player_id INTEGER REFERENCES player (id),
    word      VARCHAR(100),
    relevance INTEGER,
    "column"  VARCHAR(20),
    PRIMARY KEY (player_id, "column")
);
CREATE INDEX lower_case_word ON player_name_wi (lower(word));
CREATE INDEX players_on_word_gin_trgm_idx ON player_name_wi USING GIN (word gin_trgm_ops);

/*CREATE TABLE league
(
    id        SERIAL PRIMARY KEY,
    name      varchar(100),
    region    VARCHAR(50),
    num_teams INTEGER
);*/

CREATE TABLE team
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(100)
    --league_id INTEGER REFERENCES league (id)
);

CREATE TABLE member
(
    player_id INTEGER REFERENCES player (id),
    team_id   INTEGER REFERENCES team (id),
    role      VARCHAR(10) NOT NULL DEFAULT ('benched'),
    from_date DATE,
    to_date   DATE
);

CREATE TABLE event
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

CREATE TABLE game
(
    id           SERIAL PRIMARY KEY,
    blue_side_id INT REFERENCES team (id) NOT NULL,
    red_side_id  INT REFERENCES team (id) NOT NULL,
    winner_id    INT REFERENCES team (id),
    event_id     INT REFERENCES event (id),
    date         DATE                     NOT NULL
);

CREATE TABLE participation
(
    game_id   INT REFERENCES game (id)   NOT NULL,
    player_id INT REFERENCES player (id) NOT NULL,
    role      VARCHAR(10)                NOT NULL,
    team_id   INT REFERENCES team (id),
    PRIMARY KEY (game_id, player_id)
);

CREATE UNIQUE INDEX player_team_overlap
    ON member (player_id)
    WHERE to_date >= from_date;

--INSERT INTO league (name, region, num_teams)
--VALUES ('League 1', 'EU', 20);

INSERT INTO team (name/*, league_id*/)
VALUES ('Blue Team'/*, 1*/);
INSERT INTO team (name/*, league_id*/)
VALUES ('Team Magic Rabbits'/*, 1*/);

-- TODO: Add non-active players
INSERT INTO player (id, first_name, last_name, alias, age, gender, nationality, game_sense, team_fighting, dueling,
                    jgl_pathing, wave_mgmt, farming)
VALUES (1, 'Alex', 'Brown', 'crazycat109', 22, 'Male', 'NZ', 66, 64, 95, 73, 72, 69),
       (2, 'Virginia', 'Téllez', 'angrytiger613', 20, 'Female', 'MX', 75, 92, 88, 99, 95, 73),
       (3, 'Zeilane', 'da Cruz', 'bluecat471', 24, 'Female', 'BR', 57, 85, 70, 90, 69, 73),
       (4, 'Eckehard', 'Wolf', 'angryladybug611', 15, 'Male', 'DE', 67, 73, 76, 51, 81, 73),
       (5, 'Alessio', 'Leroy', 'bigswan216', 24, 'Male', 'FR', 69, 92, 93, 55, 82, 90),
       (6, 'Runa', 'Salvesen', 'bigmeercat861', 31, 'Female', 'NO', 69, 66, 84, 75, 72, 73),
       (7, 'Alex', 'Milton', 'TMR_Milton', 23, 'Male', 'DK', 74, 58, 61, 81, 62, 98),
       (8, 'Marcus', 'Rasmussen', 'tinypeacock861', 21, 'Male', 'DK', 70, 66, 71, 83, 51, 92),
       (9, 'Tony', 'Rey', 'purplerabbit174', 30, 'Male', 'FR', 97, 66, 50, 70, 92, 80),
       (10, 'Dobrivoje', 'Mišković', 'organiclion133', 25, 'Male', 'RS', 78, 91, 97, 60, 99, 94),
       (11, 'Adam', 'Larsson', 'organiclion133', 25, 'Male', 'SE', 78, 91, 97, 60, 99, 94);

CREATE OR REPLACE PROCEDURE update_player_name_wi()
    LANGUAGE plpgsql
AS
$$
BEGIN
    DELETE FROM player_name_wi;

    INSERT INTO player_name_wi
    SELECT id,
           first_name   AS word,
           1            AS relevance,
           'first_name' AS "column"
    FROM player
    UNION
    SELECT id,
           last_name   AS word,
           2           AS relevance,
           'last_name' AS "column"
    FROM player
    UNION
    SELECT id,
           alias   AS word,
           3       AS relevance,
           'alias' AS "column"
    FROM player;
end;
$$;

-- TODO: Add non-active players
INSERT INTO member (player_id, team_id, role, from_date, to_date)
VALUES (1, 1, 'top', CURRENT_DATE - 14, null),
       (2, 1, 'jungle', CURRENT_DATE - 14, null),
       (3, 1, 'mid', CURRENT_DATE - 14, null),
       (4, 1, 'bottom', CURRENT_DATE - 14, null),
       (5, 1, 'support', CURRENT_DATE - 14, null),
       (6, 2, 'top', CURRENT_DATE - 14, null),
       (7, 2, 'jungle', CURRENT_DATE - 14, null),
       (8, 2, 'mid', CURRENT_DATE - 14, null),
       (9, 2, 'bottom', CURRENT_DATE - 14, null),
       (10, 2, 'support', CURRENT_DATE - 14, null),
       (11, 2, 'support', CURRENT_DATE - 30, CURRENT_DATE - 22);

INSERT INTO event (name) VALUES ('League 1');

INSERT INTO game (blue_side_id, red_side_id, winner_id, event_id, date)
VALUES (1, 2, 1, 1, now());

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


-- Functions and procedures
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

CREATE OR REPLACE FUNCTION player_search(phrase TEXT, page INT, page_size INT)
    RETURNS table
            (
                id            INTEGER,
                total         INTEGER
            )
    LANGUAGE plpgsql
AS
$$
BEGIN
    RETURN QUERY
        WITH cte AS (SELECT DISTINCT ON (player_id) player_id, similarity(word, 'Milton') sim
                     FROM player_name_wi pwi)
        SELECT cte.player_id, (SELECT count(*)::INT FROM cte) total
        FROM cte
        ORDER BY sim DESC
        OFFSET page * page_size LIMIT page_size;
end
$$;

-- TODO: Transactionalize procedure, and add control of if players are added to the participation table.
CREATE OR REPLACE PROCEDURE play_game(blue_side_team_id INT, red_side_team_id INT, event_id INT, game_date DATE)
    LANGUAGE plpgsql
AS
$$
DECLARE
    new_game_id               INT := nextval('game_id_seq');
    min_skill_lvl             INT := 50;
    player_amount_of_skills   INT := 6;
    min_total_skill_blue_side INT;
    min_total_skill_red_side  INT;
    total_skill_blue_side     INT;
    total_skill_red_side      INT;
    blue_side_performance     INT;
    red_side_performance      INT;
BEGIN
    -- Create new game with the teams
    INSERT INTO game (id, blue_side_id, red_side_id, event_id, date)
    VALUES (new_game_id, blue_side_team_id, red_side_team_id, event_id, game_date);

    -- Add members to participation table
    INSERT INTO participation (game_id, player_id, role, team_id)
    SELECT new_game_id,
           player_id,
           role,
           team_id
    FROM member
    WHERE (team_id = blue_side_team_id OR team_id = red_side_team_id)
      AND role != 'benched'
      AND from_date <= game_date
      AND (to_date >= game_date OR to_date IS NULL);

    -- Get minimum team skill levels based on the number of players in the teams
    SELECT min_skill_lvl *
           (SELECT count(*) FROM participation WHERE game_id = new_game_id AND team_id = blue_side_team_id) *
           player_amount_of_skills
    INTO min_total_skill_blue_side;
    SELECT min_skill_lvl *
           (SELECT count(*) FROM participation WHERE game_id = new_game_id AND team_id = red_side_team_id) *
           player_amount_of_skills
    INTO min_total_skill_red_side;

    -- Calculate team total skill levels based on the teams players
    SELECT sum(get_total_player_skill(player_id))
    INTO total_skill_blue_side
    FROM participation
    WHERE game_id = new_game_id
      AND team_id = blue_side_team_id;
    SELECT sum(get_total_player_skill(player_id))
    INTO total_skill_red_side
    FROM participation
    WHERE game_id = new_game_id
      AND team_id = red_side_team_id;

    -- Use randomness to find a game winner
    SELECT floor(random() * (total_skill_blue_side - min_total_skill_blue_side + 1) + min_total_skill_blue_side)::int
    INTO blue_side_performance;
    SELECT floor(random() * (total_skill_red_side - min_total_skill_red_side + 1) + min_total_skill_red_side)::int
    INTO red_side_performance;

    UPDATE game
    SET winner_id = CASE
                        WHEN blue_side_performance > red_side_performance THEN blue_side_id
                        WHEN blue_side_performance = red_side_performance THEN
                            CASE
                                WHEN random() < 0.5 THEN blue_side_id
                                ELSE red_side_id
                                END
                        ELSE red_side_id
        END
    WHERE id = new_game_id;
end;
$$;

CALL update_player_name_wi();

-- Create some more games
CALL play_game(1, 2, 1, CURRENT_DATE - 12);
CALL play_game(2, 1, 1, CURRENT_DATE - 10);
CALL play_game(2, 1, 1, CURRENT_DATE - 8);
CALL play_game(1, 2, 1, CURRENT_DATE - 5);