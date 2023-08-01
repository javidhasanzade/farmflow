using Microsoft.AspNetCore.Identity;

namespace Identity.API.Models;

public class AppUser : IdentityUser
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string DateOfBirth { get; set; }
    public string AvatarUrl { get; set; }
    public float Rating { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public string? ZipCode { get; set; }
    
    public virtual ICollection<Message> Messages { get; set; }

    public AppUser()
    {
        Messages = new HashSet<Message>();
    }
}