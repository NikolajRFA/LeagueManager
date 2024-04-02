namespace API.DataTransferObjects;

public class SeriesDto
{
    public string Url { get; set; }
    public string BlueSide { get; set; }
    public string BlueSideUrl { get; set; }
    public string RedSide { get; set; }
    public string RedSideUrl { get; set; }
    public string? Winner { get; set; }
    public string? WinnerUrl { get; set; }
    public string? Event { get; set; }
    public string? EventUrl { get; set; }
    
    public DateOnly Date { get; set; }
}