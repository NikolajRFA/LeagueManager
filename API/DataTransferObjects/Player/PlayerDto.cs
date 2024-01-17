﻿namespace API.DataTransferObjects;

public class PlayerDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Alias { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; }
    public string Nationality { get; set; }
    public int GameSense { get; set; }
    public int TeamFighting { get; set; }
    public int Dueling { get; set; }
    public int JglPathing { get; set; }
    public int WaveMgmt { get; set; }
    public int Farming { get; set; }
}