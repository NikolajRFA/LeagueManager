using AutoMapper;

namespace API.DataTransferObjects.Profiles;

public class GameProfile : Profile
{
    public GameProfile()
    {
        CreateMap<DataLayer.Entities.Game, GameDto>();
    }
}