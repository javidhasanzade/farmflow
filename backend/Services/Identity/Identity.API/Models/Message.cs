using System.ComponentModel.DataAnnotations;

namespace Identity.API.Models;

public class Message
{
    public int Id { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string Text { get; set; }
    public DateTime Date { get; set; }

    public string UserId { get; set; }
    public virtual AppUser Sender { get; set; }
}