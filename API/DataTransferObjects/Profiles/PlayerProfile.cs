using AutoMapper;
using DataLayer.Entities;

namespace API.DataTransferObjects.Profiles;

public class PlayerProfile : Profile
{
    public PlayerProfile()
    {
        CreateMap<Player, PlayerDto>();
    }
}