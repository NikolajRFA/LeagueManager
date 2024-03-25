using DataLayer.DataServices;
using Xunit.Abstractions;

namespace DataLayerTests;

public class MemberTests
{
    [Fact]
    public void GetMembersFromPlayer_PlayerWithId7_Success()
    {
        var dataService = new MemberDataService();
        var (members, count) = dataService.GetMembersFromPlayer(7);
        
        Assert.NotNull(members);
    }

    [Fact]
    public void IsMember_PlayerWithId1_True()
    {
        var memberDataService = new MemberDataService();
        Assert.True(memberDataService.IsMember(5));
    }

    [Fact]
    public void TerminateMember_Player7Team1_False()
    {
        var memberDataService = new MemberDataService();
        Assert.False(memberDataService.TerminateMember(1, 7, DateOnly.FromDateTime(DateTime.Now)));
    }
    
    [Fact]
    public void TerminateMember_Player7Team2_True()
    {
        var memberDataService = new MemberDataService();
        Assert.True(memberDataService.TerminateMember(2, 7, DateOnly.FromDateTime(DateTime.Now)));
    }

    [Fact]
    public void AddMember_Player7Team2_True()
    {
        var memberDataService = new MemberDataService();
        Assert.True(memberDataService.AddMember(2, 7, DateOnly.FromDateTime(DateTime.Now.AddDays(1))));
    }
}