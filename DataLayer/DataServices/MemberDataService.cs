using System.Text.RegularExpressions;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

// TODO: implement methods to add members to teams.
public class MemberDataService
{
    public (List<Member>, int) GetMembersFromPlayer(int playerId, int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var members = db.Members
            .Include(x => x.Team)
            .Where(x => x.PlayerId == playerId);

        return (members.Skip(page * pageSize).Take(pageSize).ToList(), members.Count());
    }

    /// <summary>
    /// Adds a member relationship between a player and a team.
    /// </summary>
    /// <param name="teamId">The id of the team.</param>
    /// <param name="playerId">The id of the player.</param>
    /// <param name="fromDate">The start date of the membership.</param>
    /// <param name="role">(Optional) Role of the player.</param>
    /// <returns>True if the relationship was successfully created.</returns>
    public bool AddMember(int teamId, int playerId, DateOnly fromDate, string role = "benched")
    {
        if (!Regex.IsMatch(role, "benched|top|jungle|mid|bot|support"))
            throw new ArgumentException("Role has to match 'benched|top|jungle|mid|bot|support'");

        var db = new Database();
        db.Database.ExecuteSql($"CALL add_member({playerId}, {teamId}, {fromDate}, {role})");
        return true;
    }

    /// <summary>
    /// Terminates an active player from a team.
    /// </summary>
    /// <param name="teamId">The id of the team.</param>
    /// <param name="playerId">The id of the player.</param>
    /// <param name="toDate">The date of which the player is terminated.</param>
    /// <returns>Returns true if termination is successful.</returns>
    public bool TerminateMember(int teamId, int playerId, DateOnly toDate)
    {
        var db = new Database();
        var member = db.Members.SingleOrDefault(x => x.TeamId == teamId && x.PlayerId == playerId && x.ToDate == null);

        if (member == null) return false;

        member.ToDate = toDate;
        return db.SaveChanges() > 0;
    }

    /// <summary>
    /// Check if a player currently is a member of a team.
    /// </summary>
    /// <param name="playerId">The id of the player to check.</param>
    /// <returns>True if the player is member of a team.</returns>
    public bool IsMember(int playerId)
    {
        var db = new Database();
        var member = db.Members.FirstOrDefault(x => x.PlayerId == playerId && x.ToDate == null);
        return member != null;
    }
}