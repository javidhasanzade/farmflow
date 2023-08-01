namespace Catalog.API.Entities.Dto;

public class ResponseDto
{
    public  object? Result { get; set; }
    public  int? Pages { get; set; }
    public int? Count { get; set; }
    public bool IsSuccess { get; set; } = true;
    public string Message { get; set; } = "";
}