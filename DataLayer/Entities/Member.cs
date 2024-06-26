﻿using DataLayer.Utils;

namespace DataLayer.Entities;

public class Member
{
    public int PlayerId { get; set; }
    public int TeamId { get; set; }
    public int Stay { get; set; }
    public string Role { get; set; }
    public DateOnly FromDate { get; set; }
    public DateOnly? ToDate { get; set; }
    public Player Player { get; set; }
    public Team Team { get; set; }
}