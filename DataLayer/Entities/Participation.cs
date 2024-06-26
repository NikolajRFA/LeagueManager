﻿using DataLayer.Utils;

namespace DataLayer.Entities;

public class Participation
{
    public int SeriesId { get; set; }
    public int PlayerId { get; set; }
    public string Role { get; set; }
    public int TeamId { get; set; }
    public Series Series { get; set; }
    public Player Player { get; set; }
    public Team Team { get; set; }
}