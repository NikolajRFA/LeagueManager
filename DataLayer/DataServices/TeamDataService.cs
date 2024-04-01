using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class TeamDataService
{
    public (List<Team>, int) GetTeams(int page = 0, int pageSize = 10)
    {
        var db = new Database();
        return (db.Teams
                .Include(x => x.Players)
                //.Include(x => x.League)
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToList(),
            db.Teams.Count());
    }

    public Team? GetTeam(int id)
    {
        var db = new Database();
        return db.Teams
            .Include(x => x.Players)
            //.Include(x => x.League)
            .FirstOrDefault(x => x.Id == id);
    }

    public (List<Series>, int) GetSeries(int teamId, int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var series = db.Series
            .Include(x => x.BlueSide)
            .Include(x => x.RedSide)
            .Include(x => x.Winner)
            .Include(x => x.Event)
            .Where(x => x.BlueSideId == teamId || x.RedSideId == teamId)
            .OrderByDescending(x => x.Date);

        return (series
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToList(),
            series.Count());
    }

    public (List<Member>, int) GetMembersFromTeam(int teamId, int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var members = db.Members
            .Include(x => x.Player)
            .Where(x => x.TeamId == teamId);

        return (members.Skip(page * pageSize).Take(pageSize).ToList(), members.Count());
    }

    public (List<Member>, int) GetCurrentMembersFromTeam(int teamId, int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var currentMembers = db.Members
            .Include(x => x.Player)
            .Where(x => x.TeamId == teamId && x.ToDate == null);

        return (currentMembers.Skip(page * pageSize).Take(pageSize).ToList(), currentMembers.Count());
    }
}