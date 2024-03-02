using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class SearchDataService
{
    public (List<Player>, int) GetPlayerSearch(string searchPhrase, int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var result =
            db.PlayerSearches.FromSqlInterpolated($"SELECT * FROM player_search({searchPhrase}, {page}, {pageSize})");
        var resultIds = result.Select(x => x.Id).ToList();
        var players = db.Players.Where(x => resultIds.Contains(x.Id))
            // ReSharper disable once EntityFramework.UnsupportedServerSideFunctionCall
            .OrderBy(x => resultIds.IndexOf(x.Id));

        return (players.ToList(), result.FirstOrDefault() != null ? result.FirstOrDefault()!.Total : 0);
    }
}