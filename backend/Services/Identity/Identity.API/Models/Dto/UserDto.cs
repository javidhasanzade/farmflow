namespace Identity.API.Models.Dto;

public class UserDto
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string PhoneNumber { get; set; }
    public string DateOfBirth { get; set; }
    public string AvatarUrl { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public string? ZipCode { get; set; }
    public float Rating { get; set; }
}