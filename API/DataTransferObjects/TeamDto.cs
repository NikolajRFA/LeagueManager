﻿using API.DataTransferObjects.Player;

namespace API.DataTransferObjects;

public class TeamDto
{
    public string Name { get; set; }
    public string League { get; set; }
    public string GamesUrl { get; set; }
    public string Players { get; set; }
}