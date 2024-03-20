using DataLayer.Entities;

namespace DataLayer.DataServices;

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
}