﻿using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities;

public class Player
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? Id { get; set; }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Alias { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; }
    public string Nationality { get; set; }
    public int Overall { get; set; }
    public int GameSense { get; set; }
    public int TeamFighting { get; set; }
    public int Dueling { get; set; }
    public int JglPathing { get; set; }
    public int WaveMgmt { get; set; }
    public int Farming { get; set; }
    public List<Team> Teams { get; set; }
    public List<Member> Members { get; set; }
    public List<Series> Series { get; set; }
}