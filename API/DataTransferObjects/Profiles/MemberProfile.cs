using AutoMapper;
using DataLayer.Entities;

namespace API.DataTransferObjects.Profiles;

public class MemberProfile : Profile
{
    public MemberProfile()
    {
        CreateMap<Member, MemberDto>();
    }
}