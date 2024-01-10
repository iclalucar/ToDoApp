using System;
using Microsoft.AspNetCore.Identity;

namespace ToDoApi.Models
{
    public class UserEntity : IdentityUser
    {

        public string? Name { get; set; }
        public string? Surname { get; set; }
    }
}

