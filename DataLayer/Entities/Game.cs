namespace DataLayer.Entities;

public class Game
{
    public int Id { get; set; }
    public int BlueSideId { get; set; }
    public int RedSideId { get; set; }
    public int BlueSideTopId { get; set; }
    public int BlueSideJngId { get; set; }
    public int BlueSideMidId { get; set; }
    public int BlueSideBotId { get; set; }
    public int BlueSideSupId { get; set; }
    public int RedSideTopId { get; set; }
    public int RedSideJngId { get; set; }
    public int RedSideMidId { get; set; }
    public int RedSideBotId { get; set; }
    public int RedSideSupId { get; set; }
    public int WinnerId { get; set; }
    public Team BlueSide { get; set; }
    public Team RedSide { get; set; }
    public Player BlueSideTop { get; set; }
    public Player BlueSideJng { get; set; }
    public Player BlueSideMid { get; set; }
    public Player BlueSideBot { get; set; }
    public Player BlueSideSup { get; set; }
    public Player RedSideTop { get; set; }
    public Player RedSideJng { get; set; }
    public Player RedSideMid { get; set; }
    public Player RedSideBot { get; set; }
    public Player RedSideSup { get; set; }
    public Team Winner { get; set; }
}