using API.DataTransferObjects.Player;
using AutoMapper;

namespace API.DataTransferObjects.Profiles;

public class GameProfile : Profile
{
    public GameProfile()
    {
        CreateMap<DataLayer.Entities.Game, GameDto>();
        CreateMap<DataLayer.Entities.Game, PlayerGameDto>();
    }
}