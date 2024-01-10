using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class PlayerDataService
{
    public Player? GetPlayer(int id)
    {
        var db = new Database();
        return db.Players
            .FirstOrDefault(x => x.Id == id);
    }
}