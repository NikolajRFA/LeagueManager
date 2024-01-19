using DataLayer.Entities;
using RandomUserSharp;

namespace DataLayer.Utils;

public class PlayerBuilder
{
    public static Player RandomPlayer()
    {
        var rand = new Random();
        var ruc = new RandomUserClient();
        var user = ruc.GetRandomUsersAsync().GetAwaiter().GetResult().FirstOrDefault()!;
        return new Player
        {
            FirstName = user.Name.First,
            LastName = user.Name.Last,
            Alias = user.Login.Username,
            Age = WeightedAge(14, 45, 5.0, 22.0),
            Gender = user.Gender.ToString(),
            Nationality = user.Nationality.ToString(),
            GameSense = rand.Next(Settings.MinSkillLvl, Settings.MaxSkillLvl + 1),
            TeamFighting = rand.Next(Settings.MinSkillLvl, Settings.MaxSkillLvl + 1),
            Dueling = rand.Next(Settings.MinSkillLvl, Settings.MaxSkillLvl + 1),
            JglPathing = rand.Next(Settings.MinSkillLvl, Settings.MaxSkillLvl + 1),
            WaveMgmt = rand.Next(Settings.MinSkillLvl, Settings.MaxSkillLvl + 1),
            Farming = rand.Next(Settings.MinSkillLvl, Settings.MaxSkillLvl + 1)
        };
    }
    
    private static int WeightedAge(int min, int max, double distributionStdDev, double distributionMean)
    {
        double value;
        do
        {
            value = NextGaussian(distributionMean, distributionStdDev);
        } while (value < min || value >= max);

        return (int)Math.Round(value);
        
        double NextGaussian(double mean, double stdDev)
        {
            Random rand = new Random();
            double u1 = 1.0 - rand.NextDouble(); // Uniform(0,1] random doubles
            double u2 = 1.0 - rand.NextDouble();
            double normalRandomValue = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Sin(2.0 * Math.PI * u2); // Box-Muller transform
            return mean + stdDev * normalRandomValue;
        }
    }
}