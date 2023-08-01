using AutoMapper;
using Identity.API.Models;
using Identity.API.Models.Dto;
using Identity.API.Repositories;
using Identity.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Identity.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    protected ResponseDto _response;

    public UsersController(IAuthService authService, IUserRepository userRepository, IMapper mapper)
    {
        _authService = authService;
        _userRepository = userRepository;
        _mapper = mapper;
        _response = new ResponseDto();
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationRequestDto model)
    {
        var errorMessage = await _authService.Register(model);
        if (!string.IsNullOrEmpty(errorMessage))
        {
            _response.IsSuccess = false;
            _response.Message = errorMessage;
            return BadRequest(_response);
        }
        return Ok(_response);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
    {
        var loginResponse = await _authService.Login(model);
        if (loginResponse.User == null)
        {
            _response.IsSuccess = false;
            _response.Message = "Username or password is incorrect";
            return BadRequest(_response);
        }

        _response.Result = loginResponse;
        return Ok(_response);
    }
    
    [HttpPost("AssignRole")]
    public async Task<IActionResult> AssignRole([FromBody] RegistrationRequestDto model)
    {
        var assignRole = await _authService.AssignRole(model.Email, model.Role.ToUpper());
        if (!assignRole)
        {
            _response.IsSuccess = false;
            _response.Message = "Error";
            return BadRequest(_response);
        }
        
        return Ok(_response);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await _userRepository.GetUsers();

        //var usersDto = _mapper.Map<UserDto>(users);

        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUserById(string id)
    {
        var user = await _userRepository.GetUserById(id);

        //var userDto = _mapper.Map<UserDto>(user);

        return Ok(user);
    }
}