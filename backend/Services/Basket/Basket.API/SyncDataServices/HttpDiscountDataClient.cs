using System.Text.Json;
using Basket.API.Entities;

namespace Basket.API.SyncDataServices;

public class HttpDiscountDataClient : IDiscountDataClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public HttpDiscountDataClient(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }
    
    public async Task<Coupon> GetDiscount(string productId)
    {
        try
        {
            var response = await _httpClient.GetAsync($"{_configuration["GrpcSettings:DiscountUrl"]}/api/v1/Discount/{productId}");

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();

                Coupon coupon = JsonSerializer.Deserialize<Coupon>(responseBody);

                return coupon;
            }

            return new Coupon();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }
}