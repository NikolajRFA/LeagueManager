using DataLayer.Entities;
using RandomUserSharp;
using RandomUserSharp.Models;

namespace DataLayer.Utils;

public class PlayerBuilder
{
    public static Player RandomPlayer(
        int overall = 0,
        Gender gender = Gender.Both,
        List<Nationality>? nationalities = null
    )
    {
        var ruc = new RandomUserClient();
        var user = ruc.GetRandomUsersAsync(gender: gender, nationalities: nationalities)
            .GetAwaiter()
            .GetResult()
            .FirstOrDefault()!;

        const int skillStdDev = 8;
        if (overall is < 50 or > 99) overall = RandomGaussian(50, 99, skillStdDev, 78);

        return new Player
        {
            FirstName = user.Name.First,
            LastName = user.Name.Last,
            Alias = user.Login.Username,
            Age = RandomGaussian(14, 45, 5.0, 22.0),
            Gender = user.Gender.ToString(),
            Nationality = user.Nationality.ToString(),
            Overall = overall,
            GameSense = RandomGaussian(50, 99, skillStdDev, overall),
            TeamFighting = RandomGaussian(50, 99, skillStdDev, overall),
            Dueling = RandomGaussian(50, 99, skillStdDev, overall),
            JglPathing = RandomGaussian(50, 99, skillStdDev, overall),
            WaveMgmt = RandomGaussian(50, 99, skillStdDev, overall),
            Farming = RandomGaussian(50, 99, skillStdDev, overall)
        };
    }

    private static int RandomGaussian(int min, int max, double distributionStdDev, double distributionMean)
    {
        double value;
        do
        {
            value = NextGaussian(distributionMean, distributionStdDev);
        } while (value < min || value >= max);

        return (int)Math.Round(value);

        double NextGaussian(double mean, double stdDev)
        {
            var rand = new Random();
            var u1 = 1.0 - rand.NextDouble(); // Uniform(0,1] random doubles
            var u2 = 1.0 - rand.NextDouble();
            var normalRandomValue =
                Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Sin(2.0 * Math.PI * u2); // Box-Muller transform
            return mean + stdDev * normalRandomValue;
        }
    }
}