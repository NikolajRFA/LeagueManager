using API.DataTransferObjects.Player;
using AutoMapper;

namespace API.DataTransferObjects.Profiles;

public class PlayerProfile : Profile
{
    public PlayerProfile()
    {
        CreateMap<DataLayer.Entities.Player, PlayerDto>();
        CreateMap<DataLayer.Entities.Player, TeamMemberDto>();
    }
}