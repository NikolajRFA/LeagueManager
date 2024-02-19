using DataLayer.Entities;
using DataLayer.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql;

namespace DataLayer;

public class Database : DbContext
{
    public DbSet<Player> Players { get; set; }
    public DbSet<Team> Teams { get; set; }
    public DbSet<Member> Members { get; set; }
    //public DbSet<League> Leagues { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Game> Games { get; set; }
    public DbSet<Participation> Participations { get; set; }
    public DbSet<TotalSkillResult> TotalSkillResults { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.EnableSensitiveDataLogging();
        optionsBuilder
            .LogTo(Console.Out.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);
        optionsBuilder.UseNpgsql("host=localhost;db=lol;uid=postgres;pwd=nikolaj");
        optionsBuilder.UseSnakeCaseNamingConvention();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Player>(entity =>
        {
            entity.ToTable("player");
            entity.HasKey(x => x.Id);
            entity.HasMany(x => x.Teams)
                .WithMany(x => x.Players)
                .UsingEntity<Member>();
            entity.HasMany(x => x.Games)
                .WithMany(x => x.Players)
                .UsingEntity<Participation>();
        });

        modelBuilder.Entity<Team>(entity =>
        {
            entity.ToTable("team");
            entity.HasKey(x => x.Id);
            entity.HasMany<Member>(x => x.Members)
                .WithOne(x => x.Team);
        });
        
        modelBuilder.Entity<Member>(entity =>
        {
            entity.ToTable("member");
            entity.HasKey(x => new { x.PlayerId, x.TeamId });
            entity.HasOne<Player>(x => x.Player)
                .WithMany(x => x.Members);
            entity.HasOne<Team>(x => x.Team)
                .WithMany(x => x.Members);
        });

        /*modelBuilder.Entity<League>(entity =>
        {
            entity.ToTable("league");
            entity.HasKey(x => x.Id);
        });*/

        modelBuilder.Entity<Event>(entity =>
        {
            entity.ToTable("event");
            entity.HasKey(x => x.Id);
        });

        modelBuilder.Entity<Game>(entity =>
        {
            entity.ToTable("game");
            entity.HasKey(x => x.Id);
            entity.Property(p => p.Id)
                .ValueGeneratedOnAdd();
            entity.HasOne<Team>(x => x.BlueSide);
            entity.HasOne<Team>(x => x.RedSide);
            entity.HasOne<Team>(x => x.Winner);
            
            entity.HasMany(x => x.Players)
                .WithMany(x => x.Games)
                .UsingEntity<Participation>();

            entity.HasOne(x => x.Event)
                .WithMany(x => x.Games);
        });

        modelBuilder.Entity<Participation>(entity =>
        {
            entity.ToTable("participation");
            entity.HasKey(x => new { x.GameId, x.PlayerId });
        });
        
        modelBuilder.Entity<TotalSkillResult>().HasNoKey().ToView(null);
    }
}