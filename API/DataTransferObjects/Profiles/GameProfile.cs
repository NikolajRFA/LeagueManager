using API.Controllers;
using API.DataTransferObjects.Player;
using AutoMapper;
using DataLayer.Entities;

namespace API.DataTransferObjects.Profiles;

public class GameProfile : Profile
{
    public GameProfile()
    {
        CreateMap<Game, GameDto>();
    }
}