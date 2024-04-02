using API.DataTransferObjects.Player;
using AutoMapper;
using DataLayer.Entities;

namespace API.DataTransferObjects.Profiles;

public class SeriesProfile : Profile
{
    public SeriesProfile()
    {
        CreateMap<Series, SeriesDto>();
        CreateMap<Series, PlayerSeriesDto>();
    }
}