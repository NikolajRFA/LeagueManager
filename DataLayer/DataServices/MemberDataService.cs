using DataLayer.Entities;

namespace DataLayer.DataServices;

// TODO: implement methods to add members to teams.
public class MemberDataService
{
    public bool AddMember(int teamId, int playerId, DateOnly fromDate)
    {
        var db = new Database();
        db.Members.Add(new Member
        {
            TeamId = teamId,
            PlayerId = playerId,
            FromDate = fromDate,
            ToDate = null
        });
        return db.SaveChanges() > 0;
    }

    public bool TerminateMember(int teamId, int playerId, DateOnly toDate)
    {
        var db = new Database();
        var member = db.Members.SingleOrDefault(x => x.TeamId == teamId && x.PlayerId == playerId && x.ToDate == null);

        if (member == null) return false;

        member.ToDate = toDate;
        return db.SaveChanges() > 0;
    }
        
}