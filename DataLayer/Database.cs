using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer;

public class Database : DbContext
{
    public DbSet<Player> Players { get; set; }
    public DbSet<Team> Teams { get; set; }
    public DbSet<League> Leagues { get; set; }
    public DbSet<Member> Members { get; set; }

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
        });

        modelBuilder.Entity<Team>(entity =>
        {
            entity.ToTable("team");
            entity.HasKey(x => x.Id);
            entity.HasMany<Member>(x => x.Members)
                .WithOne(x => x.Team);
        });

        modelBuilder.Entity<League>(entity =>
        {
            entity.ToTable("league");
            entity.HasKey(x => x.Id);
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
    }
}