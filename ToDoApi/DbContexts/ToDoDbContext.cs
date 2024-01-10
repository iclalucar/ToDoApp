using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace ToDoApi.DbContexts
{
    public class ToDoDbContext : IdentityDbContext<Models.UserEntity>
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options)
        { }

        public DbSet<Models.ToDoItem> ToDoItems { get; set; }

    }
}

