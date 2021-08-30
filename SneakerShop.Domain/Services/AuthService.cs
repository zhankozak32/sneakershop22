using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SneakerShop.DA.Entities;
using SneakerShop.Domain.Exceptions;
using SneakerShop.Domain.Interfaces;
using SneakerShop.DTO.Models;

namespace SneakerShop.Domain.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtService _jwtService;

        public AuthService(UserManager<User> userManager, IJwtService jwtService)
        {
            _userManager = userManager;
            _jwtService = jwtService;
        }

        public async Task RegisterAsync(RegisterRequestDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                throw new RestException(HttpStatusCode.Conflict);
            }

            var newUser = new User()
            {
                Email = model.Email,
                UserName = model.Email,
                Gender = model.Gender,
                Country = model.Country,
                City = model.City,
                Balance = 0
            };

            var identityResult = await _userManager.CreateAsync(newUser, model.Password);
            var roleResult = await _userManager.AddToRoleAsync(newUser, "User");
            
            if (!identityResult.Succeeded)
            {
                throw new RestException(HttpStatusCode.BadRequest);
            }
        }

        public async Task<LoginResponseDto> LoginAsync(LoginRequestDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                throw new RestException(HttpStatusCode.Forbidden);
            }

            var authResult = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!authResult)
            {
                throw new RestException(HttpStatusCode.Forbidden);
            }

            return new LoginResponseDto
            {
                Token = _jwtService.GenerateJwtToken(user)
            };
        }
    }
}