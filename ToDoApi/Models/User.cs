﻿using System;
using System.ComponentModel.DataAnnotations;

namespace ToDoApi.Models
{
    public class User
	{
        //[Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }

        //[Required(ErrorMessage = "Surname is required")]
        public string? Surname { get; set; }

        //[Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        //[Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}

