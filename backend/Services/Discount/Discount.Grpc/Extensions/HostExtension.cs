using Npgsql;

namespace Discount.Grpc.Extensions;

public static class HostExtension
{
    public static IHost MigrateDatabase<TContext>(this IHost host, int? retry = 0)
    {
        int retryForAvailability = retry!.Value;

        using var scope = host.Services.CreateScope();
        var services = scope.ServiceProvider;
        var configuration = services.GetRequiredService<IConfiguration>();
        var logger = services.GetRequiredService<ILogger<TContext>>();

        try
        {
            logger.LogInformation("Migrating the database...");

            using var connection =
                new NpgsqlConnection(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
            connection.Open();

            using var command = new NpgsqlCommand
            {
                Connection = connection
            };

            command.CommandText = "DROP TABLE IF EXISTS Coupon";
            command.ExecuteNonQuery();

            command.CommandText = @"CREATE TABLE Coupon(Id SERIAL PRIMARY KEY,
                                                            ProductId VARCHAR(24) NOT NULL,
                                                            Description TEXT,
                                                            Amount INT)";
            command.ExecuteNonQuery();

            logger.LogInformation("Migrated");
        }
        catch (NpgsqlException ex)
        {
            logger.LogError($"An error occured while migrating the database {ex.Message}");

            if (retryForAvailability < 50)
            {
                retryForAvailability++;
                System.Threading.Thread.Sleep(2000);
                MigrateDatabase<TContext>(host, retryForAvailability);
            }
        }

        return host;
    }
}