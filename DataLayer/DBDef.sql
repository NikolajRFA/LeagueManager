CREATE EXTENSION IF NOT EXISTS pg_trgm;
SET pg_trgm.similarity_threshold = 0.15;

DROP TABLE IF EXISTS participation;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS series;
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
    id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name    VARCHAR(50),
    last_name     VARCHAR(50),
    alias         VARCHAR(50),
    age           INTEGER,
    gender        varchar(6),
    nationality   VARCHAR(5),
    overall       INTEGER NOT NULL,
    game_sense    INTEGER NOT NULL,
    team_fighting INTEGER NOT NULL,
    dueling       INTEGER NOT NULL,
    jgl_pathing   INTEGER NOT NULL,
    wave_mgmt     INTEGER NOT NULL,
    farming       INTEGER NOT NULL
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
    id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100)
    --league_id INTEGER REFERENCES league (id)
);

CREATE TABLE member
(
    player_id INTEGER REFERENCES player (id),
    team_id   INTEGER REFERENCES team (id),
    stay      INTEGER     NOT NULL DEFAULT (0),
    role      VARCHAR(10) NOT NULL DEFAULT ('benched'),
    from_date DATE,
    to_date   DATE,
    PRIMARY KEY (player_id, team_id, stay)
);

CREATE OR REPLACE PROCEDURE add_member(in_player_id INT, in_team_id INT, in_from_date DATE,
                                       in_role VARCHAR(10) = 'benched')

    LANGUAGE plpgsql AS
$$
DECLARE
    comp_stay INT := 1;
BEGIN
    IF (EXISTS (SELECT * FROM member WHERE player_id = in_player_id AND team_id = in_team_id)) THEN
        SELECT stay + 1
        FROM member
        WHERE player_id = in_player_id
          AND team_id = in_team_id
        ORDER BY stay DESC
        LIMIT 1
        INTO comp_stay;
    end if;

    INSERT INTO member (player_id, team_id, stay, role, from_date, to_date)
    VALUES (in_player_id, in_team_id, comp_stay, in_role, in_from_date, NULL);
end;
$$;

CREATE TABLE event
(
    id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

CREATE TABLE series
(
    id           INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    best_of      INT                      NOT NULL,
    blue_side_id INT REFERENCES team (id) NOT NULL,
    red_side_id  INT REFERENCES team (id) NOT NULL,
    winner_id    INT REFERENCES team (id),
    event_id     INT REFERENCES event (id),
    date         DATE                     NOT NULL
);

CREATE TABLE game
(
    id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    series_id     INT REFERENCES series (id) NOT NULL,
    blue_side_won BOOL                       NOT NULL
);

CREATE TABLE participation
(
    series_id INT REFERENCES series (id) NOT NULL,
    player_id INT REFERENCES player (id) NOT NULL,
    role      VARCHAR(10)                NOT NULL,
    team_id   INT REFERENCES team (id),
    PRIMARY KEY (series_id, player_id)
);

/*CREATE UNIQUE INDEX player_team_overlap
    ON member (player_id)
    WHERE to_date >= from_date;*/

--INSERT INTO league (name, region, num_teams)
--VALUES ('League 1', 'EU', 20);

INSERT INTO team (name/*, league_id*/)
VALUES ('Blue Team'/*, 1*/);
INSERT INTO team (name/*, league_id*/)
VALUES ('Team Magic Rabbits'/*, 1*/);

-- TODO: Add non-active players
INSERT INTO player (first_name, last_name, alias, age, gender, nationality, overall, game_sense, team_fighting, dueling,
                    jgl_pathing, wave_mgmt, farming)
VALUES ('Alex', 'Brown', 'crazycat109', 22, 'Male', 'NL', 73, 66, 64, 95, 73, 72, 69),
       ('Virginia', 'Téllez', 'angrytiger613', 20, 'Female', 'MX', 87, 75, 92, 88, 99, 95, 73),
       ('Zeilane', 'da Cruz', 'bluecat471', 24, 'Female', 'PT', 74, 57, 85, 70, 90, 69, 73),
       ('Eckehard', 'Wolf', 'angryladybug611', 15, 'Male', 'DE', 70, 67, 73, 76, 51, 81, 73),
       ('Selin', 'Kirli', 'Blankety', 24, 'Female', 'TR', 82, 85, 92, 83, 60, 82, 90),
       ('Runa', 'Salvesen', 'bigmeercat861', 31, 'Female', 'NO', 73, 69, 66, 84, 75, 72, 73),
       ('Alex', 'Milton', 'TMR_Milton', 23, 'Male', 'DK', 72, 74, 58, 61, 81, 62, 98),
       ('Marcus', 'Rasmussen', 'tinypeacock861', 21, 'Male', 'DK', 72, 70, 66, 71, 83, 51, 92),
       ('Tony', 'Rey', 'purplerabbit174', 30, 'Male', 'FR', 76, 97, 66, 50, 70, 92, 80),
       ('Dobrivoje', 'Mišković', 'organiclion133', 25, 'Male', 'RS', 86, 78, 91, 97, 60, 99, 94),
       ('Adam', 'Larsson', 'organiclion133', 25, 'Male', 'SE', 86, 78, 91, 97, 60, 99, 94);

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

CALL add_member(1, 2, CURRENT_DATE - 14, 'top');
CALL add_member(2, 1, CURRENT_DATE - 14, 'jungle');
CALL add_member(3, 1, CURRENT_DATE - 14, 'mid');
CALL add_member(4, 1, CURRENT_DATE - 14, 'bottom');
CALL add_member(5, 1, CURRENT_DATE - 14, 'support');
CALL add_member(6, 2, CURRENT_DATE - 14, 'top');
CALL add_member(7, 2, CURRENT_DATE - 14, 'jungle');
CALL add_member(8, 2, CURRENT_DATE - 14, 'mid');
CALL add_member(9, 2, CURRENT_DATE - 14, 'bottom');
CALL add_member(10, 2, CURRENT_DATE - 14, 'support');

-- TODO: Add non-active players
INSERT INTO member (player_id, team_id, role, from_date, to_date)
VALUES (11, 2, 'support', CURRENT_DATE - 30, CURRENT_DATE - 22);

INSERT INTO event (name)
VALUES ('League 1');

INSERT INTO series (best_of, blue_side_id, red_side_id, winner_id, event_id, date)
VALUES (1, 1, 2, 1, 1, now());

INSERT INTO game (series_id, blue_side_won)
VALUES (1, true);

INSERT INTO participation (series_id, player_id, role, team_id)
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
                id    INTEGER,
                total INTEGER
            )
    LANGUAGE plpgsql
AS
$$
BEGIN
    RETURN QUERY
        WITH cte AS (SELECT player_id, SUM(similarity(word, phrase)) as sim_sum
                     FROM player_name_wi pwi
                     GROUP BY player_id)
        SELECT cte.player_id, (SELECT count(*)::INT FROM cte) total
        FROM cte
        ORDER BY cte.sim_sum DESC
        OFFSET page * page_size LIMIT page_size;
end
$$;

-- TODO: Transactionalize procedure, and add control of if players are added to the participation table.
CREATE OR REPLACE PROCEDURE play_game(in_series_id INT)
    LANGUAGE plpgsql
AS
$$
DECLARE
    new_game_id               INT;
    min_skill_lvl             INT := 50;
    player_amount_of_skills   INT := 6;
    min_total_skill_blue_side INT;
    min_total_skill_red_side  INT;
    total_skill_blue_side     INT;
    total_skill_red_side      INT;
    blue_side_performance     INT;
    red_side_performance      INT;
BEGIN
    -- Get minimum team skill levels based on the number of players in the teams
    SELECT min_skill_lvl *
           (SELECT count(*)
            FROM participation
            WHERE series_id = in_series_id
              AND team_id = (SELECT blue_side_id FROM series WHERE id = in_series_id)) *
           player_amount_of_skills
    INTO min_total_skill_blue_side;
    SELECT min_skill_lvl *
           (SELECT count(*)
            FROM participation
            WHERE series_id = new_game_id
              AND team_id = (SELECT red_side_id FROM series WHERE id = in_series_id)) *
           player_amount_of_skills
    INTO min_total_skill_red_side;

    -- Calculate team total skill levels based on the teams players
    SELECT sum(get_total_player_skill(player_id))
    INTO total_skill_blue_side
    FROM participation
    WHERE series_id = in_series_id
      AND team_id = (SELECT blue_side_id FROM series WHERE id = in_series_id);
    SELECT sum(get_total_player_skill(player_id))
    INTO total_skill_red_side
    FROM participation
    WHERE series_id = in_series_id
      AND team_id = (SELECT red_side_id FROM series WHERE id = in_series_id);

    -- Use randomness to find a game winner
    SELECT floor(random() * (total_skill_blue_side - min_total_skill_blue_side + 1) + min_total_skill_blue_side)::int
    INTO blue_side_performance;
    SELECT floor(random() * (total_skill_red_side - min_total_skill_red_side + 1) + min_total_skill_red_side)::int
    INTO red_side_performance;

    -- Insert the game
    INSERT INTO game (series_id, blue_side_won)
    VALUES (in_series_id, CASE
                              WHEN blue_side_performance > red_side_performance THEN TRUE
                              WHEN blue_side_performance = red_side_performance THEN
                                  CASE
                                      WHEN random() < 0.5 THEN TRUE
                                      ELSE FALSE
                                      END
                              ELSE FALSE
        END);
end;
$$;

CREATE OR REPLACE PROCEDURE play_series(in_blue_side_id INT, in_red_side_id INT, in_best_of INT, in_event_id INT,
                                        in_date DATE)
    LANGUAGE plpgsql
AS
$$
DECLARE
    new_series_id  INT;
    blue_side_wins INT := 0;
    red_side_wins  INT := 0;
BEGIN
    -- Create series
    INSERT INTO series (best_of, blue_side_id, red_side_id, event_id, date)
    VALUES (in_best_of, in_blue_side_id, in_red_side_id, in_event_id, in_date)
    RETURNING id INTO new_series_id;

    -- Add members to participation table
    INSERT INTO participation (series_id, player_id, role, team_id)
    SELECT new_series_id,
           player_id,
           role,
           team_id
    FROM member
    WHERE (team_id = in_blue_side_id OR team_id = in_red_side_id)
      AND role != 'benched'
      AND from_date <= in_date
      AND (to_date >= in_date OR to_date IS NULL);

    -- Play games until one team wins the series
    WHILE (blue_side_wins < (in_best_of / 2) + 1) AND (red_side_wins < (in_best_of / 2) + 1)
        LOOP
            -- Call play_game procedure and determine the winner
            CALL play_game(new_series_id);

            -- Find winner of game and update tally
            IF (SELECT blue_side_won FROM game WHERE series_id = new_series_id ORDER BY id DESC LIMIT 1) THEN
                blue_side_wins := blue_side_wins + 1;
            ELSE
                red_side_wins := red_side_wins + 1;
            END IF;
        END LOOP;

    UPDATE series
    SET winner_id = CASE
                        WHEN blue_side_wins > red_side_wins THEN in_blue_side_id
                        WHEN red_side_wins > blue_side_wins THEN in_red_side_id
        END
        WHERE id = new_series_id;
end;
$$;

CALL update_player_name_wi();

-- Create some more games
CALL play_series(1, 2, 3, 1, CURRENT_DATE - 12);
CALL play_series(2, 1, 3, 1, CURRENT_DATE - 10);
CALL play_series(2, 1, 3, 1, CURRENT_DATE - 8);
CALL play_series(1, 2, 3, 1, CURRENT_DATE - 5);